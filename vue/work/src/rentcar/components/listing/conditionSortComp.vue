<template>
   <div v-show="showSort" class="filter_contents_wrap rentcar" id='filter_contents_order_wrap' style="display:block">
        <div class="filter_contents" id='filter_contents_order'>
            <div class="filter_isc">
                <ul class="order_list_filter">
                    <li v-for="order in orderList" :key="order.key" v-bind:class="{ on: currentOrder.key == order.key}">
                        <a @click="goSorting(order)">{{order.name}}</a>
                    </li>
                    <!-- <li><a href="#">인기순</a></li> -->
                </ul>
            </div>
        </div>
        <button type="button" class="close_dimarea" @click="closeModal">닫기</button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as Utils from '../../utils/tour-list.js';

export default {
    computed : {
        ...mapGetters({
            showSort : 'showSort',
            currentOrder : 'currentOrder'
        })        
    },
    data(){

        var orderList = [
            {
                key : "LOW_PRICE",
                name : "최저가순"
            },
            {
                key : "SCORE",
                name : "인기순"
            }
        ];

        return {
            orderList : orderList
        }
    },
    methods : {
        goSorting(item){
            this.$store.commit('setCurrentOrder', item);
            this.$store.dispatch('fetchData');
            this.closeModal();
        },
        closeModal(){
            skpui.dimmedLayer.hide();
            this.$store.commit('closeSort');
        }
    },
    mounted(){
        this.tabScroll = Utils.scrolltoTab('#filter_contents_order');
    },
    updated(){
       // this.tabScroll.refresh();
    }

}
</script>

<style>

</style>
