
import APIService from '../../js/listing/apackageListApi.js';
import qs from 'qs';


export const tourpackageCalendar = {
    namespaced: true,
    state : {
        selectedDates : [], //date Object Array
        lowestPriceDateList : [] 
    },
    getters: {
        selectedDates(state){
            return state.selectedDates;
        },
        lowestPriceDateList(state){
            return state.lowestPriceDateList;
        }
    },
    mutations: {
        setSelectedDates(state,data){
            state.selectedDates =  (typeof data == "undefined") ? [] : data;
        },
        setLowestPriceDateList(state,data){
            state.lowestPriceDateList = (typeof data == "undefined") ? [] : data;
        }
    },
    actions: {
        
        getLowestPriceDateList({state,commit},payload){
            APIService.getLowestPriceDateList(qs.stringify(payload)).then(res =>{
                commit('setLowestPriceDateList',res.data.pkgPriceList);
            });
        }

    }
}
