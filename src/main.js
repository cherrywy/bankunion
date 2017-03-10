
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App.vue'
import routers from './routers'
import VueRouter from 'vue-router'
import axios from 'axios'

Vue.prototype.axios = axios;

Vue.use(MintUI)
Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes: routers
})

new Vue({
  el: '#app',
  router,
  axios,

  render: h => h(App)
})
