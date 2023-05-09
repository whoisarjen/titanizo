// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devServer:{
        port: 3000,
    },
    build:{
        transpile: [
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/free-solid-svg-icons',
            '@fortawesome/free-regular-svg-icons',
            '@fortawesome/free-brands-svg-icons',
            '@fortawesome/fontawesome-pro',
            '@fortawesome/pro-light-svg-icons',
            '@fortawesome/pro-duotone-svg-icons',
            '@fortawesome/pro-thin-svg-icons',
            '@fortawesome/vue-fontawesome',
        ]
    },
    css: [
        '~/assets/css/main.css',
        '@fortawesome/fontawesome-svg-core/styles.css',
    ],
    modules: [
        '@nuxt/image-edge',
        ['@nuxtjs/google-fonts', {
            families: {
                'Inter': true,
                download: true,
                inject: true
            }
        }],
    ],
    runtimeConfig: {
        public: {
            STRAPI_BASE_URL: 'https://strapi.titanizo.pl/api',
            STRAPI_PUBLIC_API_TOKEN: 'dbb424a16e30abd6c7ddc60b5a314263b659df5e401fa9f358ffa0857241f9e65498dcb3a36e9c9304452ed7ddc6e736f186b67cad1fe22fb3112b40f6d440611888d24bf5e57e00462ef376aa6eb322fac86fcf692d525380e64a393c1efcbad48f5a651e5767a54e08a48ae9a769fd136c41595dcae01a25f562f363f151bd',
        }
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
})
