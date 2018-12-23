<template>
    <div>
        <ul class="total_list" id="total_list" >
            <li  v-show="item.rateList && item.rateList.length > 0 && item.rateList[0].price > 0" class="total_item" v-for="(item,index) in hotelList" :key="index">
                <div class="thum_box">
                    <a href="javascript:;" @click="goDetailProduct(item.hotel_id)" class="thum" >
                        <img :src="nolPath + item.thumbnail" :alt="item.name" @error="onImgError" />
                        <span class="rating"><span class="txt">{{item | getThumbName(hotelTypes)}}</span></span>
                    </a>
                </div>
                <div class="info_box">
                    <a href="javascript:;"  @click="goDetailProduct(item.hotel_id)" class="hotel_tit">{{item.name}}</a>
                    <p class="txt_range" v-if="item.nearPlaceDistance">
                        <span class="sp_abroad_hotel ico_map_small_black">위치</span>{{item.nearPlaceName}} - {{item.nearPlaceDistance | kilometer}}km
                    </p>
                    <div class="review_area" id="review_area" v-if="item.review_score && item.review_score.review">
                        <div class="review_score">
                            <em class="review_badge" id="review_badge"><span class="skip">종합평점</span> {{item.review_score.review.score}}</em>
                            <span class="review_num">
                                <em class="value" id="review_score_word">{{item.review_score.review.review_score_word}}</em>
                                <span class="review" id="review">{{item.review_score.review.count | comma}}개의 이용후기</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="price_box" v-if="item.rateList" id="price_box">
                    <a href="javascript:;" @click="goDetailProduct(item.hotel_id)" >
                        <div class="info">
                            <span class="company"><img :src="partnerMapInfo[item.rateList[0].source_table_name_key].icon" :alt="item.rateList[0].site_name"></span>
                            <strong class="total_price">{{item.rateList[0].price | comma}}<span class="txt_won">원</span></strong>
                            <p class="average">(1박 평균, {{item.rateList[0].price | oneDayPrice(stayDays) | comma}}원/ 세금포함)</p>
                        </div>
                    </a>
                    <ul class="price_list" v-if="item.rateList.length > 1">
                        <li v-for="(priceItem,index) in item.rateList.slice(1,item.rateList.length)" :key="index" v-if="priceItem.price">
                            <a href="javascript:;" @click="goDetailProduct(item.hotel_id)" class="link_txt"><span class="tit">{{partnerMapInfo[priceItem.source_table_name_key].name}}</span><em class="total_price">{{priceItem.price | comma}}<span class="txt_won">원</span></em></a><p class="tooltip">1박 평균 {{priceItem.price | oneDayPrice(stayDays) | comma}}원</p>
                        </li>
                    </ul>
                    <a href="javascript:;" @click="goDetailProduct(item.hotel_id)" class="btn_more">가격비교 더보기</a>
                </div>
            </li>			
                        <!-- // 호텔 검색결과 li -->
        </ul>
        <button type="button" class="btn_list_more" v-show="hotelList.length > 0 && isshowMoreBtn" @click="showMore" ><span class="in_btn">더보기</span></button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as PATH from '../../../store/const.js';
import qs from 'qs';

export default {
    computed : {
         ...mapGetters({
             hotelList : 'ahotelList/getHotelList',
             stayDays : 'ahotelList/getStayDays',
             hotelTypes : 'ahotelList/getFilterHotelTypes',
             params : 'ahotelList/getParams',
             isshowMoreBtn : 'ahotelList/isShowMoreBtn',
             partnerMapInfo : 'ahotelList/getPartnerMapInfo'
         })
    },
    data(){
        return {
            nolPath : PATH.getRolImgUrl()
        }
    },
    filters : {
        kilometer(value) {
            return (value / 1000.0).toFixed(1);
        },
        comma(value) {
            if (typeof value === 'undefined') return;
            return Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        oneDayPrice(price, diffDays) {
            return Math.round(price / diffDays);
        },
        getThumbName(hotelInfo, hotelTypes){

             if (hotelInfo.hasOwnProperty("allstay_hotel_type_id")) {

                if (hotelInfo.allstay_hotel_type_id == "1") {
                    if (hotelInfo.star_rating == "0") {
                        return "성급없음";
                    } else {
                        return hotelInfo.star_rating + "성급 호텔";
                    }
                } else {
                    
                    var hotelType = hotelTypes.find( obj => obj.key == hotelInfo.allstay_hotel_type_id );
                    return hotelType ? hotelType.value : "";
                }
            }
        }
    },
    methods : {
        goDetailProduct(hotelId){
        
             var queryObj = {
                mallType : this.params.mallType,
                dispCtgrNo : this.params.dispCtgrNo,
                checkin : this.params.checkin,
                checkout : this.params.checkout,
                hotel_id : hotelId
            }

            var queryString =  qs.stringify(queryObj) + "&room=" + this.params.room.join('&room=');
            var url = 'http://tour.11st.co.kr/tour/ahotel/hotelProductDetail.tmall?' + queryString;

            var win = window.open(url, '_blank');
            win.focus();

        },
        showMore(){
            this.$store.commit('ahotelList/addPageIndex');
        },
        onImgError(e) {
            let defaultURL = PATH.getIMGURL() + '/img/trip/abroad_hotel/img_noimg_search.jpg';
            if (e.target.src !== defaultURL) {
                e.target.src = defaultURL;
            }
        }
    }
}
</script>

<style>

</style>
