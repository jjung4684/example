import Vue from 'vue'
import Vuex from 'vuex'
import {tourpackageMain} from './modules/tourpackageMain.js'
import {tourpackageList} from './modules/tourpackageList.js'
import {tourpackageSearchModal}  from './modules/tourpackageSearchModal.js'
import {tourpackageCalendar} from './modules/tourpackageCalendar.js'
Vue.use(Vuex);

export const store = new Vuex.Store({
  modules : {
    tourpackageMain,
    tourpackageList,
    tourpackageSearchModal,
    tourpackageCalendar
  }
});
