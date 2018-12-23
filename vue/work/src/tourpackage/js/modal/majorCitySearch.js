import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import eventBus from '../../event-bus.js'
import departure_search from '../.././components/modal/departureSearchModal.vue'
import {dateUtil,stringUtil} from '../../.././common/utils.js'

export default{
  scrollEven : null,

  components: {
    'departure-search':departure_search
  },

  data(){
    return{
      majorcityShow : true,
      autoSearchShow : false,
      departureStr : '',
      departureCode: '',
      lodgeSearchCss : 'lodge_search_input focusout',
      searcKeyword:'',
      modalType :''
    }
  },
  computed:{
    ...mapGetters({searchParamInfo:'tourpackageSearchModal/searchParamInfo',
                    majorCityList:'tourpackageSearchModal/majorCityList',
                    majorCityListShow:'tourpackageSearchModal/majorCityListShow',
                    autoCompleteSearchList : 'tourpackageSearchModal/autoCompleteSearchList',
                    departureCityList : 'tourpackageSearchModal/departureCityList',
                    autoCompleteShow : 'tourpackageSearchModal/autoCompleteShow'
    })
  },
  methods :{

    ...mapMutations({majorCityshow:'tourpackageSearchModal/majorCityshow',
                      setSearchParam:'tourpackageSearchModal/setSearchParam',
                      setMajorCities:'tourpackageSearchModal/setMajorCities',
                      setAutoCompleteSearch : 'tourpackageSearchModal/setAutoCompleteSearch'
    }),

    departureModalShow(id){
      this.$modal.show(id);
    },

    init(){
      var that = this;
      //주요도시 정보 조회
      this.$store.dispatch('tourpackageSearchModal/majorCitiesAjax','Tour/apackage/majorCities').then(response => {
        //console.log(response);

        if(response.status === 200 && response.statusText === 'OK' && response.data !== '' && response.data !== null){
          that.setMajorCities(response.data);

          if(that.modalType === 'D'){
            that.departureModalShow('departureModal');
          }
        }
      });

      // //기본 셋팅
      let dptDispObjNo =  this.searchParamInfo.dptDispObjNo,
          dptDisNm = this.searchParamInfo.dptDispObjNm;

      if((typeof  dptDispObjNo !== 'undefined' && dptDispObjNo !=='') && (typeof  dptDisNm !== 'undefined' && dptDisNm !=='')){
        this.departureStr = dptDisNm;
        this.departureCode = dptDispObjNo;
      }else{
        this.departureStr ='인천/김포';
        this.departureCode = '68785302_68789698@68785302_68789697@68785302_68789705';
      }

    },

    selectArriveCity(extraText, dispObjNm, type){

      //도착 도시 선택시 모달의 파라미터 set, eventBus로 하위 컨포넌트로 값 set
      let obj = {arrDispObjNo : extraText, arrDispObjNm : dispObjNm, type: type, arriveDate: "", departureDate:""};

      // 대륙정보시 undefined로 들어온다.
      if(type =='2'){
        obj.arrDispObjNo = "";
      }

      this.setSearchParam(obj);
      eventBus.$emit('changeLocation', obj);
      this.initValue();
      this.$modal.hide('majorCitySearchModal');
    },

    majorCityChange(obj){

      //출발지 eventBus로 값 받아오기
      this.departureStr =obj.dptDispObjNm;
      this.departureCode = obj.dptDispObjNo;

      eventBus.$emit('changeLocation', obj);
    },

    inputCss(css, type){

      this.lodgeSearchCss = css;

      if(type == 'C'){
        if(this.searcKeyword === '') this.searcKeyword = '';
      }else if( type =='D'){

        this.searcKeyword = '';
        this.initValue();
      }
    },

    hideModal(id){
      this.lodgeSearchCss = 'lodge_search_input focusout';
      this.$modal.hide(id);
      this.initValue();
    },

    initValue(){
      this.majorcityShow = true;
      this.autoSearchShow = false;
      this.searcKeyword = '';

      this.search(this.searcKeyword);
    },

    search(val){

      var keyword = val;
      var that = this;

      if (keyword.length) {

        //자동완성 AJAX
        this.$store.dispatch('tourpackageSearchModal/autoSearchKeyAjax',
          {url:'Tour/getACK.tmall',searchKey:keyword}).then(response =>  {
          //console.log(response);

          if(response.status === 200 && response.statusText === 'OK'){
            that.setAutoCompleteSearch({data: response.data, keyword:keyword});
            that.autoSearchShow = true;
            that.majorcityShow = false;

            setTimeout(() => {
              that.scrollEvent.refresh();
            }, 250);
          }
        });

      } else {
        this.setAutoCompleteSearch({data: null, keyword:keyword});
      }
    },

    searchTyping(e){
      //console.log(e.target.value)
      //document.getElementById("searchKeyValue").value = e.target.value;
      let searchKey = e.target.value;
      this.searcKeyword = e.target.value;

      this.search(searchKey);
    },

    beforeOpen(){
      this.init();
    },
    modalScroll(){
      var iScrollOption = {
        scrollbars: true,
        fadeScrollbars: true,
        mouseWheel: true,
        tab: true
      };

      var that = this;

      setTimeout(() => {
        that.scrollEvent =  new IScroll('.lodge_kwd_wrap', iScrollOption);
      }, 250);

    },

    toggleModal(type){
      this.modalType = type;
    }
  },
  created(){
    eventBus.$on('changeDeparture', this.majorCityChange);
    eventBus.$on('toggleModal', this.toggleModal);

  }
}
