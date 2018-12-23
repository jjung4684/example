<template>
  <section class="popularList" v-show="hotDealPrdShow">
    <h2 class="lst_tit">인기있는 쇼킹딜 상품!</h2>

    <div class="deal_lst_scroll" id="dealList">
       <ul class="deal_lst">
           <li :class="focus_id !== '' ?(focus_id === ctg.dispObjNo? 'on':''): (index == 0?'on':'')" v-for="(ctg, index) in hotDealPrdList" :key="index"><a href="javascript:" ><span>{{ctg.dispObjNm}}</span></a></li>
       </ul>
    </div>

    <div  v-for="(prd,index1) in hotDealPrdList" :key="index1" data-type="ProductDeal_Shocking">
      <ul class="deal_cont">
         <li v-for="(item,index) in prd.tourProducts" :key="index">
             <a :href="item.prdDetailLink+'&dprtBgnDy='+item.departureDate" class="deal_item">
                 <span class="thumb"><span class="thumb_inr"><v-lazy-image :src="item.baseImgUrl" alt="" onerror="javascript:this.src='http://m.11st.co.kr/MW/img/tour/product/no_image_720x360.png';"/></span></span>
                 <div class="info">
                     <span class="name">{{item.prdNm}}</span>
                     <span class="rate" v-if="item.scheduleDiscount > 0"><strong>{{item.scheduleDiscount}}</strong>%</span>
                     <div class="price">
                         <strong>{{item.scheduleFinalDscPrc | moneyComma}}</strong>원~
                         <del v-if="item.scheduleDiscount > 0" >{{item.scheduleSelPrc | moneyComma}}원</del>
                     </div>
                      <div class="start">{{item.departureDate|dateComma}} {{item.dealPrdYn =='Y'?'':item.scheduleDepartureTime}} 출발</div>
                     <span class="qty" v-if="item.buyerCntTot > 0">{{item.buyerCntTot |moneyComma}}개 구매</span>
                 </div>
             </a>
             <div class="addition">
                 <a :href="item.prdDetailLink+'&dprtBgnDy='+item.departureDate" class="addition_link">
                     <dl class="addition_desc1">
                         <dt><span>{{item.sellerNm}}</span></dt>
                         <dd>{{item.advrtStmt}}</dd>
                     </dl>
                     <span class="benefit_ico" v-show="item.tmemIconYN =='Y' || item.ocbSaveRt > 0 || item.cardIconYN =='Y'">
                         <em class="ico_t" v-show="item.tmemIconYN =='Y'">SKT멤버스</em>
                         <em class="ico_ok" v-show="item.ocbSaveRt > 0">OK캐쉬백</em>
                         <em class="coupon" v-show="item.cardIconYN =='Y'"> {{isApp? item.cardDscRt11stApp:item.cardDscRtMobile}}%</em>
                     </span>
                 </a>
             </div>
         </li>
      </ul>
      <div class="deal_more">
          <a href="javascript:" class="go_link" @click="goList(prd.extraText,prd.dispObjNm)"><span class="link_txt"><strong>{{prd.dispObjNm}}</strong> HOT DEAL! 더보기</span></a>
      </div>
    </div>
  </section>
</template>
<script src="../.././js/main/showkingDealPrd.js"/>
