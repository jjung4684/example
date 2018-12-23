
import axios from 'axios';
import APIService from '../../js/listing/apackageListApi.js';
import qs from 'qs';
import isEmpty from 'lodash.isempty'


function validQueryStringFn(obj){
    var keys = Object.keys(obj);
    var validObj = {};
    keys.map(function(key){
        if(obj[key] !== "" && typeof obj[key] !== "undefined"){
            validObj[key] = obj[key];
        }
    })
    
    return validObj;
}

export const tourpackageList = {
    namespaced: true,
    state : {
        params : {
            default : {
                mallType : 'tour',
                dispCtgrNo : '980730',
                departureText : "",
                departureCity : "", //출발지
                destination : "", // 도착지(도시, 대륙, 국가명)
                departureDate : "",
                destinationCode : ""
            },
            options : {
                //상세조건
                tourType : "",
                duration : "",
                departureTime : "",
                agency : "",
                airline : "",
                shopping : "",
                status : "",
                reservationType : "",
                minPrice : "",
                maxPrice : ""
            }
        },
        quickSearchInfo : {
            searchInfo : {},
            regionInfo : {}
        },
        bannerInfo : {},
        filterTagList : [],
        searchCount : null,
        tempProductList : [],
        productList : [],
        currentOrder : {
            key : "POP_SCORE",
            name : "인기순"
        },
        totalCount : 0,
        currentPageNum : 1 ,
        isLoading : false
    },
    getters: {
        currentOrder(state){
            return state.currentOrder;
        },
        resultInfo(state){
            return {
                departureText : state.params.default.departureText,
                departureCity : state.params.default.departureCity,
                destination : state.params.default.destination,
                departureDateArr : (state.params.default.departureDate.length > 1) ? state.params.default.departureDate.split("~~") : []
            }
        },
        regionInfo(state){
            return state.quickSearchInfo.regionInfo;
        },
        bannerInfo(state){
            return state.bannerInfo;
        },
        filterTagList(state){
            return state.filterTagList;
        },
        filterSearchParam(state){
            return validQueryStringFn(state.params.options);
        },
        filterSearchCount(state){
            return state.searchCount;
        },
        productList(state){
            return state.productList;
        },
        isShowMoreBtn(state){
            return ( state.currentPageNum < Math.ceil(state.totalCount / 30)) 
        },
        totalCnt(state){
            return state.totalCount;
        },
        isLoading(state){
            return state.isLoading;
        },
        searchQueryString(state){
            var queryString = validQueryStringFn(Object.assign({},state.params.default,state.params.options));
            queryString.sort = state.currentOrder.key;
            queryString.pageNum = (state.currentPageNum > 1) ? state.currentPageNum : 1;
            return queryString;
        },
        conditionData(state){
            return {
                filterTagList : state.filterTagList,
                currentOrder : state.currentOrder,
            }
        }
    },
    mutations: {
        setParams (state, params){

           let defaultKeys = Object.keys(state.params.default);
           defaultKeys.map(key => {
                state.params.default[key] = (params.hasOwnProperty(key)) ? params[key] : "";
           });
          
          let isResetTag = true;

          let optionsKeys = Object.keys(state.params.options);
            optionsKeys.map(key => {
                let hasParamKey = (params.hasOwnProperty(key));
                if(hasParamKey) isResetTag = false;
                state.params.options[key] = (hasParamKey) ? params[key] : "";
          });

          state.currentPageNum = params.hasOwnProperty('pageNum') ? params.pageNum : 1;

          if(!params.hasOwnProperty('sort')){
            state.currentOrder = {
                key : "POP_SCORE",
                name : "인기순"
            };
          }
          

          if(isResetTag) state.filterTagList = [];

        },
        setSearchQuery(state, payload){
            
            if(payload.hasOwnProperty("defaultParam")){
                state.params.default =  Object.assign(state.params.default, payload.defaultParam);
            }

            if(payload.hasOwnProperty("optionParam")){

                let defaltFilter ={
                    tourType : "",
                    duration : "",
                    departureTime : "",
                    agency : "",
                    airline : "",
                    shopping : "",
                    status : "",
                    reservationType : "",
                    minPrice : "",
                    maxPrice : ""
                }
    
                defaltFilter = Object.assign(defaltFilter, payload.optionParam);
                state.params.options =  Object.assign(state.params.options, defaltFilter);

            }   

            if(payload.hasOwnProperty("pageNum")){
                state.currentPageNum = payload.pageNum;
            }

            if(payload.hasOwnProperty("currentOrder")){
                state.currentOrder = payload.currentOrder;
            }

        },
        setCurrentOrder(state, item){
            state.currentOrder = item;
        },
        setRegionInfo(state, data){

            if(data !== null && typeof data !== "undefined"){
                state.quickSearchInfo.regionInfo = {
                    properTime :  (!isEmpty(data.properTime)) ? data.properTime.split('-').map( res => res.replace(/[^0-9]/g,"")) : "",
                    flightTime : (!isEmpty(data.flightTime)) ? data.flightTime.split(' ').map( res => res.replace(/[^0-9]/g,"")) : "",
                    gmtTime : (!isEmpty(data.gmtTime)) ? data.gmtTime : null,
                    voltage : (!isEmpty(data.voltage)) ? data.voltage : null,
                    visa : (!isEmpty(data.visa)) ? data.visa : null,
                    backgroundImg : (!isEmpty(data.lnkBnnrImgUrl)) ? data.lnkBnnrImgUrl : ""
                }
            }else{
                state.quickSearchInfo.regionInfo = {};
            }
        },
        setBannerInfo(state, data){
            if(typeof data == "object" && data.length > 0){
               state.bannerInfo = data[0];
            }
        },
        setFilterTagList(state,data){
            state.filterTagList = data;
        },
        setTempProductList(state,data){
            state.tempProductList = data;
        },
        setProductList(state, data){

            if(typeof data == "undefined"){
                state.productList = [];
                return;
            }

            state.productList = data;
              
        },
        updateProductList(state, data){

            if(typeof data == "object" && data.length > 0){
                state.productList = state.productList.concat(data);
                if(state.tempProductList.length > 0 && (state.tempProductList[0].prdNo !== state.productList[0].prdNo)){
                    let findIndex = state.tempProductList.findIndex(a=>a.prdNo == data[0].prdNo);
                    
                    state.productList = (findIndex == -1) ? state.tempProductList.concat(state.productList) : state.tempProductList;
                }

                state.tempProductList = [];

            }

        },
        addPageIndex(state){
            state.currentPageNum++;
        },
        setTotalCount(state,data){
            state.totalCount = data;
        }
    },
    actions: {
        //상세조건 레이어 상품수 API
        getFilterSearchCount({state},data){


            var queryString = validQueryStringFn(Object.assign({},state.params.default,data));
            APIService.getFilterSearchCount( qs.stringify(queryString)).then(function(res){
                if(res.status == 200){
                    state.searchCount = res.data;
                }        
            })

        },
        //해외 패키지 상품 리스트 정보 API
        getApackageList({state, commit, getters}, payload){

            state.isLoading = (!isEmpty(payload) && payload.hideLoadingBar) ? false : true;            

            var validQueryString = getters.searchQueryString;

            validQueryString.isRegionInfo = (!isEmpty(payload) && payload.loadRegionInfo == false) ? "N" : "Y";            

            APIService.getApackageList( qs.stringify(validQueryString)).then(function(res){
                if(res.status == 200){

                  var result = res.data;
                  //해당 여행지 기본 정보

                  if(validQueryString.isRegionInfo == "Y"){
                    commit('setRegionInfo',result.regionInfo);
                    commit('setBannerInfo',result.bannerList);
                  }  

                  if(validQueryString.pageNum == 1){
                    commit('setProductList',result.productList);
                  }else{
                    commit('updateProductList',result.productList);
                  }
                  
                  commit('setTotalCount', result.totalCount);

                }
            }).catch(function(err){
                commit('setTotalCount',0);
                commit('setProductList',[]);
            }).then(function(){
                state.isLoading = false;
            })

        }
        ,getFilter({state}){

           return APIService.getFilters(qs.stringify(state.params.default));
        }  
 

    }
}
