import Vue from 'vue'
import Vuex from 'vuex'
import {rentcarList} from './modules/rentcarList.js'
import {rentcarCompanyList} from './modules/rentcarCompanyList.js'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules : {
    rentcarList,
    rentcarCompanyList
  }
});