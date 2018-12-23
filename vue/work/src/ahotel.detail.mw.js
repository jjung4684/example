import Vue from 'vue'
//import axios from 'axios'
import "babel-polyfill";
 
//vue Router
// import VueRouter from 'vue-router'
// import { routes } from './ahotel/routes.mw.js'

//import { store } from './ahotel/store/store.mw.js'

import App from './ahotel/components/mwAhotelDetail.vue'


//Vue.prototype.$http = axios;

//Vue.use(VueRouter);

// const router = new VueRouter({
//   routes,
//   // get rid of #
//   mode: 'history'
// });

new Vue({
  el: '#app',
// store,
//  router,
  render: h => h(App)
})