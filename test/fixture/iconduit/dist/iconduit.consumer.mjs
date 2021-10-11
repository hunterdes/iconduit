import {dirname, join} from 'path'
import {fileURLToPath} from 'url'
import {readConsumer} from '@iconduit/consumer'

module.exports = readConsumer(
  join(dirname(fileURLToPath(import.meta.url)), "site.iconduitmanifest")
)
