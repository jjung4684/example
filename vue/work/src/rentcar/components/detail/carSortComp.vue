<template>
    <div class="sort_check wt" v-if="totalCount > 0">
        <p class="sort_allcount">총 <strong>{{totalCount}}</strong>개 업체비교</p>
        <ul class="r_sort">
            <li><button type="button" @click="setOrder('sellPrice')" v-bind:class="{ on: currentOrder=='sellPrice'}">최저가순</button></li>
            <li><button type="button" @click="setOrder('reviewScore')" v-bind:class="{ on: currentOrder=='reviewScore'}" >평점순</button></li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed :{
         ...mapGetters({
           totalCount  : 'rentcarCompanyList/totalCount',
           currentOrder : 'rentcarCompanyList/currentOrder'
        })
    },
    methods : {
        setOrder(value){
            this.$store.commit('rentcarCompanyList/setOrderKey',value);
        }
    }
}
</script>

<style>

</style>
