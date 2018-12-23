import axios from 'axios';

var _TOUR_ROOT_URL_HTTP_ = "http://tour.m.11st.co.kr/MW";

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
export default {
    getApackageList(param){
        return axios.get(_TOUR_ROOT_URL_HTTP_ + "/Tour/apackage/list?" + param);
    },
    getFilters(param){
        return axios.get(_TOUR_ROOT_URL_HTTP_ + "/Tour/apackage/filter?" + param);
    },
    getFilterSearchCount(param){
        return axios.get(_TOUR_ROOT_URL_HTTP_ + "/Tour/apackage/search_count?" + param);
    },
    getLowestPriceDateList(param){
        //http://tour.m.11st.co.kr/MW/Tour/apackage/lowestPriceDateList?deptCityCd=68789705&arrvCityCd=68855695
        return axios.get(_TOUR_ROOT_URL_HTTP_ + "/Tour/apackage/lowestPriceDateList?" + param);
    }

}