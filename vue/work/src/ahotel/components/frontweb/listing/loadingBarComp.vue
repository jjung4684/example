<template>
<!-- v-show="hotelList.length == 0 && isLoading" -->
    <div class="filter_dimmed" id="filter_dimmed" v-bind:style="{display : (hotelListSize == 0 && isLoading) ? 'block' : 'none'}" > 
        <img :src="loadingImgPath" alt="잠시만 기다려 주세요. 데이터를 로딩중 입니다.">
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as PATH from '../../../store/const.js';

export default {
     computed : {
         ...mapGetters({
             hotelListSize : 'ahotelList/getHotelListSize',
             isLoading : 'ahotelList/isLoading'
         })
    },
    data(){


        return {
            loadingImgPath : PATH.getIMGURL() + '/img/trip/common/loading_tour.gif'
            //isShowLoadingBar : (this.hotelList.length == 0 && this.isLoading ) ? "block" : "none"
        }
    }
}
</script>

<style>

</style>
