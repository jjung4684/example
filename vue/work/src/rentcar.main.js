import Vue from 'vue'
import axios from 'axios'
 
//vue Router
import VueRouter from 'vue-router'
import { routes } from './rentcar/routes.js'

import { store } from './rentcar/store/store'

import App from './App.vue'

import { VLazyImagePlugin } from "v-lazy-image"

Vue.use(VLazyImagePlugin);

Vue.prototype.$http = axios;

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  //get rid of #
   mode: 'history'
});

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})