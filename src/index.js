import {initCacheModule} from './utils'

const VueCachePlugin = {
  /**
   * Install cache plugin
   *
   * @param {Vue} Vue
   * @param {Object} options
   */
  install: (Vue, options = {}) => {
    if (Vue._uam_vuejs_cache_installed) {
      return
    }

    let store = options.store
    let axios = options.axios
    let dbVersionHeaderKey = options.dbVersionHeaderKey
    let cacheRoute = options.cacheRoute

    initCacheModule(store, axios, dbVersionHeaderKey, cacheRoute)

    Vue._uam_vuejs_cache_installed = true
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueCachePlugin)
}

export default VueCachePlugin
