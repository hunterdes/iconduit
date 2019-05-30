module.exports = () => {
  return {
    name: 'Iconduit',
    description: 'A build system for web application icon and image assets',
    url: 'https://iconduit.github.io/',
    colors: {
      brand: '#D5415C'
    },
    definitions: {
      input: {
        appleTouchIconMasked: {
          strategy: 'composite',
          options: {
            mask: 'iconMaskIosSquircle',
            layers: [
              {input: 'iconFlatMaskable', multiplier: 2, style: 'appleTouchIconScale'},
            ],
          },
        },
      },
      output: {
        appleTouchIconMasked: {
          name: 'apple-touch-icon-masked-[dimensions].png',
          sizes: ['appleTouchIconRetina'],
        },
      },
    },
    outputs: {
      include: [
        'appleTouchIconMasked',
      ],
    },
  }
}
