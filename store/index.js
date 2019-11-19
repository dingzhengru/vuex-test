import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './store-firebase-user.js'
import articles from './store-firebase-articles.js'

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: user,
    articles: articles
  }
})
