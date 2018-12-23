<template>
    <!-- 리스팅 영역 -->
    <div>
        <ul class="rentcar_compare_list" v-if="!isLoading">
            <li v-for="(item,index) in carinfoList" :key="index">
                <a @click="goDetailPage(item.productNo)">
                    <div class="info">
                        <div class="title_area">{{item.sellerClientNm}}</div>
                        <div class="review star" v-if="(item.reviewScore > 0)"><b>{{Math.round((item.reviewScore/20)*10)/10}}</b>/5</div>
                        <div class="review" v-if="(item.reviewCount > 0)"><span>리뷰 {{item.reviewCount}}</span></div>
                        <div class="disc_prc">
                            <span class="rate" v-if="(item.discountPrice > 0)">{{Math.round((item.discountPrice/item.sellPrice)*100)}}%</span>
                            <div class="price">
                                <span class="prc"><b>{{item.sellPrice - item.discountPrice | comma}}</b>원</span>
                                <del v-if="(item.discountPrice > 0)">{{item.sellPrice | comma}}원</del>
                            </div>
                        </div>
                        <div class="disc_skt" v-if="item.promotionDescription" >{{item.promotionDescription}}</div>
                        <div class="etc_price">
                            <span><b>보상한도 {{item.compensationLimit | insuranceTxt(isUnlimitedInsurance)}}</b></span>
                            <span>대여료 {{item.rentalPrice | comma}}원</span>
                            <span>보험료 {{item.insurancePrice | comma}}원</span>
                        </div>
                    </div>
                    <div class="plus_info"><span>{{item.options | addSpace}}</span></div>
                </a>
            </li>
        </ul>
        <div class="rentcar_loading" v-if="isLoading"><p></p></div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';
import * as Utils from '../../utils/tour-list';
import qs from 'qs';

export default {
    computed : {
        ...mapGetters({
           carinfoList  : 'rentcarCompanyList/carinfoList',
           query : 'rentcarCompanyList/query',
           isLoading : 'rentcarCompanyList/isLoading',
           isUnlimitedInsurance : 'rentcarCompanyList/isUnlimitedInsurance'
        })
    },
    filters : {
        comma(value) {
            return Utils.comma(value);
        },
        addSpace(value){
            if(typeof value == 'undefined' || value.length == 0) return '';
            return value.split(',').join(', ');
        },
        insuranceTxt(price , isUnlimitedInsurance){
            if(isUnlimitedInsurance && price == 0){ //보험 완전자차(무제한)이고, 한도가 0이면 무제한으로 표시.
                return "무제한";
            }else{
                return price + "만원";
            }
        }
    },
    mounted(){
    },
    methods : {
        goDetailPage(productNo){
            this.$store.dispatch('rentcarCompanyList/goDetailPage',productNo);            
        }
    }
}
</script>

<style>

</style>
