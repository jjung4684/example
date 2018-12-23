<template>
     <div class="set_result_wrap" style="background-image:url('http://m.11st.co.kr/MW/MW/img/tour/search_bgimg_720x160.jpg');">
        <div class="result_cont rent">
            <div class="date">
                <span>{{quickSearchInfo.checkin.year}}.{{quickSearchInfo.checkin.month}}.{{quickSearchInfo.checkin.date}}({{quickSearchInfo.checkin.day}})</span>
                <em>{{quickSearchInfo.checkin.hour}}:{{quickSearchInfo.checkin.minute}}</em>
            </div>
            <div class="date">
                <span>{{quickSearchInfo.checkout.year}}.{{quickSearchInfo.checkout.month}}.{{quickSearchInfo.checkout.date}}({{quickSearchInfo.checkout.day}})</span>
                <em>{{quickSearchInfo.checkout.hour}}:{{quickSearchInfo.checkout.minute}}</em>
            </div>
            <ul class="options">
                <li><em>보험</em> <strong>{{quickSearchInfo.insurance.name}}</strong></li>
                <li><em>차종</em> <strong>{{(quickSearchInfo.grade.names.length > 0 && 6 > quickSearchInfo.grade.names.length) ? quickSearchInfo.grade.names.join(','): "전체"}}</strong></li>
            </ul>
            <div class="result_btns">
                <button type="button" class="btn_rescan" @click="showModal">재검색</button>
            </div>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';
import eventBus from '../../event-bus.js';

export default {
    computed : {
        ...mapGetters({
             quickSearchInfo : 'quickSearchInfo' ,
             isShowModal : 'isShowModal'
        })
    },
    mounted () {
      
    },
    methods : {
        showModal(){

            eventBus.$emit('openQuickSearchModal');
    

            //skpui.dimmedLayer.show();
            //this.$store.commit('setIsShowModal', true, { module: 'rentcarList' })
        }
    }
};
</script>

<style>
</style>
