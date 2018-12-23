<template>
    <div class="rentcar_quick_wrap" id='modalLodgeSearch' style='display:none;'>
            <div class="rentcar_quick">
                <!-- 렌터카 퀵서치  -->
                <div class="rentcar_quick">
                    <div class="inner">
                        <div class="schedule">
                            <div class="openerWrap">
                                <a class="check_date">
                                    <span class="tit">대여일</span>
                                    <span class="date calendarOpener">{{quickSearchModalInfo.checkin.month}}.{{quickSearchModalInfo.checkin.date}}</span>
                                    <span class="time">({{quickSearchModalInfo.checkin.day}}) <em>{{quickSearchModalInfo.checkin.hour}}:{{quickSearchModalInfo.checkin.minute}}</em></span>
                                </a>
                            </div>
                            <div class="openerWrap">
                                <a class="fr check_date">
                                    <span class="tit">반납일</span>
                                    <span class="date calendarOpener">{{quickSearchModalInfo.checkout.month}}.{{quickSearchModalInfo.checkout.date}}</span>
                                    <span class="time">({{quickSearchModalInfo.checkout.day}}) <em>{{quickSearchModalInfo.checkout.hour}}:{{quickSearchModalInfo.checkout.minute}}</em></span>
                                </a>
                            </div>
                        </div>

                        <div class="insur">
                            <dl>
                                <dt><strong class="subtit">보험</strong><a @click="openInsurModal" class="help">도움말</a>
                                    <!-- layer -->
                                    <div class="lyw" id="lyr_1">
                                        <!-- <div class="lym">
                                            <h2>11번가 해외통합배송상품</h2>
                                            <div class="lyc">
                                                내용
                                            </div>
                                        </div>
                                        <button type="button" class="cls">닫기</button> -->
                                    </div>
                                    <!-- //layer -->
                                </dt>
                                <dd>
                                    <span class="radio_box" v-for="(name,key) in insurTypes" :key="key">
                                     <input type="radio" :id="key" name="nsurType" :value="key" v-model="pickedInsurType" cecked>
                                     <label :for="key">{{name}}</label>
                                    </span>
                                </dd>
                            </dl>
                        </div>

                        <div class="cartype">
                            <dl>
                                <dt><strong class="subtit">차종 <em>(중복선택가능)</em></strong></dt>
                                <dd>
                                    <span class="check_box" v-for="(name,key) in carTypes" :key="key">
                                        <input type="checkbox" :name="key" :id="key" :value="key" v-model="checkedCarType">
                                        <label :for="key">{{name}}</label>
                                    </span>
                                </dd>
                            </dl>
                        </div>

                        <div class="btnwrap">
                            <button type="button" class="bbtn" @click="goList">렌터카 재검색</button>
                        </div>
                    </div>
                </div>
                <!-- // 렌터카 퀵서치  -->

            </div>
            <button type="button" class="close_dimarea">닫기</button>
        </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import eventBus from '../../event-bus.js';
import * as Utils from '../../utils/tour-list.js';

export default {
    created(){
       this.init();
       eventBus.$on('changeModalQuickSearchInfo',this.changeModalQuickSearchInfo); 
       eventBus.$on('openQuickSearchModal',this.openQuickSearchModal); 
    },
    data(){
        return {
            quickSearchModalInfo : {},
            carTypes : Utils.carTypeCodes,
            insurTypes : Utils.insurTypeCodes,
            checkedCarType : [],
            pickedInsurType : ""
        }
    },
    computed : {
         ...mapGetters({
             quickSearchInfo : 'quickSearchInfo' ,
             isShowModal : 'isShowModal'
         })
    },
    mounted (){

       this.listingFixedQuickModal = new skpui.modal({
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

        var options = {
           dimmed : false
        }
        
        try{
           this.InsurModal =  new InsuranceModal(options);     
        } catch(e){}
        
    },
    updated(){
        if(this.isShowModal){
            this.showDimmed();
        }
    },
    methods : {
        openQuickSearchModal(e){
            this.listingFixedQuickModal.open();
        },
        closeQuickSearchModal(){
            this.listingFixedQuickModal.close();
        },
        openInsurModal(){
             this.InsurModal.open();
        },
        showDimmed(){
            skpui.dimmedLayer.show();
        },
        init(){
              
              this.quickSearchModalInfo = Object.assign({},this.quickSearchInfo);
              this.checkedCarType = this.quickSearchInfo.grade.keys;
              this.pickedInsurType = this.quickSearchInfo.insurance.key;
        },
        changeModalQuickSearchInfo(dates){

            this.quickSearchModalInfo.checkin = Utils.parseDate(dates[0]);
            this.quickSearchModalInfo.checkout = Utils.parseDate(dates[1]);
            this.quickSearchModalInfo.dates = dates;

        },
        goList(){
            
            this.$store.commit('setQuickSearchData', {
                  checkin : this.quickSearchModalInfo.checkin,
                  checkout : this.quickSearchModalInfo.checkout,
                  dates : this.quickSearchModalInfo.dates,
                  grade: this.checkedCarType,
                  insurance : this.pickedInsurType
                }, { module: 'rentcarList' });

            this.$store.commit('setQuickSearchInfoQuery');
            this.$store.dispatch('fetchData');
            this.closeQuickSearchModal();

        }
    }
}
</script>

<style>

</style>
