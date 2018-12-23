import axios from 'axios';

var hotelGrades = {"5":"5성급","4":"4성급","3":"3성급","2":"2성급","1":"1성급","0":"성급없음"};
var IconClass = {
    hotelTypes  : ["hotel", "motel", "guesthouse", "bnb", "pension", "ryokan"],
    facilities : ["wifi", "breakfast", "parking", "roomservice", "aircon", "tv", "refrigerator"
    ,  "shuttle", "gym", "business", "restaurant", "pool", "spa"]
}
export default {

    getFilters(){
        var url = "http://tour.11st.co.kr/Tour/ahotel/filterTypes";
        return axios.get(url,{
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        });
    },
    init(data, param){

        var filterInfo = {};

        filterInfo.grades = this.initActiveAttr(this.createFilter(hotelGrades, 'grades'),param.star_ratings); //호텔등급
        filterInfo.facilities = this.initActiveAttr(this.createFilter(data.ATTRIBUTE_FILTER,'facilities'),param.filter_id); // 편의 서비스
        filterInfo.hotelTypes = this.initActiveAttr(this.createFilter(data.ATTRIBUTE_HOTEL_TYPE,'hotelTypes'),param.hotel_types);  //숙소타입

        return filterInfo;

    }, initActiveAttr(filters, activeKeys) {

        if (activeKeys == null || typeof activeKeys === 'undefined' || activeKeys.length == 0 || activeKeys == "") return filters;

        var s_activekeys = activeKeys.split(',');

        s_activekeys.map(function (key) {
            filters.map(function (obj) {
                if (obj.key == key) {
                    obj.isActive = true;
                }
            });
        });

        return filters;

    }, createFilter(data, type){

        var keys = Object.keys(data);
        var filterData = [];

        keys.map( (v, index) => filterData.push({
            key : v,
            value : data[v],
            isActive : false,
            type : type,
            iconClass : (IconClass.hasOwnProperty(type)) ? "ico_"+IconClass[type][index] : ""
        }))

        return filterData;
       
    }, getActiveFilters(filterInfo){

       var keys =  Object.keys(filterInfo);

       var applyObj = {};

       keys.map(function(v){
            var result = filterInfo[v].filter(function(obj){
                return obj.isActive;
            }).map(function(obj){
                return obj.key
            });

            if(result.length > 0){
                applyObj[v] = result;
            }
       });

       return applyObj;
     
    },
    getActiveFilterNames(filterInfo){

        var keys =  Object.keys(filterInfo);
 
        var applyFilterNames = [];
 
        keys.map(function(v){
            var result = filterInfo[v].filter(function(obj){
                return obj.isActive;
            })

            if(result.length > 0){
                applyFilterNames = applyFilterNames.concat(result);
            }
        });
 
        return applyFilterNames;
      
     }

}