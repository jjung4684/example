import Vue from 'vue'
import Vuex from 'vuex'
import {ahotelList} from './modules/ahotelList'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules : {
    ahotelList
  }
});