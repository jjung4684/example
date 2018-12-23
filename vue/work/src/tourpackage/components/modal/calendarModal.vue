<template>
     <!-- calendar layer  -->
     <modal name="calendarModal" @before-open="beforeOpen" >
         <!-- calendar layer  -->
        <section id="modal-wrap" class="tour_calendar_wrap"  style="top: 0px; left:0px">
            <div class="tour_cal_contents">
                <h1 class="tour_calendar_tit">날짜 선택</h1>

                <div class="modal_cont"> <!-- iscroll -->
                    <div>
                        <date-picker></date-picker>
                    </div>
                </div>

                <div class="checkin_out"><button type="submit" class="check_success" @click="applyDates">적용</button></div>
            </div>
            <button type="button" class="tour_clendar_close"  @click="closeModal">닫기</button>
        </section>
        <!-- //calendar layer  -->
     </modal>
    <!-- //calendar layer  -->
</template>

<script>
import { mapGetters } from 'vuex';
import * as Util from '../../../common/utils.js';
import datePicker from './datePicker.vue'
import isEmpty from 'lodash.isempty'

export default {
   computed : {
        ...mapGetters({
            selectedDates : 'tourpackageCalendar/selectedDates'
        })
    },
    created(){
        //캘린더 최저가 가격
    },
    mounted(){

    },
    components: {
     'date-picker' : datePicker,
    },
    methods : {
        beforeOpen(event){
   

            if(this.isValidParam(event.params)){

                let deptCityCd = event.params.deptCityCd;
                let destination = event.params.destination;
                this.$store.dispatch('tourpackageCalendar/getLowestPriceDateList',{deptCityCd : deptCityCd,destination:destination});

                let dates = event.params.dates;
                if(dates.length > 0){
                    dates = dates.map(item=>{return Util.dateUtil.parseDateFormat(item)});
                    this.$store.commit('tourpackageCalendar/setSelectedDates',dates);
                }

            }


        },
        isValidParam(params){
            return (!isEmpty(params.deptCityCd) && !isEmpty(params.destination))
        },
        closeModal(){
            this.$modal.hide('calendarModal',{scrollable:true})
        },
        applyDates(){
            let dates = this.selectedDates;
            dates = dates.map(item=>{return Util.dateUtil.yyyymmdd(item)});
            this.$emit('interface',dates);
            this.closeModal();
        }
    }
}
</script>

<style>

</style>
