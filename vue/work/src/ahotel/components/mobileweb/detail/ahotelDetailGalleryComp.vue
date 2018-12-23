<template>
     <div class="dtl_thumb" onclick="openImagePopup()">
        <div class="zone_image swiper-container" id="imageSwiper">
            <ul v-if="images.length > 0" class="swiper-wrapper" id="ulGallery">
                <li class='swiper-slide' v-for="(item , index) in images" :key="index">
                    <a href="#">          
                        <img class="swiper-lazy" :data-src="item.medium_data" alt="" onerror="this.src='http://m.11st.co.kr/MW/img/tour/listing/img_noimg_list.png'">
                    </a>
                </li>
            </ul>
            <ul v-if="images.length == 0" class="swiper-wrapper">
                <li class='swiper-slide' >
                    <a href="#">          
                        <img src="http://m.11st.co.kr/MW/img/tour/listing/img_noimg_list.png" alt="" >
                    </a>
                </li>
            </ul>
            <div class="page" v-if="images.length > 1">
                <span class="rpc_paginate swiper-pagination page"></span>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        var imageList = (Array.isArray(ahotelDetailImages)) ? ahotelDetailImages : [];
        return {
            images : imageList
        }
    },
    mounted(){

        this.initSwiper();
     
    },
    updated() {

        this.initSwiper();

    },
    methods : {
        initSwiper(){

            if(this.images < 2) return ;

            this.imageSwiper = new Swiper("#imageSwiper", {
                lazy : {
                    loadPrevNext : true,
                    loadPrevNextAmount : 1
                },
                pagination: {
                    el: '.rpc_paginate',
                    type: 'fraction'
                }
            });
           
        }
    }
}
</script>       

<style>

</style>