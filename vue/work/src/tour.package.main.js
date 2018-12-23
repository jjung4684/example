import Vue from 'vue'
import axios from 'axios'

//vue Router
import VueRouter from 'vue-router'
import { routes } from './tourpackage/routes.js'
import { store } from './tourpackage/store/store.js'
import { VLazyImagePlugin } from "v-lazy-image"
Vue.use(VLazyImagePlugin,{offset : 2});

import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage)

import App from './App.vue'
import VModal from 'vue-js-modal'

import VueMoment from 'vue-moment'
const moment = require('moment-timezone')
require('moment/locale/ko')
Vue.use(VueMoment, {
  moment
})

//ios lazyloading시 필요
require('intersection-observer');

import isEmpty from 'lodash.isempty'
Vue.prototype.$isEmpty = isEmpty;


Vue.prototype.$http = axios;
Vue.use(VueRouter);
Vue.use(VModal);

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {

    if (savedPosition) {
        return savedPosition
    } else {
        return {x: 0, y: 0}
    }

  },
  // get rid of #
    mode: 'history'
});

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
