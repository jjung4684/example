<template>
<div>
    <div class="quick_wrap" id="modalLodgeSearch" style='display:none;'>
            <!-- 퀵서치  -->
            <div class="quicksch">
                <div class="inner">
                    <div class="selbox openerWrap">
                        <a @click="openSearchModal('D')">
                            <span class="tit">출발</span>
                            <span class="place">{{quickSearchInfo.departureText}}</span>
                        </a>
                        <a class="fr" @click="openSearchModal('A')">
                            <span class="tit">도착</span>
                            <span class="place">{{quickSearchInfo.destination}}</span>
                        </a>
                    </div>

                    <div class="schedule calendarOpener">
                        <a @click="openCalendarModal">{{dateFormatStr(quickSearchInfo.departureDate)}}</a>
                    </div>

                    <div class="btnwrap">
                        <button type="button" class="bbtn" @click="goSearch">해외패키지 재검색</button>
                    </div>
                </div>
            </div>
            <!-- // 퀵서치  -->

        <button type="button" class="close_dimarea">닫기</button>
    </div>
    <majorcity-modal></majorcity-modal>
    <calendar-modal @interface="setDates"></calendar-modal>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import eventBus from '../../event-bus.js';
import majorcityModal from './majorCitySearchModal.vue'
import calendarModal from './calendarModal.vue'
import searchStorage from '../../js/modal/searchLocalStorage.js'
export default {
    computed : {
        ...mapGetters({
            quickSearchModalInfo : 'tourpackageSearchModal/searchParamInfo'
        })
    },
    components: {
        'majorcity-modal' : majorcityModal,
        'calendar-modal' : calendarModal
    },
    data(){
        return {
            quickSearchInfo : {
                departureText : "",
                departureCity : "",
                destination : "",
                departureDate : "",
                destinationCode : ""
            }
        }
    },
    created(){
       eventBus.$on('openQuickSearchModal',this.openQuickSearchModal);
       eventBus.$on('changeLocation', this.changeLocation)

    },
    mounted (){

        let param = this.$route.query;
        this.init(param);

        this.quickSearchModal = new skpui.modal({
            modalEl: '#modalLodgeSearch',
            type: 'slideInTop',
            closeEl: '.close_dimarea',
            onAfterOpen: function() {
            },
            onBeforeClose: function() {
            },
            onAfterClose: function() {
            }
        });

    },
    destroyed(){
        this.quickSearchModal.close();
    },
    methods : {
        init(params){

            var that = this;
            let quickSearchKeys = Object.keys(this.quickSearchInfo);
            quickSearchKeys.map(key => {
                that.quickSearchInfo[key] = (params.hasOwnProperty(key)) ? params[key] : "";
            });
        },
        changeLocation(obj){
            if(typeof obj == "object"){
                 if(obj.hasOwnProperty("dptDispObjNo") && obj.hasOwnProperty("dptDispObjNm")){
                    this.quickSearchInfo.departureText = obj.dptDispObjNm;
                    this.quickSearchInfo.departureCity = obj.dptDispObjNo;
                }else if(obj.hasOwnProperty("arrDispObjNo") && obj.hasOwnProperty("arrDispObjNm")){
                    this.quickSearchInfo.destination = obj.arrDispObjNm;
                    this.quickSearchInfo.destinationCode = obj.arrDispObjNo;
                }
            }

        },
        dateFormatStr(value){

            let that = this;

            if(typeof value == "undefined" || value == ""){
                return "출발일 선택";
            }

            let departureDates = value.split("~~");

            departureDates = departureDates.map(YYYYDDMM => that.$moment(YYYYDDMM));
            let isEqualMonth  = (departureDates.length == 2 && (departureDates[0].month() == departureDates[1].month()));
            departureDates = (isEqualMonth)? [departureDates[0].format('MM월 DD일'),departureDates[1].format('DD일')] : departureDates.map(dateMoment => dateMoment.format('MM월 DD일'));

            return departureDates.join(' ~ ') + " 출발";

        },
        openQuickSearchModal(e){
            this.quickSearchModal.open();
        },
        closeQuickSearchModal(){
            this.quickSearchModal.close();
        },
        openSearchModal(id){
            this.$modal.show('majorCitySearchModal');
            eventBus.$emit('toggleModal', id);
        },
        openCalendarModal(){

            let departureDate = this.quickSearchInfo.departureDate.split("~~");

            //TODO: 수정필요
            let payload = {
                dates :  this.quickSearchInfo.departureDate.split("~~"),
                deptCityCd : this.quickSearchInfo.departureCity,
                destination : this.quickSearchInfo.destination
            }

            this.$modal.show('calendarModal', payload);

        },
        goSearch(){

          let query = {
                defaultParam :  this.quickSearchInfo,
                optionParam : {},
                pageNum : 1,
                currentOrder : {
                    key : "POP_SCORE",
                    name : "인기순"
                }
            }

           this.$store.commit('tourpackageList/setSearchQuery',query);

           this.$store.commit('tourpackageList/setFilterTagList',[]);

           var fromfullPath = this.$router.currentRoute.fullPath;

           this.$router.push({ name: 'list', query:  this.$store.getters['tourpackageList/searchQueryString']  });

           var tofullPath = this.$router.currentRoute.fullPath;

           if(fromfullPath == tofullPath){ //not watch router
                this.$store.dispatch('tourpackageList/getApackageList');
           }

           let dates = this.quickSearchInfo.departureDate.split('~~');
           let startdate =  dates[0];
           let enddate = (dates.length>1) ? dates[1] : "";
           searchStorage.saveStorage('apapckageSearchParam',searchStorage.createObject(this.quickSearchInfo.destinationCode,this.quickSearchInfo.destination, startdate,enddate));

           this.closeQuickSearchModal();

        },
        setDates(data){
            let date = data.join("~~");
            this.quickSearchInfo.departureDate = date;
        }
    }

}
</script>

<style>

</style>
