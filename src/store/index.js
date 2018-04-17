import Vuex from 'vuex'
import PouchDB from 'pouchdb-browser'

const cacheDb = new PouchDB('_uam_vuejs_cache')

function createStore (dbVersion, cacheData) {
  return new Vuex.Store({
    state: {
      cache: cacheData,
      db_version: dbVersion,
      updating_cache: false
    },
    getters: {
      cacheData: state => (key) => {
        return state.cache[key]
      },
      dbVersion: state => state.db_version,
      updatingCache: state => state.updating_cache
    },
    mutations: {
      ['UPDATE_DB_VERSION'] (state, version) {
        state.db_version = version
      },
      ['UPDATE_CACHE'] (state, cache) {
        state.cache = cache
        state.updating_cache = false
      },
      ['UPDATE_CACHE_START'] (state) {
        state.updating_cache = true
      }
    }
  })
}

export function initStore () {
  return new Promise((resolve) => {
    cacheDb.allDocs({
      include_docs: true,
      keys: ['db_version', 'cache']
    })
      .then(result => {
        let dbVersion = !result.rows[0].error ? result.rows[0].doc.data : ''
        let cacheData = !result.rows[1].error ? result.rows[1].doc.data : {}

        let store = createStore(dbVersion, cacheData)

        resolve(store)
      })
  })
}
