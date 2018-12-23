<template>
    <div class="dtl_thumb">
        <div class="zone_image" >
        <swiper :options="swiperOption" ref="gallerySwiper">
             <swiper-slide v-for="(item , index) in images" :key="index">
                 <li>
                 <a href="#">          
                    <img class="swiper-lazy" :data-src="item.medium_data" alt="" onerror="this.src='http://m.11st.co.kr/MW/img/tour/listing/img_noimg_list.png'">
                 </a>
                 </li>
             </swiper-slide>
         </swiper>
         <div class="page">
            <span class="rpc_paginate swiper-pagination page"  slot="pagination"></span>
         </div>   
        </div>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import axios from 'axios';
import { mapGetters } from 'vuex';

export default { 
    components: {
        swiper,
        swiperSlide
    },
    data(){
         return {
            swiperOption: {
                 pagination: {
                    el: '.swiper-pagination',
                    type: 'fraction'
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            // Enable lazy loading
               // lazyLoading: true
                // pagination: {
                //     el: '.rpc_paginate',
                //     type: 'fraction'
                // },
                // pagination: ".rpc_paginate",
                // paginationType: "fraction",
                // paginationCurrentClass: "pagination-current",
                // paginationTotalClass: "pagination-total"
            }
        }
    },
    computed : {
        swiper() {
            return this.$refs.gallerySwiper.swiper;
        },
        ...mapGetters({
            images : 'ahotelDetail/getImages',
        })
    },
    mounted(){
        
    },
    updated() {  
    }
}
</script>

<style>

</style>