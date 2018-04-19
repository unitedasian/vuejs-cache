import PouchDB from 'pouchdb-browser'

const cacheDb = new PouchDB('_uam_vuejs_cache')
const MODULE_NAME = 'uam_cache'

function fetchCacheData (axios, store, cacheRoute) {
  store.commit(`${MODULE_NAME}/UPDATE_CACHE_START`)

  axios.get(cacheRoute)
    .then(response => {
      cacheDb.get('cache')
        .then(doc => {
          doc.data = response.data

          cacheDb.put(doc)
        })
        /* eslint-disable handle-callback-err */
        .catch(error => {
          cacheDb.put({
            _id: 'cache',
            data: response.data
          })
        })

      store.commit(`${MODULE_NAME}/UPDATE_CACHE`, response.data)
    })
}

function createModule (dbVersion, cacheData) {
  return {
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
      'UPDATE_DB_VERSION' (state, version) {
        state.db_version = version
      },
      'UPDATE_CACHE' (state, cache) {
        state.cache = cache
        state.updating_cache = false
      },
      'UPDATE_CACHE_START' (state) {
        state.updating_cache = true
      }
    },
    namespaced: true
  }
}

function initAxiosInterceptor (store, axios, dbVersionHeaderKey, cacheRoute) {
  axios.interceptors.response.use((response) => {
    let dbVersion = response.headers[dbVersionHeaderKey]

    if (store.getters[`${MODULE_NAME}/dbVersion`] !== dbVersion) {
      fetchCacheData(axios, store, cacheRoute)

      cacheDb.get('db_version')
        .then(doc => {
          doc.data = dbVersion
          cacheDb.put(doc)
        })
        /* eslint-disable handle-callback-err */
        .catch(error => {
          cacheDb.put({
            _id: 'db_version',
            data: dbVersion
          })
        })

      store.commit(`${MODULE_NAME}/UPDATE_DB_VERSION`, dbVersion)
    }

    return response
  })
}

export function initCacheModule (store, axios, dbVersionHeaderKey, cacheRoute) {
  return new Promise((resolve) => {
    cacheDb.allDocs({
      include_docs: true,
      keys: ['db_version', 'cache']
    })
      .then(result => {
        let dbVersion = !result.rows[0].error ? result.rows[0].doc.data : ''
        let cacheData = !result.rows[1].error ? result.rows[1].doc.data : {}

        let module = createModule(dbVersion, cacheData)

        store.registerModule(MODULE_NAME, module)

        initAxiosInterceptor(store, axios, dbVersionHeaderKey, cacheRoute)

        resolve(module)
      })
  })
}
