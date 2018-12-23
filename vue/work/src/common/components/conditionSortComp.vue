<template>
     <div v-if="orderData.isOpen" class="filter_contents_wrap rentcar" id='filter_contents_order_wrap' style='display:block;'>
        <div class="filter_contents" id='filter_contents_order'>
            <div class="filter_isc">
                <ul class="order_list_filter">
                        <li v-for="order in orderData.data" :key="order.key" v-bind:class="{ on: currentOrderData.key == order.key}">
                        <a @click="goSorting(order)">{{order.name}}</a>
                    </li>
                </ul>
            </div>
        </div>
        <button type="button" class="close_dimarea" @click="closeSortLayer">닫기</button>
    </div>
</template>

<script>

export default {
    props : {
        orderData : {
            type : Object,
            default(){
                return {}
            }
        },
        currentOrderData : {
            type : Object,
            default() {
                return {}
            }
        }
    },
    methods : {
        closeSortLayer(){
           this.orderData.isOpen= false;
           skpui.dimmedLayer.hide();
        },
        goSorting(item){

            this.$emit('interface', item);
            this.closeSortLayer();

        }
    }

}
</script>

<style>

</style>
