# vuex-test
### State: 資料
### Getters: 運算後的資料，基本上都是使用State資料經過運算後回傳，通常不接參數的
### Mutation: 同步的運算，不能回傳
### Action: 非同步的運算
### Module: 讓你可以分成多個Store(模組化)
### Plugins: 可以放多的函數至插件裡，會在Store初始化、每次Mutation調用時使用到(後者的方法為store.subscribe((mutation, state))
### Strict Mode(嚴格模式): 無論何時發生了狀態變更且不是由 mutation 函數引起的，將會拋出錯誤。這能保證所有的狀態變更都能被調試工具跟踪到。


*  <a href="#basic-use">Basic use</a>
*  <a href="#利用Module配置">利用Module配置</a>
*  <a href="#module-namespaced如何調用各個module">Module Namespaced(如何調用各個Module)</a>
*  <a href="#搭配firebase的user-storestore-firebase-userjs">搭配firebase的user store(store-firebase-user.js)</a>
*  <a href="#基本的firebase的crud架構storestore-firebase-productsjs">基本的firebase架構的store(store-firebase-articles.js)</a>
## Basic use

```
const store = new Vuex.Store({
    namespaced: true,
    state: {
        data: null // 使用: this.$store.state.module.data (但不建議直接調用)
    },
    getters: {
        // 使用: this.$store.getters['module/getData']
        getData: (state) => {
            return state.data
        },
        // 使用: this.$store.getters['module/getDataById'](id)
        getDataById: (state) => (id) => {
            return state.data[id]
        }
    },
    mutations: {
        // 使用: this.$store.commit('module/setData', payload)
        setData(state, payload) {
            state.data = payload
        }
    },
    actions: {
        // 使用: this.$store.dispatch('module/setData', payload)
        getDataAction({ state, getters, dispatch, commit }, payload) {
            // 做些非同步的事
            return new Promise((resolve, reject) => {
                // ...
            })
        }
    },
    plugins:[]
})
```
## Module

index.js
```
import Vue from 'vue'
import Vuex from 'vuex'

import OtherStore from './OtherStore.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        other: OtherStore
    }
})
```
OtherStore.js
```
const OtherStore = {
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {}
}

export default OtherStore
```

## Module Namespaced(如何調用各個Module)
**如何調用各個Module的state, getter, mutations, actions**  
*  namespaced必須設為true
```
this.$store.state.other // state

this.$store.getters['other/xxxGetter'] // getters

this.$store.commit('other/xxxMutations', payload) // mutations

this.$store.dispatch('other/xxxActions', payload) // actions
```

## 搭配firebase的user store(store-firebase-user.js)

*  使用email，password的登入系統
*  包含註冊、登入、登出、驗證信箱

## 基本的firebase架構的store(store-firebase-articles.js)

*  包含新增、刪除、修改、搜尋、排序、分頁
