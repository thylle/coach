module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'coach-app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'initial-scale=1, viewport-fit=cover' },
      { hid: 'description', name: 'description', content: 'The only app you need for working out' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  router: {
    middleware: 'i18n'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  mode: 'spa',

  css: [
    '@/assets/styles/main.scss'
  ],

  plugins: [
    '@/plugins/filters',    
    '@/plugins/i18n'    
  ],

  modules: [
    '@nuxtjs/pwa'
  ],
}



