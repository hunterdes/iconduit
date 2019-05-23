const htmlTag = require('html-tag')

const {buildFileName, resolveSize} = require('./size.js')
const {mimeTypeByPath} = require('./mime.js')
const {resolveColors} = require('./config.js')
const {resolveIfReference} = require('./reference.js')

module.exports = {
  buildManifest,
  buildTags,
}

function buildManifest (config, outputs) {
  const meta = {...config}
  delete meta.colors
  delete meta.definitions
  delete meta.inputs
  delete meta.outputs
  delete meta.tags
  delete meta.targets

  return {
    ...meta,

    color: resolveColors(config),
    output: buildManifestOutput(config, outputs),
  }
}

function buildTags (manifest, tags, outputs) {
  const {output: manifestOutput} = manifest
  const tag = {}

  function add (tags, resolveTag, setting) {
    for (const tagName in tags) {
      const setDefinition = tags[tagName]

      for (const sectionName in setDefinition) {
        const tagDefinitions = setDefinition[sectionName]
        const sectionTags = tag[sectionName] || []

        for (let index = 0; index < tagDefinitions.length; ++index) {
          const definition = tagDefinitions[index]
          const resolvedTag = resolveTag(definition, `${setting}.${tagName}.${sectionName}[${index}]`)

          if (resolvedTag) sectionTags.push(resolvedTag)
        }

        tag[sectionName] = sectionTags
      }
    }
  }

  add(tags, createTagResolver({manifest}), 'definitions.tag')

  for (const outputName in outputs) {
    const {sizes, tags} = outputs[outputName]
    const output = manifestOutput[outputName]
    const setting = `definitions.output.${outputName}.tags`

    if (sizes.length > 0) {
      for (const key in output) {
        const outputSize = output[key]

        add(tags, createTagResolver({manifest, output: outputSize}), setting)
      }
    } else {
      add(tags, createTagResolver({manifest, output}), setting)
    }
  }

  for (const sectionName in tag) {
    tag[sectionName].sort((a, b) => {
      const {sortWeight: weightA} = a
      const {sortWeight: weightB} = b

      return weightA - weightB
    })
  }

  return tag
}

function buildManifestOutput (config, outputs) {
  const {definitions: {size: sizeDefinitions}} = config
  const output = {}

  for (const outputName in outputs) {
    const {name: template, sizes} = outputs[outputName]

    if (sizes.length > 0) {
      output[outputName] = {}

      for (const selector of sizes) {
        const {key, ...size} = resolveSize(sizeDefinitions, selector)
        const htmlSizes = buildFileName('[dimensions]', size)
        const path = buildFileName(template, size)

        output[outputName][key] = {htmlSizes, path, size, type: mimeTypeByPath(path)}
      }
    } else {
      output[outputName] = {path: template, type: mimeTypeByPath(template)}
    }
  }

  return output
}

function createTagResolver (definitions) {
  const resolve = resolveIfReference.bind(null, definitions)

  return function resolveTag (definition) {
    const {
      tag,
      attributes,
      children,
      dependencies,
      isSelfClosing,
      sortWeight,
    } = definition

    for (const dependency of dependencies) {
      let resolvedDependency

      try {
        resolvedDependency = resolve(dependency)
      } catch (error) {}

      if (typeof resolvedDependency !== 'string') return null
    }

    const resolvedAttributes = {}

    for (const name in attributes) {
      resolvedAttributes[name] = resolve(attributes[name])
    }

    const resolvedChildren = children.map(resolveTag)
    const innerHtml = resolvedChildren.map(({html}) => html).join('')
    const html = htmlTag(tag, resolvedAttributes, innerHtml)

    return {
      tag,
      attributes: resolvedAttributes,
      children: resolvedChildren,
      html,
      isSelfClosing,
      sortWeight,
    }
  }
}
