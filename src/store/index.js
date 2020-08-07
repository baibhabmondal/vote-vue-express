import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    getUser: (state) => {
      return state.user;
    }
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload
    }
  },
  actions: {
    setUser({commit}, payload) {
      commit('setUser', payload)
    }
  },
  modules: {
  }
})
