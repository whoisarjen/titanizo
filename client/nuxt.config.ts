// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
    ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
})
