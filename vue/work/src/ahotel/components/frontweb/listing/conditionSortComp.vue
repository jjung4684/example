<template>
    <div class="result_sort_box">
        <p class="result_info" id="result_info">상품 <strong>{{hotelSize}}</strong>개</p>
        <div class="sort_viewtype_wrap">
            <ul class="sort_menu" id="sortUl">
                <li v-for="order in orderList" :key="order.key" v-bind:class="[{selected: currentOrder.key == order.key},{ disabled : checkLoading(order.key)}]"><a href="#" @click="goSorting(order)">{{order.name}}</a><p class="tooltip">로딩이 끝난 후 사용 가능합니다.</p><span class="tx_bar"></span></li><!-- 선택 시 .selected 클래스 추가 -->
            </ul>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed : {
        ...mapGetters({
            currentOrder : 'ahotelList/getCurrentOrder',
            hotelSize : 'ahotelList/getHotelListSize',
            isLoading : 'ahotelList/isLoading',
            isReviewLoading : 'ahotelList/isReviewLoading'
        })        
    },
    data(){
        var orderList = [{
            key: "best",
            name: "인기순"
        }, {
            key: "pricelow",
            name: "가격 낮은순"
        }, {
            key: "pricehigh",
            name: "가격 높은순"
        }, {
            key: "starlow",
            name: "성급 낮은순"
        }, {
            key: "starhigh",
            name: "성급 높은순"
        }, {
            key: "reviewscore",
            name: "평점 높은순"
        }];

        return {
            "orderList": orderList
        };

    },
    methods : {
        goSorting(item){

            if(this.isLoading) return;

            this.$store.commit("ahotelList/setCurrentOrder", item);
            this.$store.dispatch("ahotelList/sortHotelList");

        },
        checkLoading(key){
            if(key == "best"){
                return false;
            }else if(key == "reviewscore"){
                return (this.isReviewLoading || this.isLoading);
            }else{
                return (this.isLoading);   
            }
        }
    }
}
</script>

<style>

</style>
