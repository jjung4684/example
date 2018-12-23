<template>
    <!-- 선호 지역 -->
    <div v-if="citySpot.spotInfoList" class="hotel_attraction_box">
        <em class="tit">선호 지역</em>
        <div class="hotel_attraction_list">
            <a v-for="(item,index) in citySpot.spotInfoList" :key="index" href="#" @click="goCitySpot(item)" class="lk">{{item.name}}</a>
        </div>
    </div>
    <!-- //선호 지역 -->
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed : {
         ...mapGetters({
             citySpot : 'ahotelList/getCitySpot'
         })
    },
    methods : {
        goCitySpot(item){

            var param = {
                type : item.type,
                code : item.id
            }

            this.$store.commit('ahotelList/setParams',param);
            this.$store.dispatch('ahotelList/applyCitySpotSearch');
            
        }
    }
}
</script>

<style>

</style>
