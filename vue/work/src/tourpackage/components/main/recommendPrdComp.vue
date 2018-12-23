<template>
  <section class="special_prd" v-show="movieShow || recommendPrdShow || popularShow">

     <div class="special_tit" :style="movieObj.backImageStyle">
         <h2>이달의 추천 여행지 <strong>{{movieObj.name}}</strong></h2>
     </div>

     <div class="dtl_mov"  v-show="movieShow">
         <button type="button" class="view">동영상보기</button>
         <video id="detailvideo" width="100%" controlsList="nofullscreen nodownload" webkit-playsinline="" playsinline="" :poster="movieObj.movieImageUrl" :src="movieObj.movieUrl" ref="video/mp4"></video>
         <div class="origin">{{movieObj.supplier}}</div>
     </div>

     <div class="wrap_cont_area" v-show="recommendPrdShow">
         <div id="specialCont" class="cont_area swiper-container">
             <div class="pgwrap">
                 <div class="swiper-pagination"></div>
             </div>

             <ul class="txt_best swiper-wrapper" id="recommendSwiper">
                 <li class="swiper-slide" v-for="(item,index) in recommendPrd" :key="index">
                     <div class="innr_txt">
                         <div class="sub_tit">
                             <em>BEST PICK</em>
                             <strong v-html="item.name"></strong>
                         </div>
                         <p class="txts" v-html="item.description">
                         </p>
                     </div>
                     <div class="innr_pic"><img @load="imageLoaded" :src="item.imageurl"  alt></div>
                 </li>
             </ul>
         </div>
     </div>

     <div class="lst_tit" v-show="popularShow">{{movieObj.name}} 여행상품</div>
       <ul class="oversea_path_list" v-show="popularShow" >
           <li v-for ="(prd,index) in popularPrd" :key="index">
               <a :href="prd.prdDetailLink+'&dprtBgnDy='+prd.departureDate">
                   <span class="thumb"><v-lazy-image :src="prd.baseImgUrl" alt onerror="javascript:this.src='http://m.11st.co.kr/MW/img/tour/product/no_image_360x360.png';"/></span>
                   <div class="info">
                       <div class="title_area"><strong>{{prd.prdNm}}</strong></div>
                       <div class="price">
                           <span class="prc"><b>{{prd.scheduleFinalDscPrc | moneyComma}}</b>원~</span>
                       </div>
                       <div class="start" v-if="prd.departureDate">{{prd.departureDate|dateComma}} {{prd.dealPrdYn =='Y'?'':prd.scheduleDepartureTime}} 출발</div>
                   </div>
               </a>
           </li>
       </ul>
     <button type="button" class="path_prd_more" v-show="popularShow" @click="goList"><em>여행상품</em> 전체보기</button>
  </section>
</template>

<style>
video::-webkit-media-controls-fullscreen-button {
    display: none;
}

</style>
<script src="../.././js/main/recommendPrd.js"/>
