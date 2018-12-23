import Vue from 'vue'
import Vuex from 'vuex'
import {ahotelDetail} from './modules/ahotelDetail'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules : {
    ahotelDetail
  }
});