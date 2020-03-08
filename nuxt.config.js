require('dotenv').config()
export default {
    mode: 'universal',
    /*
    ** Headers of the page
    */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ],
        script: [
            { src: 'https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js' }
        ],
    },
    /*
    ** Customize the progress-bar color
    */
    loading: '~/components/loading.vue',
    /*
    ** Global CSS
    */
    css: [
        '@/scss/app.scss'
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        '@/components',
        '@/plugins/auth',
        '@/plugins/axios',
        '@/plugins/mixins',
        {src: '~/plugins/server'},
        {src: '~/plugins/repository'},
        {src: '~/plugins/client', mode: 'client'}
    ],

    /*
    ** Nuxt.js modules
    */
    modules: [
        '@nuxtjs/axios',
        ['nuxt-buefy', {css: true, materialDesignIcons: true}],
        '@nuxtjs/dotenv',
        ['cookie-universal-nuxt', {alias: 'ck'}],
    ],
    /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
    axios: {
        baseURL: process.env.API_DOMAIN + '/v1'
    },
    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
        }
    }
}
