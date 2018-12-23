<template>
    <div>
        <div  v-show="!isLoading && carCount > 0">
            <div class="sort_check">
                <p class="sort_allcount">총 <strong>{{carCount}}</strong>개 차량</p>
            </div>
 
            <ul class="rentcar_list" >
                <li v-for="(item,index) in carinfoList" :key="index">
                    <a @click="goProductPage(item.productNo)">
                        <span class="thumb"><v-lazy-image :src="item.imagePath" v-bind:alt="item.productName" onerror="this.src='http://m.11st.co.kr/MW/img/tour/product/no_image_360x360.png'"/></span>
                        <div class="info">
                            <div class="title_area"><strong>{{item.productName}}</strong></div>
                            <div class="disc_prc">
                                <span class="company">{{item.sellerClientNm}}</span>
                                <span class="rate" v-if="(item.discountPrice > 0)">{{Math.round((item.discountPrice/item.sellPrice)*100)}}%</span>
                                <div class="price">
                                    <span class="prc"><b>{{item.sellPrice - item.discountPrice | comma}}</b>원</span>
                                    <del v-if="(item.discountPrice > 0)">{{item.sellPrice | comma}}원</del>
                                </div>
                                <span class="tip" v-if="item.promotionDescription">{{item.promotionDescription}}</span>
                            </div>
                        </div>
                    </a>
                    <div class="plus_info">
                        <span class="caropt">{{item.gradeName}} / {{item.capacity}}인승 / {{item.fuelName}}</span>
                        <router-link :to="{ path: '/detail', query: getQueryObj(item) }" class="compare">
                            {{item.sellerCount}}개 업체 가격비교
                        </router-link>
                        <!-- <a href="#" class="compare"></a> -->
                    </div>
                </li>
            </ul>

            <button v-show="isMore" type="button" class="path_prd_more" @click="addPageIndex">더보기</button>
        </div>
        
        <div v-show="isLoading" class="rentcar_loading">
            <p><strong>31개</strong> 업체 / 11,699개<br>차량을 검색하고 있습니다.</p>
        </div> 

        <div v-show="!isLoading && carCount == 0" class="no_result">
            <strong>검색 결과가 없습니다.</strong>	<p>단어의 철자가 정확한지 확인해주세요.<br>		검색어의 단어 수를 줄이거나, 다른 검색어로 검색해 보세요.<br>		보다 일반적인 검색어로 다시 검색해 보세요.	</p>
        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getImgDomain } from '../../utils/const.js';


export default {
    data (){
        return {
            uploadUrl : ""
        }
    },
    computed : {
         ...mapGetters({
             isLoading : 'isLoading',
             isMore : 'isMore',
             carinfoList : 'carinfoList',
             carCount : 'carCount',
             query : 'query',
             quickSearchInfo : 'quickSearchInfo'
         })
    },
    filters : {
        comma(value) {
            if (typeof value === 'undefined') return;
            return Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    },
    mounted(){
      // this.uploadUrl = getImgDomain() ; 
       //"/t/360CC";  + item.imagePath
    },
    updated(){
   
    },
    methods : {
       getQueryObj(item){

          return {
              productNo : item.productNo,
              insuranceType : this.quickSearchInfo.insurance.key,
              //carCode : item.sellerCarCode,
              //vendorCode : item.vendorCode,
              checkin : this.query.checkin,
              checkout : this.query.checkout,
              checkinTime : this.query.checkinTime,
              checkoutTime : this.query.checkoutTime,
              productName : encodeURIComponent(item.productName),
              fuelName : encodeURIComponent(item.fuelName),
              gradeName : encodeURIComponent(item.gradeName),
              capacity : item.capacity,
              ctlgNo : item.ctlgNo
          }

       },
       addPageIndex(){
            this.$store.commit('addPageIndex', null , { module: 'rentcarList' })
       },
       goProductPage(productNo){
           this.$store.dispatch('goProductPage',productNo);
       }
    }
}
</script>

<style>

</style>
