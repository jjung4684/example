import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import eventBus from '../../event-bus.js'

export default{
  scrollEven : null,

  data(){
    return{
      selectCity : ''
    }
  },
  computed:{
    ...mapGetters({searchParamInfo: 'tourpackageSearchModal/searchParamInfo',
                    departureCityList : 'tourpackageSearchModal/departureCityList'
    })
  },
  methods :{
    ...mapMutations({setSearchParam:'tourpackageSearchModal/setSearchParam'
    }),

    desModalScroll(){
      var iScrollOption = {
        scrollbars: true,
        fadeScrollbars: true,
        mouseWheel: true,
        tab: true
      };
      this.scrollEvent =  new IScroll('.keylst', iScrollOption);

    },

    selectDepartureCity(dptDispObjNo, dptDispObjNm){

      let obj = {dptDispObjNo : dptDispObjNo, dptDispObjNm : dptDispObjNm};
      this.setSearchParam(obj);
      this.selectCity = dptDispObjNo;
      eventBus.$emit('changeDeparture', obj);
      this.$modal.hide('departureModal');
    },

    init(){
      let searchParam = this.searchParamInfo;
      this.selectCity = searchParam.dptDispObjNo;

    },

    beforeOpen(){
      this.init();
    }
  }

}
