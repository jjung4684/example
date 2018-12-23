import axios from 'axios';

var _TOUR_ROOT_URL_HTTP_ = "http://tour.m.11st.co.kr/MW/";
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

export const tourpackageSearchModal = {
  namespaced: true,
  state : {
    searchParam :{},
    majorCityList : [],
    departureCityList :[],
    autoCompleteSearchList:{}
  },

  mutations: {

    setSearchParam : (state, obj) =>{

      if(typeof  obj.dptDispObjNm !== 'undefined' && obj.dptDispObjNm !== '') state.searchParam.dptDispObjNm = obj.dptDispObjNm;
      if(typeof  obj.dptDispObjNo !== 'undefined' && obj.dptDispObjNo !== '') state.searchParam.dptDispObjNo = obj.dptDispObjNo;
      if(typeof  obj.arrDispObjNm !== 'undefined' && obj.arrDispObjNm !== '') state.searchParam.arrDispObjNm = obj.arrDispObjNm;
      if(typeof  obj.arriveDate !== 'undefined' ) state.searchParam.arriveDate = obj.arriveDate;
      if(typeof  obj.departureDate !== 'undefined') state.searchParam.departureDate = obj.departureDate;
      if(typeof  obj.arrDispObjNo !== 'undefined') state.searchParam.arrDispObjNo = obj.arrDispObjNo;
    },

    setMajorCities : (state, obj) =>{

      if(obj.majorCityList.length > 0){

        for(let i in obj.majorCityList){
          if(obj.majorCityList[i].dispObjNo == 10391722 || i == 0){
            obj.majorCityList[i].display = true;
          }else{
            obj.majorCityList[i].display = false;
          }

          for(let j in obj.majorCityList[i].dpDispObjBOList){
            let objd = obj.majorCityList[i].dpDispObjBOList[j];

            if(typeof objd.extraText === 'undefined'){
              objd.extraText = "";
            }
          }
        }
        state.majorCityList = obj.majorCityList;
      }

      if(obj.departureCityList.length > 0){
        state.departureCityList = obj.departureCityList;
      }
    },

    majorCityshow : (state, obj)=>{

      let marObj = state.majorCityList;

      for(let i in marObj){
        marObj[i].display = false;

        if(marObj[i].dispObjNo == obj) marObj[i].display = true;
      }
    },

    setAutoCompleteSearch: (state, obj)=>{
      let paramObj = obj.data,
          searchkey = obj.keyword,
          countryList =[],
          continentList=[];


      if(paramObj != null){

        let searchObj = obj.data.autoCompleteList;

        for(let i in searchObj){
          let search = {};

          //대륙, 도시, 나라 추출
          if(searchObj[i].extraInfoText !== '' && typeof searchObj[i].extraInfoText !== 'undefined'){

            let searchType = searchObj[i].extraInfoText.substring(0,1),
                  searchWord = '',
                  searchText = searchObj[i].extraInfoText.split("@")[1],
                  searchName = searchObj[i].extraInfoText.split("@")[2],
                  searchCode = searchObj[i].extraInfoText.split("@")[3],
                  keyIndex = searchText.indexOf(searchkey);

            //검색 키워드의 strong 태그 적용
            if(keyIndex >= 0){
              searchWord = searchText.replace(searchkey,`<strong>${searchkey}</strong>`);
            }else {
              searchWord = searchText
            }

            // 구분 => 1 : 도시 나라, 2: 대륙
            if(searchType === '1'){

              //도시 검색시 : "@삿포로, 일본@삿포로@68785349_68855704"
              //국가 검색시 : "@일본@일본@68785322_68858517"
              search.cityName = searchName;
              search.cityCode = searchCode;

              //search.search에 , 가 있음 [도시] ,가 없음 [국가]
              if(searchText.indexOf(",") > 0){

                let countryStr = searchText.split(",")[1];
                search.countryName = countryStr.replace(/\s*/g, "");
                search.searchWord = `[도시] ${searchWord}`;

              }else{
                search.countryName = searchText;
                search.searchWord = `[국가] ${searchWord}`;
              }
              search.searchType = searchType;
              countryList.push(search);
            }else{

              //대륙 검색시 : "@아시아@아시아"
              search.continentName = searchName;
              search.searchWord = searchWord;
              search.continentCode = searchCode;
              search.searchType = searchType;
              continentList.push(search);
            }

          }
        }
        let result = {countrySize : countryList.length , countryList : countryList,continentSize : continentList.length, continentList : continentList};
        state.autoCompleteSearchList = result;

      }else{
        let result = {countrySize : 0 , countryList : null,continentSize : 0, continentList : null};
        state.autoCompleteSearchList = result;
      }

      state.autoCompleteSearchList.searchKey = searchkey;
    },
  },
  getters: {

    searchParamInfo : state  =>{
      return state.searchParam;
    },
    majorCityList : state =>{
      return state.majorCityList;
    },
    majorCityListShow : (state, getters)  =>{
      return getters.majorCityList.length > 0 && getters.majorCityList !== null && typeof getters.majorCityList !== 'undefined' ? true : false;
    },
    departureCityList : state  =>{
      return state.departureCityList;
    },
    autoCompleteSearchList :  state =>{
      return state.autoCompleteSearchList;
    },
    autoCompleteShow :   (state, getters) =>{
      return getters.autoCompleteSearchList.countrySize == 0 && getters.autoCompleteSearchList.continentSize ==0 ? false : true;
    }
  },
  actions: {
    majorCitiesAjax : (obj, urlStr) =>{
      var url = `${_TOUR_ROOT_URL_HTTP_}${urlStr}`;
      return axios.get(url);
    },

    autoSearchKeyAjax(obj, paramObj){
      let commit = obj.commit;

      //console.log(paramObj.searchKey);

      var param = {params: {domain: 'tourPkg', keyword: encodeURI(paramObj.searchKey)}};
      var url = `${_TOUR_ROOT_URL_HTTP_}${paramObj.url}`;

      return axios.get(url, param);
      // axios.get(url, param)
      // .then(response =>  {
      //   //console.log(response);
      //
      //   if(response.status === 200 && response.statusText === 'OK'){
      //     commit("setAutoCompleteSearch", {data: response.data, keyword:paramObj.searchKey});
      //   }
      //
      // }).catch(error => console.log(error));
    }
  }
}
