import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import * as Utils from '../../.././common/utils.js'

export default {
  data(){
    return{
      focus_id : "",
      isApp : Utils.isApp()
    }
  },
  computed : {
    ...mapGetters({hotDealPrdList:'tourpackageMain/hotDealPrdList',
                    hotDealPrdShow:'tourpackageMain/hotDealPrdShow'
    })
  },
  methods :{
    // moveTeb(id){
    //   this.focus_id= id;
    //   var i= document.getElementById(id);
    //   i.scrollIntoView();
    //
    // },
    goList(extraText, name){

      let paramObj = {},
        stateParam = this.$store.getters['tourpackageMain/mainSearchParam'];

      if(!Utils.dateUtil.isEmptyValue(extraText) && !Utils.dateUtil.isEmptyValue(name)){

        //도착도시
        paramObj.destination = Utils.stringUtil.trim(name);
        paramObj.destinationCode = Utils.stringUtil.trim(extraText);

        //출발도시
        paramObj.departureText = Utils.stringUtil.trim(stateParam.dptDispObjNm);
        paramObj.departureCity = Utils.stringUtil.trim(stateParam.dptDispObjNo);

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

        let departureDate = `${t_yyyy}${t_mm}${t_dd}`,
          arriveDate = `${f_yyyy}${f_mm}${f_dd}`;

        paramObj.departureDate = Utils.stringUtil.trim(`${departureDate}~~${arriveDate}`);
        paramObj.mallType = this.$route.query.mallType;
        paramObj.dispCtgrNo = this.$route.query.dispCtgrNo;

        //console.log(paramObj);
        this.$router.push({ name: 'list', query: paramObj});

      }
    }
  },
  filters : {
    moneyComma : value => {
      return Utils.stringUtil.moneyComma(value);
    },
    dateComma: str =>{
      if (str === '' || str === null) return '';
      let y = str.substr(0, 4),
        m = str.substr(4, 2),
        d = str.substr(6, 2);
      //return `${y}.${m}.${d}`;
      return `${m}.${d}.`;
    },
  },
  updated() {
    let obj = this.hotDealPrdShow;

    if(obj){

      // 모든 화면이 렌더링된 후 실행합니다.
      this.$nextTick(function () {

        //딜 스와이프& 탭 기능
        eventCommon.hotDealScroll()

      })
    }
  }
}
