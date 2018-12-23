import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import eventBus from '../../event-bus.js'
import {dateUtil,stringUtil} from '../../.././common/utils.js'


export default{

  computed : {
    ...mapGetters({currentSearch:'tourpackageMain/currentSearch',
                    currentShow:'tourpackageMain/currentShow',
                    likeProductList:'tourpackageMain/likeProductList',
                    likePrdShow:'tourpackageMain/likePrdShow'})
  },

  methods:{
    ... mapMutations({setLocalStorage:'tourpackageMain/setLocalStorage',
                    setMainSearchParam:'tourpackageMain/setMainSearchParam'
    }),

    storageInit(){
      let storageObj = localStorage.getItem("apapckageSearchParam"),
        searchObj = JSON.parse(storageObj),
        newSearchStorage = [];

      if(searchObj !== null && typeof searchObj !== 'undefined' && searchObj.length >0){

        //현재 날짜 기준으로 출발일이 지난 storage는 삭제
        for(let i in searchObj){

          if(typeof  searchObj[i].startDate !== 'undefined' && searchObj[i].startDate !== ''){

            let stDate = searchObj[i].startDate,
              date = new Date(),
              today = new Date(date.getFullYear(),date.getMonth(),date.getDate()),
              startYear = stDate.substring(0,4),
              startMonth = stDate.substring(4,6),
              startDay = stDate.substring(6,8),
              searchStartDate = new Date(startYear, parseInt(startMonth)-1, startDay);

            if(today <= searchStartDate)
              newSearchStorage.push(searchObj[i]);
          }else{
            newSearchStorage.push(searchObj[i]);
          }
        }


        //최근검색한 도시-> 출발일-> 도착일 순으로 중복체크
        let newSearchStorage_1 = this.uniqueArray(newSearchStorage);

        //Storage에 현재 날짜 기준으로 출발일이 지난 검색어는 삭제한것만 Set
        localStorage.removeItem("apapckageSearchParam");
        localStorage.setItem("apapckageSearchParam", JSON.stringify(newSearchStorage));

        //중복체트한 최근검색어만 store에 set
        this.setLocalStorage(newSearchStorage_1);
      }
    },

    uniqueArray(arr) {

      var chk = [];

      //오름차순
      //for (var i = 0; i < arr.length; i++) {

      //내림차순
      for (var i = arr.length-1; i >= 0; i--) {


        if (chk.length == 0) {
          chk.push(arr[i]);

        }else{

          var flg = true;
          for (var j = 0; j < chk.length; j++) {
            //코드값 있을경우 확인
            if(arr[i].code !== ""){
              // 코드값으로 비교
              if ((chk[j].code == arr[i].code) && (chk[j].startDate == arr[i].startDate) && (chk[j].endDate== arr[i].endDate)) {
                  flg = false;
                  break;
              }
            }else{
              // 코드값이 없을 경우
                //이름으로 비교
              if ((chk[j].city == arr[i].city) && (chk[j].startDate == arr[i].startDate) && (chk[j].endDate== arr[i].endDate)) {
                flg = false;
                break;
              }
            }
          }

          if (flg) {
            chk.push(arr[i]);
          }
        }
      }
      return chk;
    },

    deleteStorage(code, name, date){

      let storageObj = localStorage.getItem("apapckageSearchParam"),
        parseObj = JSON.parse(storageObj),
        newSearchStorage = [];

      for (let i in parseObj){
        //코드값이 있는 도시나 나라
        if(code !== ''){
          if(parseObj[i].code == code && parseObj[i].startDate == date){
            parseObj.splice(i,1);
            //return true;
          }
        }else{
          //추천도시나 대륙은 코드값이 없다.
          if(parseObj[i].city == name && parseObj[i].startDate == date){
            parseObj.splice(i,1);
            //return true;
          }
        }
      }

      if(parseObj.length >0){
        newSearchStorage = parseObj;
        localStorage.removeItem("apapckageSearchParam");
        localStorage.setItem("apapckageSearchParam", JSON.stringify(newSearchStorage));
        this.storageInit();
      }else{
        localStorage.removeItem("apapckageSearchParam");
        this.setLocalStorage(newSearchStorage);
      }
    },

    setArrive(obj){

      // let paramObj = {arrDispObjNo : obj.code, arrDispObjNm : obj.city, departureDate: obj.startDate, arriveDate : obj.endDate};
      // eventBus.$emit('changeLocation', paramObj);

      let stateObj = {},
        paramObj = {},
        getterObj ={arrDispObjNo : obj.code, arrDispObjNm : obj.city, departureDate: obj.startDate, arriveDate : obj.endDate},
        departureCity = this.$store.getters['tourpackageMain/mainSearchParam'].dptDispObjNm,
        departureCode = this.$store.getters['tourpackageMain/mainSearchParam'].dptDispObjNo;

      //도착도시 체크
      if(getterObj.arrDispObjNm === '' || typeof getterObj.arrDispObjNm === 'undefined'){
        stateObj.city = "";
        stateObj.code = "";
        alert("도착 도시를 선택해주세요");
        return;
      }else{
        stateObj.code = stringUtil.trim(getterObj.arrDispObjNo);
        stateObj.city = stringUtil.trim(getterObj.arrDispObjNm);
        paramObj.destination = stringUtil.trim(getterObj.arrDispObjNm);
        paramObj.destinationCode = stringUtil.trim(getterObj.arrDispObjNo);
      }

      //출발도시 체크
      if(departureCode ===''|| typeof departureCode === 'undefined' || departureCity ==='' || typeof departureCity === 'undefined'){
        alert("출발 도시를 선택해주세요");
        return;
      }else{
        paramObj.departureText = stringUtil.trim(departureCity);
        paramObj.departureCity = stringUtil.trim(departureCode);
      }

      //출발일 체크
      if(getterObj.departureDate ==='' || typeof getterObj.departureDate === 'undefined'){
        stateObj.startDate = '';
        alert("출발일을 선택해주세요");
        return;

      }else{
        stateObj.startDate = stringUtil.trim(getterObj.departureDate);
        paramObj.departureDate = stringUtil.trim(getterObj.departureDate);
      }

      //도착일 체크
      if(getterObj.arriveDate ==='' || typeof getterObj.arriveDate === 'undefined'){
        stateObj.endDate ='';
      }else{
        stateObj.endDate = stringUtil.trim(getterObj.arriveDate);
        paramObj.departureDate = stringUtil.trim(`${getterObj.departureDate}~~${getterObj.arriveDate}`);
      }

      this.storagePush(stateObj);

      paramObj.mallType = this.$route.query.mallType;
      paramObj.dispCtgrNo = this.$route.query.dispCtgrNo;
      this.$router.push({ name: 'list', query: paramObj});

    },
    storagePush(paramObj){

      let resultObj = [],
        storageObj = localStorage.getItem("apapckageSearchParam"),
        parseObj = JSON.parse(storageObj)

      if(storageObj != null){
        resultObj = parseObj;
        resultObj.push(paramObj);
        localStorage.removeItem("apapckageSearchParam");
      }else{
        resultObj.push(paramObj);
      }

      localStorage.setItem("apapckageSearchParam", JSON.stringify(resultObj));
      this.setLocalStorage(resultObj);
    },
  },

  filters :{
    dateComma: str =>{
      if (str === '' || str === null) return '';
      let y = str.substr(0, 4),
        m = str.substr(4, 2),
        d = str.substr(6, 2);
      //return `${y}.${m}.${d}`;
      return `${m}.${d}`;
    },

    moneyComma : value => {
      return stringUtil.moneyComma(value);
    },

    timeComma : str =>{
      return stringUtil.timeComma(str);
    }
  },

  created(){
    this.storageInit();
  },

  mounted(){
    let objLength =  this.currentSearch.length;
    if(objLength > 0) eventCommon.currentSearchScroll();
  },

  updated() {
    let objLength =  this.likeProductList.length;
    if(objLength > 0){

      // 모든 화면이 렌더링된 후 실행합니다.
      this.$nextTick(function () {
        eventCommon.likePrdScroll();
      })
    }
  }
};
