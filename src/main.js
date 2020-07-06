import Vue from 'vue'
import VueRouter from "vue-router"
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { routes } from "./routes"
import store from "./store"
// import AxiosPlugin from 'vue-axios-cors';

// Vue.use(AxiosPlugin)
Vue.use(VueRouter)
Vue.use(Vuetify, {
  iconfont: 'mdi'
})

import App from './App.vue'

Vue.config.productionTip = false

const router = new VueRouter({
  mode: "history",
  routes
});

const opts = {
  theme: {
    dark: false
  }
}

new Vue({
  vuetify: new Vuetify(opts),
  router,
  store,
  render: h => h(App),
}).$mount('#app')
