module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Craft Beer Ninja'
    }
  },
  pwa: {
    name: 'Craft Beer Ninja',
    themeColor: '#ffffff',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    iconPaths: {
      faviconSVG: 'img/icons/ninja.svg',
      favicon32: 'img/icons/ninja.svg',
      favicon16: 'img/icons/ninja.svg',
      appleTouchIcon: 'img/icons/ninja.svg',
      maskIcon: 'img/icons/ninja.svg',
      msTileImage: 'img/icons/ninja.svg'
    },
    manifestOptions: {
      icons: [
        {
          src: './img/icons/ninja.svg',
          sizes: '150x150',
          type: 'image/png',
          purpose: 'any'
        },
        {
          rc: './img/icons/ninja.svg',
          sizes: '150x150',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    }
  }
};
