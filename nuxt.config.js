require('dotenv').config()

export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || 'Situs tanya jawab',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#2196F3' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    'nuxt-webfontloader',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://github.com/nuxt-community/apollo-module
    '@nuxtjs/apollo',
    // Doc: https://auth.nuxtjs.org/guide/setup.html
    '@nuxtjs/auth',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.REST_URL, // Used as fallback if no runtime config is provided
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
  webfontloader: {
    google: {
      families: ['Open+Sans&display=swap'],
    },
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.GRAPHQL_URL,
      },
    },
  },
  server: {
    port: 3001,
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'login', method: 'post', propertyName: 'access_token' },
          logout: { url: 'logout', method: 'delete' },
          user: { url: 'user', method: 'get', propertyName: 'user' },
        },
        // tokenRequired: true,
        tokenType: 'Bearer',
        // globalToken: true,
        // autoFetchUser: true
      },
    },
  },
}
