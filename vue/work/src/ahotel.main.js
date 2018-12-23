import Vue from 'vue'
import axios from 'axios'
import "babel-polyfill";
 
//vue Router
import VueRouter from 'vue-router'
import { routes } from './ahotel/routes.js'

import { store } from './ahotel/store/store'

//import App from './App.vue'

import App from './ahotel/components/frontAhotelList.vue'

// import { VLazyImagePlugin } from "v-lazy-image"

// Vue.use(VLazyImagePlugin);

// import { intersectionObserver } from "intersection-observer"

// Vue.use(intersectionObserver);

Vue.prototype.$http = axios;

Vue.use(VueRouter);

const router = new VueRouter({
  //routes,
  // get rid of #
  mode: 'history'
});

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})