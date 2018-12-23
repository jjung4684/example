<template>
<div>
    <div class="sort_check"  v-if="!isLoading">
        <p class="sort_allcount">총 <strong>{{totalCnt}}</strong>개 상품</p>
    </div>

     <ul class="oversea_path_list package" v-if="productList.length > 0 && !isLoading">
            <li v-for="(item,index) in productList" :key="index">
                <a @click="goProductDetail(item.prdNo, item.scheduleDepartureDate)">
                    <span v-if="(item.tourDealYn == 'Y')" class="ic_skd">쇼킹딜</span>
                    <!-- <span class="thumb"><v-lazy-image :src="item.baseImgUrl"  v-bind:alt="item.prdNm" onerror="this.src='http://m.11st.co.kr/MW/img/tour/product/no_image_360x360.png'"/></span> -->
                    <div class="thumbnail_wrap">
                    <div class="thumbnail">
                        <div class="align_ctr">
                        <v-lazy-image class="landscape" :src="item.baseImgUrl"  v-bind:alt="item.prdNm" onerror="this.src='http://m.11st.co.kr/MW/img/tour/product/no_image_360x360.png'"/>
                        </div>
                    </div>
                    </div>
                    <div class="info">
                        <div class="title_area"><strong>{{item.prdNm}}</strong></div>
                        <div class="review star" v-show="item.prdEvlTotQty > 0"><b>{{(item.buySatisfy/20).toFixed(1)}}</b>/5<span>리뷰 {{item.prdEvlTotQty}}</span></div>
                        <ul class="detail_lst">
                            <li class="bl_txt">{{item.tourPrdType}} {{item.scheduleTourNightDays}}{{item.scheduleTourDays | filterScheduleTourDays(item.scheduleTourDays)}} <span class="bar" v-show="item.shoppingTimes">쇼핑 {{item.shoppingTimes}}회</span></li>
                            <li v-if="item.scheduleDepartureDate"><em>{{item.scheduleDepartureDate | moment("MM.DD.(dd)")}} {{(item.dealPrdYn == "N") ? item.scheduleDepartureTime : ""}}</em> {{(item.hasOwnProperty('scheduleDprtAirlineCd')) ? item.scheduleDprtAirlineCd.split("(")[0] : ""}}</li>
                        </ul>
                        <div class="disc_prc">
                            <span class="opt">성인</span>
                            <div class="price" v-show="item.scheduleFinalDscPrc > 0">
                                <span class="prc"><b>{{parseInt(item.scheduleFinalDscPrc)| comma}}</b>원~</span>
                            </div>
                        </div>
                    </div>
                </a>
                <div class="plus_info">
                    <span ><b>{{item.sellerNm}}</b> {{item.advrtStmt}}</span>
                    <span class="benefit_ico">
                        <!-- <em class="ico_t"></em>
                        <em class="ico_ok"></em> -->
                        <em v-if="item.cardIconYN == 'Y' && hasValidCoupon" class="coupon">{{getDiscountRate(item)}}%</em>
                    </span>
                </div>
            </li>
     </ul>

    <button v-show="productList.length > 0 && isShowMoreBtn && !isLoading" type="button" class="path_prd_more" @click="showMore">더보기</button>

    <div class="package_loading" v-if="isLoading">
        <p><strong>11개</strong> 여행사 / 20,000개<br>상품을 검색하고 있습니다.</p>
    </div>

    <div class="no_result" v-if="productList.length == 0 && !isLoading">
        <strong>검색 결과가 없습니다.</strong>	<p>단어의 철자가 정확한지 확인해주세요.<br>		검색어의 단어 수를 줄이거나, 다른 검색어로 검색해 보세요.<br>		보다 일반적인 검색어로 다시 검색해 보세요.	</p>
    </div>

</div>
</template>

<script>

import { mapGetters } from 'vuex';
import * as PATH from '../../../common/const.js';
import * as Utils from '../../../common/utils.js';

import qs from 'qs';

export default {
    computed : {
            ...mapGetters({
                productList : 'tourpackageList/productList',
                isShowMoreBtn : 'tourpackageList/isShowMoreBtn',
                totalCnt : 'tourpackageList/totalCnt',
                isLoading : 'tourpackageList/isLoading',
                conditionData : 'tourpackageList/conditionData',
                searchQueryStr : 'tourpackageList/searchQueryString'
            })
    },
    data(){
        return {
            imgURL : PATH.getUploadURL(),
            omRootUrl : PATH.getOmRootMobileURL(),
            isApp : Utils.isApp(),
            isSafari : /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
        }
    },
    filters : {
        comma(value) {
            if (typeof value === 'undefined') return;
            return Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        filterScheduleTourDays(value){
            if(value > 0){
                return value + "일";
            }
        }
    },
    methods : {
        showMore(){

            this.$store.commit('tourpackageList/addPageIndex');
            this.$store.dispatch('tourpackageList/getApackageList', {hideLoadingBar : true, loadRegionInfo : false});

        },
        goProductDetail(prdNo, dprtDgnDy){

            var dprtDgnDyStr = this.$moment(dprtDgnDy).format('YYYYMMDD');
         
            if(!this.isApp && !this.isSafari){ //MW 상품상세 이동시 local stroage에 상품리스트 저장.(safari제외)

                let data = {
                    filterTagList : this.conditionData.filterTagList,
                    currentOrder : this.conditionData.currentOrder,
                    data : this.productList,
                    key : this.$route.fullPath
                }
                
                this.$localStorage.set('apackageListStore',JSON.stringify(data));   

                this.$router.replace({ name:'list',query: this.$store.getters['tourpackageList/searchQueryString']});
            }
            
            window.location.href = this.omRootUrl + "/Product/productBasicInfo.tmall?mallType=tour&prdNo="+prdNo+"&dprtBgnDy="+dprtDgnDyStr;
        },
        hasValidCoupon(){
            var cardRate = (this.isApp) ? 'cardDscRt11stApp' : 'cardDscRtMobile';
            return (item.hasOwnProperty(cardRate) && item[cardRate] > 0)
        },
        getDiscountRate(item){
           var cardRate = (this.isApp) ? 'cardDscRt11stApp' : 'cardDscRtMobile';
           return (item.hasOwnProperty(cardRate) && item[cardRate] > 0) ? item[cardRate] : ''
        }
    }
}
</script>

<style>

</style>
