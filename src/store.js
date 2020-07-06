import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: null
    },

    mutations: {
        setToken(state, token) {
            state.token = token.token
            localStorage.setItem('token', JSON.stringify(token.token))
        },

        clearToken() {
            localStorage.removeItem('token')
            location.reload()
        }
    },

    actions: {
        logout({ commit }) {
            commit('clearToken')
        }
    },

    getters: {
        isLogged: state => !!state.token
    }
})