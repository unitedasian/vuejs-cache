# Vuejs cache plugin

## Installation

### via npm

```bash
npm install @uam/vuejs-cache
```

### via yarn

```bash
yarn add @uam/vuejs-cache
```
## Requirements

This package need following packages installed in your app

  - pouchdb-browser@^6.4.3
  - vue@^2.5.16
  - vuex@^3.0.1

### Api requirements

Your api needs to attach a custom header for db version, the cache data is updated based on this version.

## Usage

Install Vuejs cache plugin as follows:

```js
# main.js

import cachePlugin from '@uam/vuejs-cache'

Vue.use(cachePlugin, {options})

```

### Options

| Option                 | Description                                              | Type     | Required |
|:-----------------------|:---------------------------------------------------------|:---------|:---------|
| store                  | Main store to which the cache module is attached to      | Object   | true     |
| axios                  | The instance of axios used by app                        | Object   | true     | 
| dbVersionHeaderKey     | Custom response header key for db version                | String   | true     |
| cacheRoute             | Route to fetch cache data                                | String   | true     |

Once you have registered the plugin. It attaches a `uam_cache` module to the store, The cached data received from the cacheRoute can be accessed as

### using store
 
```js

store.uam_cache.cache.<key>
```
Or

```js

store.uam_cache.cache[<key>]
```

### use getters

```js
# File.vue

// ..
// ..
this.$store.getters['uam_cache/cacheData'](key)

```
## Displaying message to users when updating cache

The cache module has a getter `updatingCache` that is true when the data is being fetched from the server.

you can use the getter to add visual clues about ongoing update.
