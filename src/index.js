import VueAuthenticate from 'vue-authenticate'
import VueAxios from 'vue-axios'

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

    Vue._uam_vuejs_cache_installed = true
  }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueCachePlugin)
}

export default VueCachePlugin
