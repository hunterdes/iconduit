module.exports = {
  appleTouchIcon: {
    strategy: 'composite',
    options: {
      layers: [
        {input: 'icon', multiplier: 2, style: 'appleTouchIconScale'},
        {input: 'iconBackground', multiplier: 2, style: 'appleTouchIconScale'},
      ],
    },
  },
  appleTouchStartup: {
    strategy: 'composite',
    options: {
      backgroundColor: 'white',
      layers: [
        {input: 'iconSilhouette', style: 'opacity10Percent'},
        {input: 'backgroundColor'},
      ],
    },
  },
  facebookAppIcon: {
    strategy: 'degrade',
    options: {
      to: 'maskableIcon',
    },
  },
  iconBackground: {
    strategy: 'degrade',
    options: {
      to: 'backgroundColor',
    },
  },
  iconBleed: {
    strategy: 'degrade',
    options: {
      to: 'transparent',
    },
  },
  iconForeground: {
    strategy: 'composite',
    options: {
      layers: [
        {input: 'icon'},
        {input: 'iconBleed'},
      ],
    },
  },
  iconMask: {
    strategy: 'degrade',
    options: {
      to: 'iconMaskAndroidCircle',
    },
  },
  iconSilhouette: {
    strategy: 'degrade',
    options: {
      to: 'icon',
    },
  },
  macosIcon: {
    strategy: 'composite',
    options: {
      layers: [
        {input: 'maskedIconWithoutBleed', multiplier: 2, style: 'macosIconScale'},
      ],
    },
  },
  maskableIcon: {
    strategy: 'composite',
    options: {
      layers: [
        {input: 'iconForeground'},
        {input: 'iconBackground'},
      ],
    },
  },
  maskedIcon: {
    strategy: 'composite',
    options: {
      mask: 'iconMask',
      layers: [
        {input: 'iconForeground'},
        {input: 'iconBackground'},
      ],
    },
  },
  maskedIconMinimalPadding: {
    strategy: 'composite',
    options: {
      layers: [
        {input: 'maskedIcon', multiplier: 2, style: 'maskedIconMinimalPaddingScale'},
      ],
    },
  },
  maskedIconWithoutBleed: {
    strategy: 'composite',
    options: {
      mask: 'iconMask',
      layers: [
        {input: 'icon'},
        {input: 'iconBackground'},
      ],
    },
  },
  openGraphImage: {
    strategy: 'degrade',
    options: {
      to: 'socialShareImage',
    },
  },
  safariMaskIcon: {
    strategy: 'degrade',
    options: {
      to: 'iconSilhouette',
    },
  },
  socialShareImage: {
    strategy: 'composite',
    options: {
      layers: [
        {input: 'iconSilhouette'},
        {input: 'backgroundColor'},
      ],
    },
  },
  twitterCardImage: {
    strategy: 'degrade',
    options: {
      to: 'socialShareImage',
    },
  },
  windowsTile: {
    strategy: 'composite',
    options: {
      layers: [
        {input: 'windowsTileIcon', style: 'windowsTileIconPosition'},
      ],
    },
  },
  windowsTileIcon: {
    strategy: 'degrade',
    options: {
      to: 'iconSilhouette',
    },
  },
  windowsTileSmall: {
    strategy: 'composite',
    options: {
      layers: [
        {input: 'windowsTileIcon', style: 'windowsTileIconPositionSmall'},
      ],
    },
  },
}
