export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',
  mode: 'universal',
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'heishi1HUMANITY',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'heishi1HUMANITYのポートフォリオ(仮)' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'heishi1HUMANITY' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://heishi1humanity.tk/' },
      { hid: 'og:title', property: 'og:title', content: 'heishi1HUMANITY' },
      { hid: 'og:description', property: 'og:description', content: 'heishi1HUMANITYのポートフォリオ(仮)' },
      { hid: 'og:image', property: 'og:image', content: 'https://heishi1humanity.tk/face.webp' },
    ],
    link: [
      { rel: 'icon', type: 'image/webp', href: '/face.webp' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    "@/assets/default.css"
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/pwa'
  ],

  pwa: {
    icon: false,
    manifest: {
      name: 'heishi1HUMANITY',
      lang: 'ja',
    }
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
