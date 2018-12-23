import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import eventBus from '../../event-bus.js'
import calendarModal from '../.././components/modal/calendarModal.vue'
import {dateUtil,stringUtil} from '../../.././common/utils.js'


export default{
  components: {
    'calendar-modal' : calendarModal
  },
  data(){
    return {
      departureStr : '',
      departureCode: '',
      arriveStr : '',
      arriveCode :'',
      departureDate : '',
      arriveDate :'',
      lowPrice:''
    }
  },
  computed:{
    ...mapGetters({mainSearchParam:'tourpackageMain/mainSearchParam',
                    isLoading :'tourpackageMain/isLoading'})
  },
  methods :{
    ...mapMutations({setMainSearchParam:'tourpackageMain/setMainSearchParam',
                    setLocalStorage:'tourpackageMain/setLocalStorage',
                    modalParam:'tourpackageSearchModal/setSearchParam',
                    setLowprice : 'tourpackageMain/setLowprice',
                    setDptDate : 'tourpackageMain/setDptDate',
                    setLowpriceInit :'tourpackageMain/setLowpriceInit',
                    setIsLoading :'tourpackageMain/setIsLoading'
    }),

    openModal(id){
      let getterObj = this.mainSearchParam;
      this.modalParam(getterObj);
      this.$modal.show('majorCitySearchModal');
      eventBus.$emit('toggleModal', id);
    },

    changeLocation(obj){

      if(typeof  obj.arrDispObjNm !== 'undefined' && obj.arrDispObjNm !== '') this.arriveStr =obj.arrDispObjNm;
      if(typeof  obj.dptDispObjNm !== 'undefined' && obj.dptDispObjNm !== '') this.departureStr =obj.dptDispObjNm;
      if(typeof  obj.dptDispObjNo !== 'undefined') this.departureCode =obj.dptDispObjNo;
      if(typeof  obj.arrDispObjNo !== 'undefined') this.arriveCode =obj.arrDispObjNo;


      this.setMainSearchParam(obj);
      //this.modalParam(obj);

      //console.log(obj);

      //최저가 API 호출
      if(dateUtil.isEmptyValue(this.departureDate) || !dateUtil.isEmptyValue(this.lowPrice)){
        this.getLowPrice(this.mainSearchParam);
      }
    },

    getLowPrice(obj){
      var that = this;

      // var departureCode = "",
      //   arriveCode = "",
      //   departureCodes= "";

      // if(typeof obj.dptDispObjNo !== 'undefined'){
      //   departureCodes = obj.dptDispObjNo.split('@');
      // }

      // departureCode =  departureCodes[departureCodes.length-1].split('_')[1];

      // if(typeof obj.arrDispObjNo !== 'undefined' &&  obj.arrDispObjNo !== ''){
      //   arriveCode = obj.arrDispObjNo.split('_')[1];
      // }

      // 출발도시는 서울/부산 일때만 최저가 노출 68785302_68789705 : 서울, 68785302_68789700 : 부산
      // 도착도시 있는 경우
      if(typeof obj.dptDispObjNo !== 'undefined' &&  typeof obj.arrDispObjNo !== 'undefined' &&  obj.arrDispObjNo !== ''){
        this.$store.dispatch('tourpackageMain/cityLowpriceAjax',
          {url:'Tour/apackage/lowestDptDate',param:{deptCityCd : obj.dptDispObjNo,destination : encodeURI(stringUtil.trim(obj.arrDispObjNm))}}).then(response => {
                //console.log(response);
                if(response.data !== ''){
                  if(response.data.dprt_dt !== '' && response.data.prd_prc !== null){

                    that.setLowprice({data: response.data});
                    //commit("setLowprice", {data: response.data});
                    that.changeLowPrice(that.mainSearchParam.departureDate, that.mainSearchParam.lowPrice);

                }
                }else{
                  that.changeLowPrice('','');
                  that.setLowpriceInit();
                  //commit("setLowpriceInit");
                }

          });

          //비동기로 최저가 API 호출하여 setTimeout, setInterval 값 셋팅
          //this.startAlert();

        ////setTimeout인 경우
        // var that = this;
        // setTimeout(() => {
        //   that.changeLowPrice(that.mainSearchParam.departureDate, that.mainSearchParam.lowPrice);
        // }, 300);

      }else{
        this.changeLowPrice('','');
        this.setLowpriceInit();
      }

    },

    startAlert() {

      if(!this.isLoading){
        var that = this;
        var count = 0;

        var playTry = setInterval(() => {
          count++;
          //console.log('retry =>',count);
          that.changeLowPrice(that.mainSearchParam.departureDate, that.mainSearchParam.lowPrice);

          if(count == 5){
            clearInterval(playTry);
            that.setIsLoading(false);
          }

        }, 300);
      }
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

    goList(){

      let stateObj = {},
          paramObj = {},
          getterObj = this.mainSearchParam,
          arriveDate ='';

      //도착도시 체크
      if(getterObj.arrDispObjNm === '' || typeof getterObj.arrDispObjNm === 'undefined' || getterObj.arrDispObjNm === '도착지'){
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
      if(getterObj.dptDispObjNo ===''|| typeof getterObj.dptDispObjNo === 'undefined' || getterObj.dptDispObjNm ==='' || typeof getterObj.dptDispObjNm  === 'undefined'){
        alert("출발 도시를 선택해주세요");
        return;
      }else{
        paramObj.departureText = stringUtil.trim(getterObj.dptDispObjNm);
        paramObj.departureCity = stringUtil.trim(getterObj.dptDispObjNo);
      }

      //출발일 체크
      if(getterObj.departureDate ==='' || typeof getterObj.departureDate === 'undefined'){

        //출발일, 도착일
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate()+30);

        let t_dd = tomorrow.getDate(),
          t_mm = tomorrow.getMonth()+1, //January is 0!
          t_yyyy = tomorrow.getFullYear();

        let future = new Date();
        future.setDate(future.getDate() + 60);

        let f_dd = future.getDate(),
          f_mm = future.getMonth()+1,
          f_yyyy = future.getFullYear();

        if(t_dd<10) t_dd='0'+t_dd;
        if(t_mm<10) t_mm='0'+t_mm;
        if(f_dd<10) f_dd='0'+f_dd;
        if(f_mm<10) f_mm='0'+f_mm;

        let departureDate = `${t_yyyy}${t_mm}${t_dd}`;
        arriveDate = `${f_yyyy}${f_mm}${f_dd}`;

        stateObj.startDate = departureDate;
        stateObj.endDate = arriveDate;
        paramObj.departureDate = stringUtil.trim(`${departureDate}~~${arriveDate}`);

      }else{
        stateObj.startDate = stringUtil.trim(getterObj.departureDate);

        //도착일 체크
        if(getterObj.arriveDate ==='' || typeof getterObj.arriveDate === 'undefined'){
          stateObj.endDate ='';
        }else{
          stateObj.endDate = stringUtil.trim(getterObj.arriveDate);
          arriveDate = `~~${getterObj.arriveDate}`;
        }
        paramObj.departureDate = stringUtil.trim(`${getterObj.departureDate}${arriveDate}`);
      }


      this.storagePush(stateObj);

      paramObj.mallType = this.$route.query.mallType;
      paramObj.dispCtgrNo = this.$route.query.dispCtgrNo;

      //console.log(paramObj);
      this.$router.push({ name: 'list', query: paramObj});

    },

    openCalendarModal(){

      let getterObj = this.mainSearchParam,
          dateParam = [];

      if(typeof getterObj.departureDate !== 'undefined' && getterObj.departureDate !== ""){
        dateParam.push(stringUtil.trim(getterObj.departureDate));
      }

      if(typeof getterObj.arriveDate !== 'undefined' && getterObj.arriveDate !== ""){
        dateParam.push(stringUtil.trim(getterObj.arriveDate));
      }

      let payload = {
        dates : dateParam,
        deptCityCd : stringUtil.trim(getterObj.dptDispObjNo),
        destination : stringUtil.trim(getterObj.arrDispObjNm)
      }

      /*
        TODO: 도착도시의 최저가를 이미 조회가 된 상황에서 캘린더를 조회했을때 달력의 최저가를 초기화
      */
      // if(this.lowPrice !== ''){
      //   payload.dates = [];
      // }

      this.$modal.show('calendarModal', payload);
    },

    setDates(data){

      if(data.length > 0){

        let param = {data :{dprt_dt: '', prd_prc : ''}};
        this.setLowprice(param);
        this.lowPrice = '';
        this.departureDate = '';

        this.departureDate=data[0];
        this.arriveDate = data[1];

        this.setDptDate({departureDate: data[0], arriveDate: data[1]});
        this.modalParam({departureDate: data[0], arriveDate: data[1]});
      }
    },

    changeLowPrice(value1, value2){

      this.departureDate = value1;
      this.lowPrice =  value2;
      this.arriveDate ='';
    },

    init() {

      let stateParam = this.mainSearchParam;

      if (typeof  stateParam.dptDispObjNo !== 'undefined' && stateParam.dptDispObjNo !== ''
        && typeof  stateParam.dptDispObjNm !== 'undefined' && stateParam.dptDispObjNm !== '') {

        this.departureStr = stringUtil.trim(stateParam.dptDispObjNm);
        this.departureCode = stringUtil.trim(stateParam.dptDispObjNo);

      }else{
        this.departureStr = '인천/김포';
        this.departureCode = '68785302_68789698@68785302_68789697@68785302_68789705';
      }

      if(typeof stateParam.arrDispObjNm !== 'undefined' && stateParam.arrDispObjNm !== ''){

        this.arriveStr = stringUtil.trim(stateParam.arrDispObjNm);
        this.arriveCode = stringUtil.trim(stateParam.arrDispObjNo);

      }else{
        this.arriveStr = '도착지';
        this.arriveCode = ''
      }

      if(typeof  stateParam.departureDate !== 'undefined' && stateParam.departureDate !== '') this.departureDate = stateParam.departureDate;
      if(typeof  stateParam.arriveDate !== 'undefined' && stateParam.arriveDate !== '') this.arriveDate = stateParam.arriveDate;
      if(typeof  stateParam.lowPrice !== 'undefined' &&  stateParam.lowPrice !== '') this.lowPrice =  stateParam.lowPrice;

      let paramObj ={dptDispObjNo: this.departureCode,
                    dptDispObjNm: this.departureStr,
                    arrDispObjNm: this.arriveStr ,
                    arrDispObjNo: this.arriveCode
                    //departureDate : this.departureDate,
                    //arriveDate : this.arriveDate,
                    //lowPrice : this.lowPrice
            };

      this.setMainSearchParam(paramObj);
    }
  },
  filters : {
    dateFormat: (str, obj) =>{

      if (str === '' || str === null) return '';
      let y = str.substr(0, 4),
        m = str.substr(4, 2),
        d = str.substr(6, 2);

      if(obj.type == 'date'){
        return `${m}월 ${d}일`;

      }else if(obj.type == 'day'){

        let d_y = obj.deptdate.substr(0, 4),
          d_m = obj.deptdate.substr(4, 2),
          d_d = obj.deptdate.substr(6, 2);

        if(m === d_m){
          return `${d}일`;
        }else{
          return `${m}월 ${d}일`;
        }

      }else{
        return `${y}년 ${m}월 ${d}일`;
      }

    },

    moneyComma : value => {
      return stringUtil.moneyComma(value);
    },
  },

  created(){
    this.init();
    eventBus.$on('changeLocation', this.changeLocation);
  }
}
