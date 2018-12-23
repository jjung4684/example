<template>
    <div class="cal_wrap datePicker">

    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import '../../js/modal/jquery.datepick.tour.js'

export default {
    computed : {
        ...mapGetters({
            lowestPriceDateList : 'tourpackageCalendar/lowestPriceDateList',
            selectedDates : 'tourpackageCalendar/selectedDates'
        })
    },
    created(){
        
    },
    data(){
        var holidayObj = {};
        $.each(holidayList,function(i, v){
            var dayTxt = v.year + v.month + v.day +"";
            holidayObj[dayTxt] =  {'holiday' : dayTxt};
        });
        return {
           holidayObj  : holidayObj
        }
    },
    mounted(){

        var that = this;
        var $el = $(this.$el);
       
       $el.datepick({
                minDate: new Date(),
                maxDate: '+150',
                multiSelect: 2,
                firstDay: 0,
                showOtherMonths: false,
                selectOtherMonths: true,
                monthsToShow: 4,
                platForm: 'mobile',
                changeMonth: false,
                defaultDate: new Date(),
                renderer: {
                    picker: '{months}',
                    monthRow: '{months}',
                    month: '<table class="tbl_cal">' +
                    '<caption>{monthHeader:yyyy. M}</caption>' +
                    '<colgroup>' +
                    '<col style="width:14.5%">' +
                    '<col style="width:14.2%">' +
                    '<col style="width:14.2%">' +
                    '<col style="width:14.2%">' +
                    '<col style="width:14.2%">' +
                    '<col style="width:14.2%">' +
                    '<col style="width:14.5%">' +
                    '</coroup>' +
                    '<thead>' +
                    '{weekHeader}' +
                    '</thead>' +
                    '<tbody>' +
                    '{weeks}' +
                    '</tbody>' +
                    '</table>',
                    weekHeader: '<tr>{days}</tr>',
                    dayHeader: '<th>{day}</th>',
                    week: '<tr>{days}</tr>',
                    day: '<td>{day}</td>',
                    monthSelector: '',
                    daySelector: 'td',
                    rtlClass: '',
                    multiClass: '',
                    defaultClass: '',
                    selectedClass: 'selected',
                    highlightedClass: '',
                    todayClass: 'today',
                    startClass: 'start',
                    endClass: 'end',
                    middleClass: 'middle',
                    otherMonthClass: '',
                    saturdayClass: 'sat',
                    sundayClass: 'holiday',
                    commandButtonClass: '',
                    commandLinkClass: '',
                    disabledClass: 'disable',
                    setDate : that.selectedDates
                },
                onSelect: function(dates) {

                    that.setDates(dates);
                    // 하단 날짜 처리
                   // selectedDates = dates;
                },
                onShow: function(picker, inst) {
                    // 달력 초기 스타일 설정
                    picker.css('width', '100%');
                    picker.find('th:last').addClass('sat');
                    picker.find('th:first').addClass('holiday');
                },
                onDate: function(date, current) {

                    var onDateObj = {}

                    if(that.holidayObj && that.holidayObj[that.YYYYMMDD(date)]){
                        onDateObj.dateClass = 'holiday'
                    }

                    if(current && that.lowestPriceDateList.length > 0){
                        let priceObj = that.lowestPriceDateList.find( a =>  (a.dprt_dt).replace(/\//gi, "") == that.YYYYMMDD(date) );
                        let dateStr = that.getDate(date);
                        let str = '<div>'+dateStr+'</div>'
                        str += (typeof priceObj !== "undefined" && priceObj.hasOwnProperty('prd_prc') && priceObj.prd_prc > 0) ? '<div class="price">'+(priceObj.prd_prc/10000).toFixed(1)+'만</div>' : ""

                        onDateObj.content = str;
                    }

                    return onDateObj
                   
                }
            });

            $el.datepick('setDate', this.selectedDates);
            $el.datepick('option', {defaultDate: new Date()}); // 선택된 날짜가 기준일로 바뀌지 않고 오늘로 설정되도록 조정


            var iScrollOptions = {
                preventDefaultException: {tagName: /.*/},
                scrollbars: true,
                fadeScrollbars: true,
                mouseWheel: true,
                tab: true
            };

            this.calendarScroll = new IScroll('.modal_cont', iScrollOptions);
            this.calendarScroll.refresh();

    },
    updated(){
        this.calendarScroll.refresh();


    },
    methods : {
        YYYYMMDD(date){
            return this.$moment(date).format('YYYYMMDD');
        },
        getDate(date){
            return this.$moment(date).format('DD');
        },
        setDates(date){
            this.$store.commit('tourpackageCalendar/setSelectedDates',date);
        }
    },
    watch : {
        lowestPriceDateList(lowpriceList){
            $(this.$el).datepick('option', {defaultDate: new Date()}); 
        }
    }
}
</script>

<style>

</style>
