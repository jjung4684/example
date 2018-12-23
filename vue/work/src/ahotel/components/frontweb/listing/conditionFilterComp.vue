<template>
    <div class="filter_box" id="filter_box_div" ref="filterBox">

    <div class="filter" style="padding-top: 0px;">
        <div class="filter_top">
            <h3 class="tit"><span class="sp_abroad_hotel ico_filter"></span>상세조건</h3>
            <div class="select_list"><!-- 선택된 조건 없을 때 .select_list 삭제(display:none) -->
                <em v-for="(item,index) in activeFilterNames" :key="index" class="select_item">
                    <span v-if="item.type == 'hotelTypes'" class="sp_abroad_hotel_filter" :class="item.iconClass"></span>
                    {{item.value}}
                </em>
                <em v-if="maxRange > 0" class="select_item">
                    {{minPrice | comma}}원 ~ {{maxRange | comma}}원
                </em>
			</div>
            <button type="button" class="btn_reset" id="filter_reset_btn" @click="resetFilter"><span class="sp_abroad_hotel ico_reset"></span>초기화</button>
        </div>
        <div class="type_box">
            <h4 class="sub_tit">호텔등급</h4>
            <ul class="type_list" id="filterHStarRating">
                <li v-for="(item, key) in filterInfo.grades" :key="key" role="hotelFilterLi">
                    <span class="inp_checkbox" :class="{checked : item.isActive}" @click="toggleChecked(item)"><!-- 선택 시 .checked 클래스 추가 -->
                        <input type="checkbox" :value="key" name="hotel_star" class="skip" >
                        <label :for="key" class="label"><span class="sp_abroad_hotel ico_check"></span>{{item.value}}</label>
                    </span>
                </li>
            </ul>
        </div>
        <div class="type_box price_box">
            <h4 class="sub_tit">가격<span class="txt">(전체 일정)</span></h4>
            <div class="price_range_graph">
                <em class="tit_max">
                    {{maxRangeVal | filtersMaxRange}} <!-- 가격선택 | 최대 380,761원-->
                </em>
                <span class="range_bar"> 
                    <span class="bar" style="width:0%;"></span>
                    <span class="handle handle_drag" ref="handleDrag" style="left:0px;right:0px"><!-- .handle_drag 추가-->
                        <span class="icon handle_icon" style="margin: -10px -10px 0 -10px;">가격 선택</span>
                    </span>
                </span>
                <div class="txt">
                    <span class="min"><span class="skip">최소</span>1,000원</span>
                    <span class="max"><span class="skip">최대</span>2,000,000원</span>
                </div>
            </div>
        </div>

        <div class="type_box">
            <h4 class="sub_tit">숙소타입</h4>
            <ul class="type_list" id="filterHtypeTbl">
                <li v-for="(item, key) in filterInfo.hotelTypes" :key="key" role="hotelFilterLi">
                    <span class="inp_checkbox" :class="{checked : item.isActive}" @click="toggleChecked(item)"><!-- 선택 시 .checked 클래스 추가 -->
                        <input type="checkbox" name="hotel_type" class="skip" >
                        <label class="label">
                            <span class="sp_abroad_hotel ico_check" :class="{checked : !item.isActive}"></span>
                            <span class="sp_abroad_hotel_filter" :class=[item.iconClass]></span>{{item.value}}
                        </label>
                    </span>
                </li>
            </ul>
        </div>

        <div class="type_box convenience_box open"><!-- 편의서비스 하단 더보기 클릭 시 .open 클래스 추가 -->
            <h4 class="sub_tit">편의서비스</h4>
            <ul class="type_list" id="filterServiceTbl">
                <li v-for="(item, key) in filterInfo.facilities" :key="key" role="hotelFilterLi">
                    <span class="inp_filter_checkbox " :class="{checked : item.isActive}"  @click="toggleChecked(item)"><!-- 선택 시 .checked 클래스 추가 -->
                        <input type="checkbox" name="hotel_service" class="skip">
                        <label :for="key" class="label"><span class="sp_abroad_hotel_filter" :class=[item.iconClass]></span>{{item.value}}</label>
                    </span>
                </li>
            </ul>
        </div>
        <button type="button" class="btn_submit" @click="applyFilter()" >적용</button><!-- 플로팅 시 .fixed 클래스 추가 -->

        <!-- 전시구좌 -->
        <div class="bnr_box" v-if="bannerInfo.lnkBnnrImgUrl">
            <a :href="bannerInfo.dispObjLnkUrl" class="lk"><img :src="uplaodURL + bannerInfo.lnkBnnrImgUrl" :alt="bannerInfo.dispObjNm"  v-bind:style="{ backgroundColor:bannerInfo.extraText}"></a>
        </div>
        <!-- //전시구좌 -->
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as PATH from '../../../store/const.js';
import VueSlideBar from 'vue-slide-bar'

