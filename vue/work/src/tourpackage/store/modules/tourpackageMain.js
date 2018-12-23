import axios from 'axios';
import {dateUtil, stringUtil} from '../../.././common/utils.js'

var _TOUR_ROOT_URL_HTTP_ = "http://tour.m.11st.co.kr/MW/";
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

export const tourpackageMain = {
    namespaced: true,
    state : {
      currentSearchParam : [],
      hotDealPrdList: [],
      likeProductList:[],
      recommendPrdList : [],
      movieInfo : {},
      popularPrdList : [],
      mainSearchParam : {},
      isLoading : false,
    },

    mutations: {
      setLocalStorage: (state, obj) => {
        let count = 0;
        if(obj.length > 0 && obj !== null && typeof obj !== 'undefined'){

          for (let i in obj){
            count ++;
            obj[i]['seq'] = count;
          }
        }

        //최신순으로 정렬
        // obj.sort(function (a, b) {
        //
        //   let desc = b.seq ==='' ? 1 : a.seq == '' ? -1 : a.seq > b.seq ? -1 :  a.seq < b.seq ? 1 : 0 ; //내림차순
        //   let asc =  b.seq ==='' ? -1 : a.seq == '' ? 1 : a.seq < b.seq  ? -1 : a.seq > b.seq ? 1 : 0;// 오름차순
        //
        //   return asc;
        // });

        state.currentSearchParam = obj;
      },

      setApackageMain : (state, obj) => {

        //인기있는 쇼킹딜 상품
        if(obj.hotDealPrdList !==null && typeof  obj.hotDealPrdList !== 'undefined' && obj.hotDealPrdList.length > 0 ){

          let resultObj = [];
          for(let i in obj.hotDealPrdList){

            let prdList = obj.hotDealPrdList[i].tourProducts
            for(let j in prdList){

              if(dateUtil.isEmptyValue(prdList[j].scheduleDepartureDate)){
                prdList[j].departureDate = '';

              }else{
                let yyyy = prdList[j].scheduleDepartureDate.substr(0, 4),
                  mm = prdList[j].scheduleDepartureDate.substr(5, 2),
                  dd = prdList[j].scheduleDepartureDate.substr(8, 2);

                prdList[j].departureDate = yyyy+mm+dd;
              }

              prdList[j].prdDetailLink = `http://m.11st.co.kr/MW/Product/productBasicInfo.tmall?mallType=tour&prdNo=${prdList[j].prdNo}&pLoop=N`
            }

            resultObj.push(obj.hotDealPrdList[i])

          }

          state.hotDealPrdList = resultObj;
        }

        //찜해놓은 상품
        if(obj.likeProductList !== null && typeof  obj.likeProductList !== 'undefined' && obj.likeProductList.length > 0 ){

          for(let i in obj.likeProductList){

            // 도착나라 추출
            if(dateUtil.isEmptyValue(obj.likeProductList[i].arrvCountry)){
              obj.likeProductList[i].flagName ='';

            }else{

              // let lastIndex = obj.likeProductList[i].arrvCountry.indexOf('(');
              // obj.likeProductList[i].flagName = obj.likeProductList[i].arrvCountry.substring(0,lastIndex);

              // var pattern1 = /(\w+)/gi;
              // var cityStr = stringUtil.trim(obj.likeProductList[i].arrvCountry);
              // let flagName = cityStr.replace(pattern1, '');
              // if(cityStr.indexOf('(') >= 0 || cityStr.indexOf(')') >= 0){
              //   //특수문자 () 찾기
              //   var pattern2 = /[\)\(]/g; ///[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi
              //   flagName = flagName.replace(pattern2, '');
              // }

              //국가코드값 삭제 하기
              //var pattern1 = /\(([\D]+)\)/; //숫자를 제외한 나머지 문자
              var pattern1 = /\(([\w]+)\)/gi; //대소문 영문자
              var cityStr = stringUtil.trim(obj.likeProductList[i].arrvCountry);
              let flagName = cityStr.replace(pattern1, '');

              obj.likeProductList[i].flagName = flagName;
            }

            //출발일 추출
            if(dateUtil.isEmptyValue(obj.likeProductList[i].scheduleDepartureDate)){
              obj.likeProductList[i].departureDate = '';

            }else{
              let yyyy = obj.likeProductList[i].scheduleDepartureDate.substr(0, 4),
                mm = obj.likeProductList[i].scheduleDepartureDate.substr(5, 2),
                dd = obj.likeProductList[i].scheduleDepartureDate.substr(8, 2);

              obj.likeProductList[i].departureDate = yyyy+mm+dd;
            }


            obj.likeProductList[i].prdDetailLink = `http://m.11st.co.kr/MW/Product/productBasicInfo.tmall?mallType=tour&prdNo=${obj.likeProductList[i].prdNo}&pLoop=N`
          }
          state.likeProductList = obj.likeProductList;
        }

        // 이달의 추천 여행지
        if(obj.monthlyRecommendPlace !==null && typeof  obj.monthlyRecommendPlace !== 'undefined'){

          // 추천 여행 상품
          if(obj.monthlyRecommendPlace.productList.length > 0 && obj.monthlyRecommendPlace.productList !== null
            && typeof obj.monthlyRecommendPlace.productList !== 'undefined'){
            let list = obj.monthlyRecommendPlace.productList;

            for(let i in list){

              if(dateUtil.isEmptyValue(list[i].scheduleDepartureDate)){
                list[i].departureDate = '';

              }else{
                let yyyy = list[i].scheduleDepartureDate.substr(0, 4),
                  mm = list[i].scheduleDepartureDate.substr(5, 2),
                  dd = list[i].scheduleDepartureDate.substr(8, 2);

                list[i].departureDate = yyyy+mm+dd;
              }

              list[i].prdDetailLink = `http://m.11st.co.kr/MW/Product/productBasicInfo.tmall?mallType=tour&prdNo=${list[i].prdNo}&pLoop=N`

            }

            state.popularPrdList = obj.monthlyRecommendPlace.productList;
          }

          //추천 여행 장소
          if(obj.monthlyRecommendPlace.spotList.length > 0 && obj.monthlyRecommendPlace.spotList !== null
            && typeof obj.monthlyRecommendPlace.spotList !== 'undefined'){

            let list = obj.monthlyRecommendPlace.spotList,
              myRegExp = /(<\/br>|<br>|<br\/>|<br \/>|<\/ br> )/gi;

            for(let i in list){

              //br태그 변경
              let nameStr1 = list[i].name.replace("&lt;", "<"),
                  nameStr2 = nameStr1.replace("&gt;", ">");
                  //dspStr =  list[i].description.replace(myRegExp, '\r\n'),
                  //nameStr = nameStr2.replace(myRegExp, '\r\n'),

              //list[i].description = dspStr;
              //list[i].name = nameStr;

              list[i].name = nameStr2;
            }

            state.recommendPrdList =  obj.monthlyRecommendPlace.spotList;
          }

          //추천여행지 동영상정보
          if(obj.monthlyRecommendPlace.movie !== null && typeof  obj.monthlyRecommendPlace.movie !=='undefined'){
              let movieObj = {};

            if(dateUtil.isEmptyValue(obj.monthlyRecommendPlace.imageUrl)){
              obj.monthlyRecommendPlace.imageUrl = 'https://i.011st.com/ui_img/mw/tour/package/theme_default.jpg';
            }

            movieObj.backImageStyle =`background-image:url('${obj.monthlyRecommendPlace.imageUrl}');`;
            movieObj.backgroundImage = obj.monthlyRecommendPlace.imageUrl;
            movieObj.cityCode =  obj.monthlyRecommendPlace.cityCode;
            movieObj.name = obj.monthlyRecommendPlace.name;
            movieObj.movieImageUrl = obj.monthlyRecommendPlace.movie.imageUrl;
            movieObj.movieUrl = obj.monthlyRecommendPlace.movie.movieUrl;
            movieObj.supplier = obj.monthlyRecommendPlace.movie.supplier;

            state.movieInfo = movieObj;
          }
        }

      },

      setMainSearchParam : (state, obj) =>{
        if(typeof  obj.dptDispObjNm !== 'undefined' && obj.dptDispObjNm !== '') state.mainSearchParam.dptDispObjNm = obj.dptDispObjNm;
        if(typeof  obj.dptDispObjNo !== 'undefined' && obj.dptDispObjNo !== '') state.mainSearchParam.dptDispObjNo = obj.dptDispObjNo;
        if(typeof  obj.arrDispObjNm !== 'undefined' && obj.arrDispObjNm !== '') state.mainSearchParam.arrDispObjNm = obj.arrDispObjNm;
        if(typeof  obj.type !== 'undefined' && obj.type !== '') state.mainSearchParam.type = obj.type;
        if(typeof  obj.arrDispObjNo !== 'undefined')state.mainSearchParam.arrDispObjNo = obj.arrDispObjNo;

      },

      setLowprice : (state, obj) =>{
        if(typeof  obj.data.dprt_dt !== 'undefined'&& obj.data.dprt_dt !== '') state.mainSearchParam.departureDate = obj.data.dprt_dt.replace(/\//gi,'');
        if(typeof  obj.data.prd_prc !== 'undefined' && obj.data.prd_prc !== null) state.mainSearchParam.lowPrice = obj.data.prd_prc;
        state.mainSearchParam.arriveDate = '';

      },

      setLowpriceInit :(state)=>{
        state.mainSearchParam.departureDate ='';
        state.mainSearchParam.arriveDate ='';
        state.mainSearchParam.lowPrice ='';
      },

      setDptDate:(state, obj)=>{
        if(typeof  obj.arriveDate !== 'undefined') state.mainSearchParam.arriveDate = obj.arriveDate;
        if(typeof  obj.departureDate !== 'undefined') state.mainSearchParam.departureDate = obj.departureDate;
      },
      setIsLoading : (state, obj)=>{
        state.isLoading = obj;
      }
    },
    getters: {
      currentSearch : state => {
        let obj = state.currentSearchParam,
          resultObj = [];

        for(let i in obj){
          if(i<5){
            resultObj.push(obj[i]);
          }
        }
        return resultObj;
      },

      currentShow :  (state, getters) =>{
        return getters.currentSearch.length > 0 && getters.currentSearch !== null && typeof getters.currentSearch !== 'undefined' ? true : false;
      },

      likeProductList : state =>{

        let obj = state.likeProductList,
          resultObj = [];

        for(let i in obj){
          if(i<10){
            resultObj.push(obj[i]);
          }
        }
        return resultObj;

      },

      likePrdShow :  (state, getters) =>{
        return getters.likeProductList.length > 0 && getters.likeProductList !== null && typeof getters.likeProductList !== 'undefined' ? true : false;
      },

      recommendPrd : state => {

        // let obj = state.recommendPrdList,
        //   resultObj = [];
        //
        // for(let i in obj){
        //   if(i<5){
        //     resultObj.push(obj[i]);
        //   }
        // }
        // return resultObj;

        return state.recommendPrdList;

      },

      recommendPrdShow : (state, getters) =>{
        return getters.recommendPrd.length > 0 && getters.recommendPrd !== null && typeof getters.recommendPrd !== 'undefined' ? true : false;
      },

      movieObj : state =>{
        return state.movieInfo;
      },

      movieShow : (state, getters) =>{

        for(var key in getters.movieObj) {
          if(getters.movieObj.hasOwnProperty(key))
            return true;
        }
        return false;
      },

      popularPrd : state => {
        return state.popularPrdList;
      },

      popularShow : (state, getters) =>{
        return getters.popularPrd.length > 0 && getters.popularPrd !== null && typeof getters.popularPrd !== 'undefined' ? true : false;
      },

      hotDealPrdList : state =>{

        let obj = state.hotDealPrdList,
          resultObj = [];

        for (let i in obj){
          if(i<7){
            resultObj.push(obj[i]);
          }
        }

        return resultObj;
      },

      hotDealPrdShow : (state, getters) =>{
        return getters.hotDealPrdList.length > 0 && getters.hotDealPrdList !== null && typeof getters.hotDealPrdList !== 'undefined' ? true : false;
      },

      mainSearchParam : state  =>{
        return state.mainSearchParam;
      },

      isLoading: state =>{
        return state.isLoading;
      },

    },
    actions: {

      apackageMainAjax : (obj, urlStr) =>{

        let commit = obj.commit;

        var url = `${_TOUR_ROOT_URL_HTTP_}${urlStr}`;

        axios.get(url)
          .then(response => {
            //console.log(response);

            if(response.status === 200 && response.statusText === 'OK' && response.data !== '' && response.data !== null){
              commit('setApackageMain',response.data);
            }else{
              if ( document.referrer ) {
                // 뒤로가기
                history.back();
              }else {
                // 여행 메인 페이지
                location.href = 'http://tour.m.11st.co.kr/MW/Tour/main.tmall';
              }
            }

          }).catch( error => {
            console.log(error);
            alert('서버통신중 에러가 발생되었습니다.');
            if ( document.referrer ) {
              // 뒤로가기
              history.back();
            }else {
              // 여행 메인 페이지
              location.href = 'http://tour.m.11st.co.kr/MW/Tour/main.tmall';
            }
        });
      },

      cityLowpriceAjax({state, commit}, paramObj){

        var param = {params: paramObj.param};
        var url = `${_TOUR_ROOT_URL_HTTP_}${paramObj.url}`;

        return axios.get(url, param)
      }
    }
}
