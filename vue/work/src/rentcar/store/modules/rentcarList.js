import axios from 'axios';
import * as Util from '../../utils/tour-list.js';
import qs from 'qs';


var get = makeRequestCreator();

function makeRequestCreator() {
    var call;
    return function(url, query) {
        if (call) {
            call.cancel();
        }
        call = axios.CancelToken.source();
        return axios.get(url, 
            {   
                params: query,
                headers: {
                'Access-Control-Allow-Origin': '*',
            },
                cancelToken: call.token 
            });
        
    }
}

export const rentcarList = {
    state: {
       carinfoList : [],
       currentOrder : {
          key : "LOW_PRICE",
          name : "최저가순"
       },
       pageIndex : 1,
       pageSize : 0,
       isMore : true,
       isShowModal : false,
       isLoading : false,
       showFilter : false,
       showSort : false,
       quickSearchInfo : {
            checkin : {},
            checkout : {},
            dates : [],
            grade : {
                keys : [Util.carTypeKeys.carCodes2],
                names : [Util.carTypeCodes[Util.carTypeKeys.carCodes2]]  
            },
            insurance : {
                key : Util.insurTypeKeys.insurCodes1,
                name :  Util.insurTypeCodes[Util.insurTypeKeys.insurCodes1]
            }
       },
       query : {},
       filterTagList : [],
       applyFilterInfo : {
           vendor : [],
           fuel : [],
           capacity : [],
           keyword : ""
       }
    },
    getters: {
        currentOrder(state){
            return state.currentOrder;
        },
        showSort(state){
            return state.showSort;
        },
        showFilter(state){
            return state.showFilter;
        },
        carCount(state){
            return state.carinfoList.length;
        },
        isMore (state){
            return state.pageIndex < state.pageSize;
        },
        carinfoList(state){
            return state.carinfoList.slice(0,1000*state.pageIndex);
        },
        isLoading (state){
            return state.isLoading
        },
        isShowModal(state){
            return state.isShowModal;
        },
        quickSearchInfo (state){
            return state.quickSearchInfo;
        },
        query(state){
            return state.query;
        },
        filterTagList(state){
            return state.filterTagList;
        },
        applyFilterInfo(state){
            return state.applyFilterInfo;
        },
        filterQueryString(state){

            return {
                vendor : (state.query.hasOwnProperty("vendor")) ? state.query.vendor : "",
                fuel : (state.query.hasOwnProperty("fuel")) ? state.query.fuel : "",
                capacity : (state.query.hasOwnProperty("capacity")) ? state.query.capacity : "",
                keyword : (state.query.hasOwnProperty("keyword")) ? decodeURIComponent(state.query.keyword) : ""      
            }
          
        }
    },
    mutations: {
       setQuery(state, query){
           state.query = query;
           this.commit('setQuickSearchInfo',query);
       },
       setFilterQuery(state, opt){
           state.query.vendor = opt.vendor;
           state.query.fuel = opt.fuel;
           state.query.capacity = opt.capacity;
           state.query.keyword = encodeURIComponent(opt.keyword);
       },
       setSortQuery(state, val){
           state.query.sort = val;
       },
       setQuickSearchInfoQuery(state, opt){
         state.query.insuranceType = state.quickSearchInfo.insurance.key;
         state.query.grade = state.quickSearchInfo.grade.keys.join('@'); 
         state.query.checkin = state.quickSearchInfo.checkin.year + state.quickSearchInfo.checkin.month + state.quickSearchInfo.checkin.date;
         state.query.checkout = state.quickSearchInfo.checkout.year + state.quickSearchInfo.checkout.month + state.quickSearchInfo.checkout.date;
         state.query.checkinTime = state.quickSearchInfo.checkin.hour + state.quickSearchInfo.checkin.minute;
         state.query.checkoutTime = state.quickSearchInfo.checkout.hour + state.quickSearchInfo.checkout.minute;
       },
       setQuickSearchInfo(state, query){

            var checkin = query.checkin;
            var checkinTime =  query.checkinTime;
            var checkinDate = Util.convertStringToDate(checkin,checkinTime);

            var checkout = query.checkout;
            var checkoutTime =  query.checkoutTime;
            var checkoutDate = Util.convertStringToDate(checkout,checkoutTime);
            
            state.quickSearchInfo.checkin = Util.parseDate(checkinDate);
            state.quickSearchInfo.checkout = Util.parseDate(checkoutDate);

            state.quickSearchInfo.dates = [checkinDate, checkoutDate];

            if(typeof query.grade !== "undefined"){
                var queryGrades = decodeURIComponent(query.grade);
                state.quickSearchInfo.grade.keys = queryGrades.split('@');
                state.quickSearchInfo.grade.names = Util.carTypeName(queryGrades.split('@'));
            }
            
            if(typeof query.insuranceType !== "undefined"){
                state.quickSearchInfo.insurance.key = query.insuranceType;
                state.quickSearchInfo.insurance.name = Util.insuranceName(query.insuranceType);
            }
        
       },
       setQuickSearchData(state, opts){

        state.quickSearchInfo.checkin = opts.checkin;
        state.quickSearchInfo.checkout = opts.checkout;
        state.quickSearchInfo.dates = opts.dates;
        state.quickSearchInfo.grade.keys = opts.grade;
        state.quickSearchInfo.grade.names = Util.carTypeName(opts.grade);
        state.quickSearchInfo.insurance.key = opts.insurance;
        state.quickSearchInfo.insurance.name = Util.insuranceName(opts.insurance);

       },
       //정렬 
       setCurrentOrder(state, obj){
          state.currentOrder = obj;
          state.query.sort = obj.key;
       },
       addPageIndex(state){
         state.pageIndex++;
       },
       setIsShowModal(state, value){
          state.isShowModal = value; 
       },
       setCarInfoList(state, value){
          state.carinfoList = value;
       },
       setIsLoading(state, value){
          state.isLoading = value;
       },
       setPageSize(state,value){
          state.pageSize = value;  
       },
       openSort(state){
        state.showFilter = false;
        state.showSort = true;
       },
       openFilter(state){
        state.showFilter = true;
        state.showSort = false;
       },
       closeFilter(state){
        state.showFilter = false;
       },
       closeSort(state){
        state.showSort = false;
       },
       /***
         * condition tagList
         */
       setFilterKeyword(state, value){
            state.applyFilterInfo.keyword = value;
       },
       setFilterApplyInfo(state, opt){
            state.applyFilterInfo[opt.type] = opt.keys;
       }, 
       setFilterTagList(state, arr){
            state.filterTagList = arr;       
       },        
        clearfilterTagList(state){
            state.applyFilterInfo.vendor = [];
            state.applyFilterInfo.fuel = [];
            state.applyFilterInfo.capacity = [];
            state.applyFilterInfo.keyword = "";
            state.filterTagList = [];
        }

    },
    actions: {
        applySearch({dispatch, commit, state}){

            commit('setFilterQuery', Util.toStringAttributeKeys(state.applyFilterInfo));           
            dispatch('fetchData');

        },
        replaceHistoryUrl({state}){

            var historyQuery =  qs.stringify(state.query);

            var originUrl = window.location.href.split("?")[0];

            window.history.replaceState(null, null, originUrl+ "?" + historyQuery);

            // console.log('historyLocation : ' + originUrl+ "?" + historyQuery);


        },
        fetchData({dispatch, commit, state}){

            //rentcar_calendar.js에 존재 공통으로 사용.
            if(isValidationCheckInDate(state.quickSearchInfo.dates[0])){

                commit('setIsLoading', true);

                var url = "http://tour.m.11st.co.kr/MW/Tour/jeju/carlist";
        
                state.query.pageSize = 1000;

                get(url,state.query).then(function(res){

                    if(res.status == 200){ 

                        dispatch('replaceHistoryUrl');

                        var carList = (res.data.totalCount > 0) ? res.data.carinfoList : [];

                        commit('setCarInfoList',carList);
                        commit('setPageSize',Math.ceil(carList.length / 1000));
                        commit('setIsLoading', false);
                    
                    }else{
                        commit('setCarInfoList',[]);
                        commit('setPageSize',0);
                        commit('setIsLoading', false);
                    }  
                    // console.log(res.data);
                }).catch(function(thrown){
                    if (axios.isCancel(thrown)) {
                        commit('setIsLoading', true);
                        // console.log('First request canceled', thrown.message);
                    } else {
                        commit('setCarInfoList',[]);
                        commit('setPageSize',0);
                        commit('setIsLoading', false);
                    }
                })

            }
                
            
        },
        goProductPage({state},productNo){

            var queryObj = {
                checkin : state.query.checkin,
                checkout : state.query.checkout,
                checkinTime : state.query.checkinTime,
                checkoutTime : state.query.checkoutTime,
                productNo : productNo
            }

            var queryString =  qs.stringify(queryObj);

            window.location.href = "http://tour.m.11st.co.kr/MW/Tour/jeju/rentcarDetail.tmall?"+queryString;

        }
    }
}