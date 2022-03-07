module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Craft Beer Ninja'
    }
  },
  pwa: {
    name: 'Craft Beer Ninja',
    themeColor: '#fdfdfd',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    iconPaths: {
      faviconSVG: 'img/icons/ninja-black.svg',
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon.png',
      maskIcon: 'img/icons/ninja-black.svg',
      msTileImage: 'img/icons/mstile-310x310.png'
    },
    manifestOptions: {
      display: 'standalone',
      orientation: 'portrait',
      icons: [
        {
          src: '/img/icons/ninja-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: '/img/icons/ninja-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: '/img/icons/maskable-icon.png',
          sizes: '1024x1024',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    }
  }
};
