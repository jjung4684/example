<template>
     <div class="set_result_pack" v-bind:style="{backgroundImage: 'url(' +  backGroundImg(regionInfo.backgroundImg) + ')'}">
            <div class="result_cont">
                <div class="result_info" v-show="resultInfo">
                    <span class="start">{{resultInfo.departureText}}</span>
                    <strong>{{resultInfo.destination}}</strong>
                    <span class="date" v-if="resultInfo.departureDateArr.length">{{ dateFormat(resultInfo.departureDateArr)}} 출발</span>
                </div>

                <div id="optDetail" class="wrap_flick_prd wrap_flick_scroll" v-if="hasRegionInfo()"><!-- iscroll -->
                    <ul class="opt_detail">
                        <li v-if="regionInfo.flightTime">
                            <div class="innr">
                                <span class="stit">비행시간</span>
                                <span class="txt"  v-html="flightTimeStr(regionInfo.flightTime)"></span>
                            </div>
                        </li>
                        <li v-if="regionInfo.properTime">
                            <div class="innr">
                                <span class="stit">여행 최적기</span>
                                <span class="txt"><strong>{{regionInfo.properTime[0]}}</strong>월 ~ <strong>{{regionInfo.properTime[1]}}</strong>월</span>
                            </div>
                        </li>
                        <li v-if="regionInfo.voltage !== null">
                            <div class="innr">
                                <span class="stit">전압</span>
                                <span class="txt"><strong>{{regionInfo.voltage}}</strong>V</span>
                            </div>
                        </li>
                        <li v-if="regionInfo.visa !== null">
                            <div class="innr">
                                <span class="stit">비자</span>
                                <span class="txt stxt" v-html="regionInfo.visa"></span>
                            </div>
                        </li>
                        <li v-if="regionInfo.gmtTime !== null && isValidRegionName(regionInfo.gmtTime)">
                            <div class="innr"> 
                                <span class="stit">시차</span>
                                <span class="txt" v-html="calculateTimeDiff(regionInfo.gmtTime)"></span>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="result_btns">
                    <button type="button" class="btn_rescan" @click="showModal">재검색</button>
                </div>
            </div>
        </div>
</template>

<script>
import { mapGetters } from 'vuex';
import eventBus from '../../event-bus.js';
import * as PATH from '../../../common/const.js';

export default {
    computed : {
        ...mapGetters({
            regionInfo : 'tourpackageList/regionInfo',
            resultInfo : 'tourpackageList/resultInfo'
        })
    },
    data(){
        return {
            imgURL : PATH.getUploadURL()
        }
    },
    updated(){
         if(this.hasRegionInfo()){
            this.handleScroll();
         }
    },
    methods : {
        backGroundImg(image){
            
           return(this.$isEmpty(image))? this.imgURL + '/ui_img/mw/tour/package/list_default.jpg' : ((image.indexOf('http://'))? this.imgURL + image : image);
        },
        hasRegionInfo(){
            return (this.regionInfo && Object.keys(this.regionInfo).length > 0);
        },
        showModal(){
            eventBus.$emit('openQuickSearchModal');
        },
        dateFormat(departureDateArr){

            var that = this;
            var tempStr = (departureDateArr.length ==2 ) ? "사이" : "";
            return departureDateArr.map(YYYYDDMM => that.$moment(YYYYDDMM).format('MM.DD.(dd)')).join(" - ") + tempStr;
        },
        handleScroll(){
            var iScrollOption = {
                scrollX: true,
                eventPassthrough: true,
                preventDefaultException: {tagName:/.*/},
                tap: true,
                disablePointer: true,
                disableMouse: true,
                disableTouch: false
            };
            var dealList = new IScroll('#optDetail', iScrollOption);       
        },
         flightTimeStr(flightTime){
            if(flightTime.length > 0){
                let str = "약" + " <strong>" + flightTime[0] + "</strong>시간" ;
                str += (flightTime[1] > 0) ? " <strong>" +flightTime[1]+"</strong>분" : "";
                return str;
            }
            return "";
        },
        isValidRegionName(tzName){
             if(tzName.indexOf('/') > 0){
                let findIndex = this.$moment.tz.names().findIndex(item=> item==tzName);     
                return (findIndex > -1)
             }
             return false; 
        },
        calculateTimeDiff(tzName){

            let koOffset = this.$moment.tz("Asia/Seoul").utcOffset();
            let regionOffset =  this.$moment.tz(tzName).utcOffset();
            let diffTime = (regionOffset - koOffset);
            let diffHour = Math.round((diffTime/60));
            let diffMinutes = Math.abs((diffTime%60));
            let str = "<strong>" + diffHour +"</strong>시간"
            if(diffMinutes > 0) str +=  "<strong>" + diffMinutes+"</strong>분";
            return str;
          
        }    
    }
}
</script>

<style>

</style>
