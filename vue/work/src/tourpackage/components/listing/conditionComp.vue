<template>
   <div class="detailed_condition_filter"  v-bind:class="{ fixed: orderInfo.isOpen || filterInfo.isOpen}">
        <ul class="sort_type" :class="{no_scroll_openfilter: orderInfo.isOpen || filterInfo.isOpen}" id="sort_type_magnet_tab">
            <li class="price_order" :class="{on: orderInfo.isOpen}"><a @click="openSort" data-cont="filter_contents_order_wrap">{{currentOrder.name}}</a></li>
            <li class="detail_filter" :class="{on: filterInfo.isOpen}"><a @click="openFilter" data-cont="#filter_contents_detail_wrap">상세조건</a></li>
        </ul>
        <sort-comp :orderData="orderInfo" :currentOrderData="currentOrder"  @interface="handleSort"></sort-comp>
        <filter-comp :filterData="filterInfo"></filter-comp>
   </div>
</template>

<script>
import filterComp from './conditionFilterComp.vue';
import sortComp from '../../../common/components/conditionSortComp.vue';
import eventBus from '../../event-bus.js';
import { mapGetters } from 'vuex';

export default {
    computed : {
        ...mapGetters({
            currentOrder : 'tourpackageList/currentOrder',
        })
    },
    data (){

        var orderList = [
            {
                key : "POP_SCORE",
                name : "인기순"
            },{
                key : "LOW_PRICE",
                name : "낮은가격순"
            },{
                key : "HIGH_PRICE",
                name : "높은가격순"
            },{
                key : "REVIEW_CNT",
                name : "후기많은순"
            },{
                key : "LIKE_CNT",
                name : "좋아요순"
            },
        ];

        return {
            orderInfo : {
                isOpen : false,
                data : orderList
            },
            filterInfo : {
                isOpen : false,
                data : []
            }
        }
    },
    created(){
        eventBus.$on('openFilterLayer',this.openFilter); 
        
    }, 
    mounted(){
        var filterTabMagnet = new skpui.magnet('.detailed_condition_filter', {useSticky: false, zIndex: 102});
    },
    destroyed(){
        skpui.dimmedLayer.hide();
    },
    components : {
        'filter-comp' :  filterComp,
        'sort-comp' : sortComp
    },
    methods : {
        openSort(){
            this.orderInfo.isOpen = true;
            this.filterInfo.isOpen = false;
            skpui.dimmedLayer.show();
        },
        openFilter(){
            this.filterInfo.isOpen = true;
            this.orderInfo.isOpen = false;
            skpui.dimmedLayer.show();
        },
        handleSort(data){

            let query = {
                currentOrder : data,
                pageNum : 1
            }

            this.$store.commit('tourpackageList/setSearchQuery',query);
            this.$router.replace({ name:'list',query: this.$store.getters['tourpackageList/searchQueryString']});
        }
    }
    
}
</script>

<style>

</style>
