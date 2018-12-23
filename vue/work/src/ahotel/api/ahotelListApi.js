import axios from 'axios';

var _TOUR_ROOT_URL_HTTP_ = "http://tour.11st.co.kr";

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default {

    getBulkRate(param) {
        return axios.post(_TOUR_ROOT_URL_HTTP_ + "/tour/ahotel/getBulkRate?simple=false", param);
    },
    getBulkReviewScore(param) {
        return axios.post(_TOUR_ROOT_URL_HTTP_ + "/tour/ahotel/getBulkReviewScore?simple=false", param);
    },
    callHotelsAjax(param) {
        return axios.get(_TOUR_ROOT_URL_HTTP_ + "/tour/ahotel/getHotelListAjax?" + param);
    },
    getPartnerMapInfo(){
        return axios.get(_TOUR_ROOT_URL_HTTP_ + "/Tour/ahotel/partnerInfoMap");
    },
    getBannerInfo(){
        return axios.get(_TOUR_ROOT_URL_HTTP_ + "/tour/displaySpace/BN_952281_9281");
    },
    reloadHotels(commit, dispatch, sourceMap2){
        return new Promise(function(resolve,reject){
            commit('setSourceMap', sourceMap2);
            setTimeout(function(){
                dispatch('loadBulkRateData');
                resolve();
            },1000);
        })
    },
    reloadReview(commit, dispatch, emptyReviewListMap){
        return new Promise(function(resolve,reject){
            commit('setEmptyReviewList', emptyReviewListMap);
            setTimeout(function(){
                dispatch('loadBulkReviewData');
                resolve();
            },1500);
        })
    }

}

