# vuex-test
### State: 資料
### Getter: 運算後的資料，基本上都是使用State資料經過運算後回傳，通常不接參數的
### Mutation: 同步的運算，不能回傳
### Action: 非同步的運算
### Module: 讓你可以分成多個Store(模組化)
### Plugins: 可以放多的函數至插件裡，會在Store初始化、每次Mutation調用時使用到(後者的方法為store.subscribe((mutation, state))
### Strict Mode(嚴格模式): 無論何時發生了狀態變更且不是由 mutation 函數引起的，將會拋出錯誤。這能保證所有的狀態變更都能被調試工具跟踪到。


*  <a href="#basic-use">Basic use</a>
*  <a href="#利用Module配置">利用Module配置</a>
*  <a href="#module-namespaced如何調用各個module">Module Namespaced(如何調用各個Module)</a>
## Basic use

```
const store = new Vuex.Store({
    state: {

    },
    getters: {
        
    },
    mutations: {
        
    },
    actions: {
        
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

export default OtherStore;
```

## Module Namespaced(如何調用各個Module)
**如何調用各個Module的state, getter, mutations, actions**  
**  namespaced必須設為true
```
this.$store.state.other // state

this.$store.getters['other/xxxGetter']; // getter

this.$store.commit('other/xxxGetter', payload); // mutations

this.$store.dispatch('other/xxxGetter', payload); // actions
```