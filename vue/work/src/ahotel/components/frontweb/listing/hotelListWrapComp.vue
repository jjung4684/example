<template>
<div class="result_list_box">
    <h3 class="skip">검색 결과</h3>
    <div class="product_list_box">
        <sort-comp></sort-comp>
        <list-comp></list-comp>
    </div>
    <!-- 검색한 조건 없을 때 -->
    <div class="result_none" id="result_none" v-show="hotelListSize == 0 && !isLoading">
        <p class="desc"><strong>검색하신 조건으로 예약 가능한 객실이 없습니다.</strong> 다른 조건으로 검색해 주세요.</p>
    </div>
    <!-- //검색한 조건 없을 때 -->
</div>
    
</template>

<script>
import { mapGetters } from 'vuex';
import sortComp from './conditionSortComp.vue';
import hotelListComp from './hotelListComp.vue';

export default {
    computed : {
         ...mapGetters({
             hotelListSize : 'ahotelList/getHotelListSize',
             isLoading : 'ahotelList/isLoading'
         })
    },
    components : {
        'sort-comp' : sortComp,
        'list-comp' : hotelListComp
    },
    created(){

    }
}
</script>

<style>

</style>