export default {
    components: {
        VueSlideBar
    },
    data(){
        return {
            maxRangeVal : 0, //최대 가격 필터값
            minPrice : 1000,
            maxPrice : 2000000,
            uplaodURL : PATH.getUploadURL()
        }
    },
    computed : {
         ...mapGetters({
             filterInfo : 'ahotelList/getFilterInfo',
             activeFilterNames : 'ahotelList/getActiveFilterNames',
             maxRange : 'ahotelList/getMaxRange',
             bannerInfo : 'ahotelList/getBannerInfo' 
         })
    },
    created(){
        this.maxRangeVal = this.maxRange;
    
    },
    mounted() {


        var that = this;


        //가격바 width setting
        if(this.maxRange > 0){
            var temp1 = ((this.maxRange / this.maxPrice) * 100);				// 가격 퍼센트
            var rangeBarWidth = Number($(".range_bar").width());			// 레인지 바의 width 값
            var settingsLeft = (rangeBarWidth * temp1) / 100;				// 선택된 레인지바의 width 값
            $(".price_range_graph .bar").css("width", settingsLeft);  
            $(".handle_icon").css({
				left : settingsLeft
			});  
        }
      
        $( ".handle_icon" ).draggable({
            containment: ".handle_drag",
            scroll: false ,
            axis : "x" ,
            drag : function(e){
                $(".price_range_graph .bar").css("width", $(this).position().left);    
                that.calSlidePrice($(".handle_icon").position().left);
                //return_price($count_price = $(".handle_icon").position().left);
            },
            stop : function(){
                $(".price_range_graph .bar").css("width", $(this).position().left);                     

                //return_price($count_price = $(".handle_icon").position().left);
		    }
        });
        
        // 필터버튼영역 스크롤 컨트롤
        var filterBtnOffset = $( '.btn_submit' ).offset();
        $( window ).scroll( function() {

            if ( ($(window).height() + $( document ).scrollTop()) > filterBtnOffset.top ) {
                $('.btn_submit').removeClass('fixed');
            }
            else {
                $('.btn_submit').addClass('fixed');
            }
        });

        // // 필터 버튼영역 고정
        $('.btn_submit').addClass('fixed');


    },
    methods : {
        toggleChecked(item){
            item.isActive =  !item.isActive;
        },
        applyFilter(){
            this.$store.commit('ahotelList/setMaxRange', this.maxRangeVal);
            this.$store.commit('ahotelList/setFilterInfo');
            this.$store.dispatch('ahotelList/applyFilterSearch');
        },
        resetFilter(){
            this.$store.commit('ahotelList/resetFilter');
            this.$store.dispatch('ahotelList/applyFilterSearch');
        },
        calSlidePrice(iconPosition){
            if(iconPosition == 0){
                this.maxRangeVal = this.minPrice;
                return;
            }else if(iconPosition == this.$refs.handleDrag.offsetWidth){
                this.maxRangeVal = this.maxPrice;
                return;
            }

            this.maxRangeVal = Math.floor(( iconPosition / this.$refs.handleDrag.offsetWidth ) * this.maxPrice);
        }
    },
    filters : {
        filtersMaxRange(range_v){
            if(range_v == 0){
                return "가격선택"
            }else if(range_v > 0){
                return "최대 " + Math.round(range_v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
            }
        },comma(value) {
            if (typeof value === 'undefined') return;
            return Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }

}
</script>

