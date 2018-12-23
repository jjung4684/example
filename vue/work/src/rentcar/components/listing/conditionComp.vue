<template>
   <div class="detailed_condition_filter"  v-bind:class="{ fixed: showSort || showFilter}">
        <ul class="sort_type" :class="{no_scroll_openfilter: showSort || showFilter}" id="sort_type_magnet_tab">
            <li class="price_order" :class="{on: showSort}"><a @click="openSort" data-cont="filter_contents_order_wrap">{{currentOrder.name}}</a></li>
            <li class="detail_filter" :class="{on: showFilter}"><a @click="openFilter" data-cont="#filter_contents_detail_wrap">상세조건</a></li>
        </ul>
        <sort-comp></sort-comp>
        <filter-comp></filter-comp>
   </div>
</template>

<script>
import filterComp from './conditionFilterComp.vue';
import sortComp from './conditionSortComp.vue';
import * as Utils from '../../utils/tour-list.js';
import { mapGetters } from 'vuex';

export default {
    computed : {
        ...mapGetters({
            showSort : 'showSort',
            showFilter : 'showFilter',
            currentOrder : 'currentOrder'
        }) 
    },   
    components : {
        'filter-comp' :  filterComp,
        'sort-comp' : sortComp
    },
    created () {
        
    },
    destroyed () {
    
    },
    mounted(){
        this.init();
    },
    updated(){
        if(this.showSort || this.showFilter){
            window.scrollTo(0,this.posTopVal);
        }
    },
    methods : {
        init(){
            var $detailConditionFilter = document.querySelector('.detailed_condition_filter');
            this.posTopVal = Utils.positionTop($detailConditionFilter);
        },
        openSort() {
            this.$store.commit('openSort');
            skpui.dimmedLayer.show();
        },
        openFilter() {
            this.$store.commit('openFilter');
            skpui.dimmedLayer.show();
        }
    }
}
</script>

<style>

</style>
