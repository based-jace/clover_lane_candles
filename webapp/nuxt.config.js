const env = require('dotenv').config();

export default {
    mode: 'universal',
    env: env.parsed,
    /*
    ** Headers of the page
    */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: "~/components/LoadingScreen.vue",
    /*
    ** Global CSS
    */
    css: [
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        // Simple usage
        '@nuxtjs/proxy',
        '@nuxtjs/axios',
    ],
    axios: {
        baseURL: 'http://api/',
        proxy: false // Can be also an object with default options
    },
    proxy: {
        '/api': {
            target: 'http://api/',
            pathRewrite: {
                '^/api/': ''
            }
        }
    },
    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend (config, ctx) {
        }
    },
    router: {
        middleware: "delay"
    },
    vars: {
        loadScreenTime: process.env.LOAD_SCREEN_TIME
    },
    serverMiddleware: [
        '~/api/servertest'
    ]
}
