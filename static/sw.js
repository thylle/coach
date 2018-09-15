importScripts('/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "workout-app",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.c74b980023c8ee763c79.js",
    "revision": "af718c5f490bf9f2024d42c26b8127cf"
  },
  {
    "url": "/_nuxt/layouts_default.6b8181629d881ced2e98.js",
    "revision": "df2c0abde6d458be3c71e6510f142bb7"
  },
  {
    "url": "/_nuxt/manifest.1947362bf8ca057af4b7.js",
    "revision": "f162d8232c151d4d0dda609ed4a26109"
  },
  {
    "url": "/_nuxt/pages_index.833e8d3055221a366df4.js",
    "revision": "a3b1afb73f456e09ea9c2505c0733bfe"
  },
  {
    "url": "/_nuxt/pages_user__id.6f965f8dbdfce07e792b.js",
    "revision": "42e9dc3c95c5c472fa6b6c7805a09503"
  },
  {
    "url": "/_nuxt/pages_user_index.2ed10fd510fcd2732094.js",
    "revision": "ffeacd34b75989b9eeb759311b7f6e38"
  },
  {
    "url": "/_nuxt/vendor.f9970efbc8b03c79e027.js",
    "revision": "d7353ff6ba32e73cec7a212dc7006c43"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

