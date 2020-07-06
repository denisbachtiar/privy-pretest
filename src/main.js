import Vue from 'vue'
import VueRouter from "vue-router"
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { routes } from "./routes"
import store from "./store"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
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

router.beforeEach((to, from, next) => {
  NProgress.start()
  const loggedIn = localStorage.getItem('token')
  var metaauth = to.matched.some(record => record.meta.auth)

  if (metaauth && !loggedIn) {
    next('/')
    return
  }
  else if (metaauth == false && loggedIn != null) {
    next('/main')
    return
  }
  next()
})
router.afterEach(() => {
  NProgress.done(true)
})

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
