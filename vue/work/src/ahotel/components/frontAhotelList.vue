<template>
<div>
    <cityspot-comp></cityspot-comp>
    <div class="hotel_wrap">
        <filter-comp></filter-comp>
        <list-comp></list-comp>
        <loadingbar-comp></loadingbar-comp>
    </div>
</div>
</template>

<script>
import citySpotComp from './frontweb/listing/citySpotBoxComp.vue'
import filterComp from './frontweb/listing/conditionFilterComp.vue'
import listComp from './frontweb/listing/hotelListWrapComp.vue'
import loadingBarComp from './frontweb/listing/loadingBarComp.vue'

export default {
    components : {
        'cityspot-comp' : citySpotComp,
        'filter-comp' : filterComp,
        'list-comp' : listComp,
        'loadingbar-comp' : loadingBarComp
    },
    created (){

        this.$store.commit('ahotelList/setParams',this.$route.query);
        this.$store.dispatch('ahotelList/getFilterList');
        this.$store.dispatch('ahotelList/getBannerInfo');
        this.$store.dispatch('ahotelList/getPartnerMapInfo');
        this.$store.dispatch('ahotelList/getHotelList');
        
    }   

}
</script>

<style>

</style>
