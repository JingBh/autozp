require('dotenv').config()
const webpack = require('webpack')

export default {
  mode: 'spa',
  env: {
    "BASE_URL": "https://autozp.me",
    "API_URL": "https://api.autozp.me"
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'AutoZP',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { name: 'theme-color', content: '#efefef' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {},
  /*
  ** Global CSS
  */
  css: [
    'datatables.net-bs4/css/dataTables.bootstrap4.css',
    'datatables.net-fixedheader-bs4/css/fixedHeader.bootstrap4.css',
    'datatables.net-responsive-bs4/css/responsive.bootstrap4.css',
    { src: '~assets/scss/app.scss', lang: 'scss' }
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/color-mode',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env["API_URL"],
    credentials: true
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    plugins: [
      new webpack.ProvidePlugin({
        "_": "lodash"
      })
    ]
  },
  pwa: {
    manifest: {
      "name": "AutoZP - 一个极简综评客户端",
      "short_name": "AutoZP",
      "description": "一个极简综评客户端",
      "start_url": "/",
      "display": "standalone",
      "orientation": "portrait",
      "background_color": "#efefef",
      "dir": "ltr",
      "lang": "zh-CN",
      "icons": [
        {
          "src": "/favicon.ico",
          "sizes": "128x128"
        },
        {
          "src": "/logo320.png",
          "sizes": "320x320"
        }
      ]
    }
  },
  router: {
    middleware: ["verifyInvite"]
  }
}
