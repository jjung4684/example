<template>   
   
<!-- Layer : 날짜 & 시간  -->
<section id="modal-wrap" class="tour_calendar_wrap rentcar">

    <!-- Tab1 : 날짜 -->
    <div class="tour_cal_contents tabDate">
        <div class="cal_tabs">
            <ul class="cal_tab">
                <li class="bt_tabDate on"><a>날짜</a></li>
                <li class="bt_tabTime"><a>시간</a></li>
            </ul>
        </div>

        <div class="modal_cont"> <!-- iscroll -->
            <div>
                <!-- calendarTour  -->
                <div class="cal_wrap datePicker">
                </div>
            </div>
        </div>

        <div class="btm_wrap">
            <div class="msg">대여일, 반납일을 선택해 주세요.</div>
            <div class="btnarea">
                <button type="button" class="go_time" id="showTimeTable">시간선택</button>
                <button type="button" class="clendar_close">닫기</button>
            </div>
        </div>
    </div>
    <!-- //Tab1 : 날짜  -->

    <!-- Tab2 : 시간  -->
    <div class="tour_cal_contents tabTime" style="display: none;">
        <div class="cal_tabs">
            <ul class="cal_tab">
                <li class="bt_tabDate"><a href="#">날짜</a></li>
                <li class="bt_tabTime on"><a href="#">시간</a></li>
            </ul>
        </div>

        <div class="modal_cont time_wrap">
            <ul class="times">
                <li>
                    <strong>대여</strong>
                    <em>2018.05.21(월)</em>
                    <div class="box swiper-container0">
                        <ul class="time_lst swiper-wrapper">

                        </ul>
                    </div>
                </li>
                <li>
                    <strong>반납</strong>
                    <em>2018.05.23(수)</em>
                    <div class="box swiper-container1">
                        <ul class="time_lst swiper-wrapper">

                        </ul>
                    </div>
                </li>
            </ul>

            <div class="notice">08:00 ~ 20:00 외의 대여 및 반납은 각 렌터카 업체로 문의 부탁 드립니다.</div>
        </div>

        <div class="btm_wrap">
            <div class="btnarea">
                <button type="button" class="go_time" id="calApplyBtn">적용</button>
                <button type="button" class="clendar_close">닫기</button>
            </div>
        </div>
    </div>
    <!-- //Tab2 : 시간  -->

</section>
<!-- //Layer : 날짜 & 시간  -->
</template>

<script>
import { mapGetters } from 'vuex';
import eventBus from '../../event-bus.js';

export default {
    computed : {
         ...mapGetters({
             quickSearchInfo : 'quickSearchInfo'
         })
    },
    mounted(){
       var calendarModal = new calendarModalComp();
       calendarModal.init(this.quickSearchInfo.dates,this.setDates,this.showDimmed);  
    },
    updated(){
    },    
    methods : {
        showDimmed(){
            skpui.dimmedLayer.show();
        },
        setDates(dates){
            eventBus.$emit('changeModalQuickSearchInfo',dates);
        }
    }
}
</script>

<style>

</style>
