import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import {dateUtil, stringUtil} from '../../.././common/utils.js'

export default {
  data(){
    return {
       isImageLoadedOnce : true
    }
  },
  computed : {
    ...mapGetters({movieObj:'tourpackageMain/movieObj',
                  recommendPrd:'tourpackageMain/recommendPrd',
                  popularPrd:'tourpackageMain/popularPrd',
                  popularShow: 'tourpackageMain/popularShow',
                  movieShow:'tourpackageMain/movieShow',
                  recommendPrdShow:'tourpackageMain/recommendPrdShow',
                  mainSearchParam:'tourpackageMain/mainSearchParam'
    })
  },
  methods :{
    imageLoaded(image) {

      if(this.isImageLoadedOnce){

        var width = $('.innr_pic').width();
        var height = (width/1.34);
        $('.innr_pic').height(height +'px');

        this.isImageLoadedOnce = false;

        var domObj = document.getElementById("recommendSwiper"),
        swiperHeightList = [],
        highHeightList = 0;

        //추천여행지의 컨텐츠들의 clientHeight 값 추출
        Array.from(domObj.querySelectorAll('li')).forEach((item, index) =>{
          swiperHeightList.push(item.clientHeight);
        });

        //추출된 추천여행지의 컨텐츠들의 clientHeight 제일 높은 값 추출
        highHeightList = Math.max.apply(null, swiperHeightList) + height;

        //추천여행지의 목록의 제일 높은 height를  컨텐츠의 height로 지정
        Array.from(domObj.querySelectorAll('li')).forEach(function (element){
          element.style.height = highHeightList + 'px';
        });


        eventCommon.recommendScroll();

      }


      
    },
    goList(){

      let paramObj = {},
        getterObj = this.movieObj,
        stateParam = this.mainSearchParam;

      if(!dateUtil.isEmptyValue(getterObj.name)){
        //도착도시
        paramObj.destination = stringUtil.trim(getterObj.name);
        paramObj.destinationCode = stringUtil.trim(getterObj.cityCode);

        //출발도시
        paramObj.departureText = stringUtil.trim(stateParam.dptDispObjNm);
        paramObj.departureCity = stringUtil.trim(stateParam.dptDispObjNo);

        //출발일, 도착일
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate()+1);

        let t_dd = tomorrow.getDate(),
          t_mm = tomorrow.getMonth()+1, //January is 0!
          t_yyyy = tomorrow.getFullYear();

        let future = new Date();
        future.setDate(future.getDate() + 30);

        let f_dd = future.getDate(),
          f_mm = future.getMonth()+1,
          f_yyyy = future.getFullYear();

        if(t_dd<10) t_dd='0'+t_dd;
        if(t_mm<10) t_mm='0'+t_mm;
        if(f_dd<10) f_dd='0'+f_dd;
        if(f_mm<10) f_mm='0'+f_mm;

        let departureDate = `${t_yyyy}${t_mm}${t_dd}`,
          arriveDate = `${f_yyyy}${f_mm}${f_dd}`;

        paramObj.departureDate = stringUtil.trim(`${departureDate}~~${arriveDate}`);

        //console.log(paramObj);

        paramObj.mallType = this.$route.query.mallType;
        paramObj.dispCtgrNo = this.$route.query.dispCtgrNo;

        this.$router.push({ name: 'list', query: paramObj});
      }

    }
  },
  filters : {
    moneyComma : value => {
      return stringUtil.moneyComma(value);
    },
    dateComma: str =>{
      if (str === '' || str === null) return '';
      let y = str.substr(0, 4),
        m = str.substr(4, 2),
        d = str.substr(6, 2);
      return `${m}.${d}.`;
    },
  },
  updated() {

    // 모든 화면이 렌더링된 후 실행합니다.
    this.$nextTick(function () {

      let moveObj =  this.movieShow,
        rcmdPrd = this.recommendPrdShow;

      if(moveObj){
        eventCommon.moveEvent();
      }
    
    })
  }

};
