import axios from 'axios';
import * as Util from '../../../common/utils.js';
import filterService from '../../services/filters.js';
import sortService from '../../services/sort.js';
import APIService from '../../api/ahotelListApi.js';
import ahotelListService from '../../services/ahotelListService.js';
import qs from 'qs';

var getAxios = makeRequestCreator();

function makeRequestCreator() {
    var call;
    return function(url) {
        if (call) {
            call.cancel();
        }
        call = axios.CancelToken.source();
        return axios.get(url, 
            {   
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                cancelToken: call.token 
            });
        
    }
}


export const ahotelList = {
    namespaced: true,
    state : {
        params : {
            star_ratings : "",
            hotel_types : "",
            filter_id : "",
            code : "" ,
            type : "" ,
            checkin : "",
            checkout : "",
            room : [],
            count_per_page : 2000,
            dispCtgrNo : 980731,
            mallType : "tour",
            range_max : 0
        },
        citySpot : {},
        sourcemap2 : {},
        emptyReviewList : {},
        currentOrder : {
            key: "best",
            name: "인기순"
        },
        hotelList : [],
        pageSize : 0,
        pageCurrentIndex : 1,
        filterInfo : {
            grades : [],
            facilities : [],
            hotelTypes : []
        },
        bannerInfo : {},
        activeFilterNames : [],
        loadMaxCount: 0 ,//40번까지
        reloadReviewCount : 0,
        reviewLoading : false,
        loading : false,
        partnerMapInfo : {}
    },
    getters : {
        getParams(state){
            return state.params;
        },
        getCitySpot(state){
            return state.citySpot;
        },  
        getFilterInfo(state){
            return state.filterInfo;
        },
        getBannerInfo(state){
            return state.bannerInfo;
        },
        getHotelList(state){
            return state.hotelList.slice(0, 50 * state.pageCurrentIndex);
        },
        isShowMoreBtn(state){
            return ( state.pageCurrentIndex < Math.ceil(state.hotelList.length / 50)) 
        },
        getHotelListSize(state){
            var hotelList = state.hotelList.filter(function (item) {
                return (item.hasOwnProperty("rateList") && item.rateList.length > 0);
            });
            return hotelList.length;
        },
        getStayDays(state){
           return Util.dateUtil.dateDiffInDays(state.params.checkin,state.params.checkout,1);
        },
        getFilterHotelTypes(state){
            return state.filterInfo.hotelTypes;
        },
        getCurrentOrder(state){
            return state.currentOrder;
        },
        isPossibleReload(state){
           return ( state.loadMaxCount < 10 )
        },
        isLoading(state){
            return state.loading;
        },
        isReviewLoading(state){
            return state.reviewLoading;
        },
        getActiveFilterNames(state){
            return state.activeFilterNames;
        },
        getMaxRange(state){
            return state.params.range_max;
        },
        getQueryString(state){

            var queryParam= {
                checkin : state.params.checkin,
                checkout : state.params.checkout,
                type : state.params.type,
                star_ratings : state.params.star_ratings,
                hotel_types : state.params.hotel_types,
                filter_id : state.params.filter_id,
                count_per_page : state.params.count_per_page,
                code : state.params.code
            }

            if(state.params.range_max > 0){
                queryParam.range_max = state.params.range_max;
            } 

            var queryString = qs.stringify(queryParam) + "&room=" + state.params.room.join('&room=');

            return queryString
        },
        getPartnerMapInfo(state){
            return state.partnerMapInfo;
        }
    },
    mutations : {
        setParams (state, params){
            
            if(params.hasOwnProperty('room')){
                params.room = (typeof params.room == 'string') ? [params.room] : params.room;                
            }

            state.params =  Object.assign(state.params, params);
        },
        setHotelList(state, data){
            state.hotelList = data;
        },
        setCitySpot(state, data){
            state.citySpot = data;
        },
        setCurrentOrder(state, item){
            state.currentOrder = item;
        },
        setSourceMap(state, data){
            state.sourcemap2 = data;
        },
        setEmptyReviewList(state, data){
            state.emptyReviewList = data;
        },
        resetFilter(state){
            state.params.range_max = 0;
            state.params.star_ratings = "";
            state.params.hotel_types = "";
            state.params.filter_id = "";
            state.params.activeFilterNames = [];
        },
        setMaxRange(state, value){
            if(value == 0) return;
            state.params.range_max = value; 
        },
        setFilterInfo(state){

            var filterParamKeys = {
                grades : "star_ratings",
                facilities : "filter_id",
                hotelTypes: "hotel_types"
            };

            var applyfilters = filterService.getActiveFilters(state.filterInfo);

            var keys = Object.keys(filterParamKeys);
            keys.map(function(v){
                if(typeof applyfilters[v] == "undefined"){
                    state.params[filterParamKeys[v]] = "";
                }else{
                    state.params[filterParamKeys[v]] = applyfilters[v].join(",");
                }
            });
        },
        addPageIndex(state){
            state.pageCurrentIndex ++;
        }
    },
    actions : {
        getHotelList({dispatch, commit, state, getters}){

            state.loading = true;

            var url = "http://tour.11st.co.kr/tour/ahotel/search/"+ state.params.code+"?"+getters.getQueryString;
         
            getAxios(url).then(function(res){
                if(res.status == 200){
                    console.log(res.data);
                    commit('setCitySpot', res.data.hasOwnProperty('city_spot') ? res.data.city_spot : {});
                    commit('setHotelList',res.data.data);
                    commit('setSourceMap', res.data.hasOwnProperty('source_map2') ? res.data.source_map2 : []);
                    dispatch('loadBulkRateData');
                    commit('setEmptyReviewList',  res.data.hasOwnProperty('empty_review_list') ? res.data.empty_review_list : []);
                    dispatch('loadBulkReviewData');
                    //res.data.data hotelList
                }
            }).catch(function(e){
                state.loading = false;
            })

        },
        loadBulkRateData({state,commit,dispatch, getters}){
            
            if (Object.keys(state.sourcemap2).length === 0 || state.loadMaxCount > 40) {
                
                state.loading = false;

                state.hotelList = state.hotelList.filter(function (item) {
                    
                    if(item.hasOwnProperty("rateList") && item.rateList.length > 0 && item.rateList[0].price > 0){
                        if(state.params.range_max ==  0 || (state.params.range_max > 0 && item.rateList[0].price < state.params.range_max )) return true;
                    }
                    
                    return false;

                });

                state.pageSize = Math.ceil(state.hotelList.length / 50);
                state.loadMaxCount = 0;                
                return;
            }


            var parameter = {
                "checkin": state.params.checkin,
                "checkout": state.params.checkout,
                "room": state.params.room,
                "source_map2": state.sourcemap2
            };

            state.loadMaxCount++;

             //40번 횟수 제한. timeout 1초
             APIService.getBulkRate(parameter).then(function (response) {
                if (response.status == 200) {
                    ahotelListService.updateHotels(state.hotelList, response.data.data);
                    APIService.reloadHotels(commit, dispatch, response.data.source_map2);
                }
            }).catch(function (error) {
                state.loadMaxCount = 0;
                state.loading = false;
            });

        },
        loadBulkReviewData({state, commit, dispatch}){

            state.reviewLoading = true;

            if (Object.keys(state.emptyReviewList).length === 0 || state.reloadReviewCount > 40) {
               state.reloadReviewCount = 0;
               state.reviewLoading = false;
                return;
            }

            state.reloadReviewCount++;

            APIService.getBulkReviewScore(state.emptyReviewList).then(function(response){
                if (response.status == 200) {
                    ahotelListService.updateReview(state.hotelList, response.data.resultReviewMap);
                    APIService.reloadReview(commit,dispatch, response.data.empty_review_list);    
                }    
            }).catch(function (error) {
                state.reloadReviewCount = 0;
                state.reviewLoading = false;
            });



        },
        getFilterList({state}){

            filterService.getFilters().then(function(res){
             
                if(res.status == 200){
   
                    state.filterInfo = filterService.init(res.data,state.params);
                    state.activeFilterNames = filterService.getActiveFilterNames(state.filterInfo);

                    //res.data.ATTRIBUTE_FILTER // 편의 서비스
                    //res.data.ATTRIBUTE_HOTEL_TYPE //숙소타입
   
                }
                
           }).catch(function(e){
   
           });
        },
        getBannerInfo({state}){

            APIService.getBannerInfo().then(function(res){
                if(res.status == 200){
                    if(res.data.length > 0){
                        state.bannerInfo = res.data[0];
                    }
                }        
            });

        },
        sortHotelList({state}){
           // state.currentOrder.key
           sortService.orderHotels(state.hotelList,state.currentOrder.key);
        },
        applyCitySpotSearch({state}){

            var queryParam = {
                checkin : state.params.checkin,
                checkout : state.params.checkout,
                type : state.params.type,
                code : state.params.code,
                mallType : state.params.mallType,
                count_per_page : state.params.count_per_page,
                dispCtgrNo : state.params.dispCtgrNo
            }

            if(state.params.range_max > 0){
                queryParam.range_max = state.params.range_max;
            } 

            var queryString = qs.stringify(queryParam) +  "&room=" + state.params.room.join('&room=');
            
            window.location.href = "http://tour.11st.co.kr/tour/ahotel/getHotelList.tmall?"+queryString;
            
        },
        applyFilterSearch({state, dispatch}){

            var queryParam = {
                checkin : state.params.checkin,
                checkout : state.params.checkout,
                type : state.params.type,
                code : state.params.code,
                star_ratings : state.params.star_ratings,
                hotel_types : state.params.hotel_types,
                filter_id : state.params.filter_id,
                mallType : state.params.mallType,
                count_per_page : state.params.count_per_page,
                dispCtgrNo : state.params.dispCtgrNo
            }

            if(state.params.range_max > 0){
                queryParam.range_max = state.params.range_max;
            } 

            var queryString = qs.stringify(queryParam) +  "&room=" + state.params.room.join('&room=');
            
            window.location.href = "http://tour.11st.co.kr/tour/ahotel/getHotelList.tmall?"+queryString;
            

        },
        getPartnerMapInfo({state}){

            APIService.getPartnerMapInfo().then(function(res){
                state.partnerMapInfo = res.data
            }).catch(function(e){

            })
        }
    }

}