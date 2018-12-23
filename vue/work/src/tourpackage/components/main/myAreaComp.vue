<template>
  <div class="bx_wrap" v-show="currentShow || likePrdShow">
        <div class="bx_tit" v-show="currentShow">
           <h2>최근 검색일정
           <!-- <a href="javascript:" class="help">도움말</a> -->
           </h2>
        </div>

        <div class="sch_tag_scroll" id="scheduleList" v-show="currentShow">
           <ul>
               <li :class="index == 0 ? 'on':''" v-for="(item, index) in currentSearch" :key="index">
                <!-- <li class="on"><span>다낭, 09.30. <em class="del">삭제</em></span></li> -->
                <span>
                <a href="javascript:" @click="setArrive({city : item.city,code: item.code, startDate: item.startDate, endDate:item.endDate})">
                  {{item.city}}{{item.startDate !==''?', ':''}}{{item.startDate | dateComma}}{{item.startDate !==''?'.':''}}{{item.endDate !== ''? '~':''}}{{item.endDate | dateComma}}{{item.endDate !== '' ? '.':''}}
                </a>
                <em class="del" @click="deleteStorage(item.code, item.city,item.startDate)">삭제</em></span>
               </li>
           </ul>
        </div>

        <div class="bx_tit" v-show="likePrdShow">
           <h2>찜해놓은 여행</h2>
          <!--  <a href="http://m.11st.co.kr/MW/MyPage/V1/interestList.tmall" class="more">찜 전체보기</a> -->
        </div>

        <div id="prdList_wish" class="wrap_flick_prd wrap_flick_scroll" v-show="likePrdShow"><!-- iscroll -->
           <ul class="prd_lst">
               <li v-for="(item,index) in likeProductList" :key="index">
                   <a :href="item.prdDetailLink+'&dprtBgnDy='+item.departureDate">
                       <span class="thumb">
                           <span class="flag" v-if="item.flagName">{{item.flagName}}</span>
                           <v-lazy-image :src="item.baseImgUrl" alt onerror="javascript:this.src='http://m.11st.co.kr/MW/img/tour/product/no_image_360x360.png';"/>
                       </span>
                       <div class="info">
                           <span class="name">{{item.prdNm}}</span>
                           <div class="price">
                               <span class="prc"><b>{{item.scheduleFinalDscPrc | moneyComma}}</b>원~</span>
                           </div>
                           <span class="start" v-if="item.departureDate">{{item.departureDate|dateComma}}. {{item.dealPrdYn =='Y'?'':item.scheduleDepartureTime}} 출발</span>
                       </div>
                   </a>
               </li>
               <li v-if="likeProductList.length ==1"><span class="empty">찜한 상품이<br>보여집니다.</span></li>
           </ul>
        </div>
   </div>
 </template>

 <script src="../.././js/main/myArea.js"/>
