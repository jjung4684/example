<template>
  <div>
      <!-- 퀵서치 //-->
      <qiuck-search></qiuck-search>
      <!--// 퀵서치 -->

      <!-- 최근 검색 일정  찜 해놓은 여행// -->
      <my-area></my-area>
      <!-- 최근 검색 일정  찜 해놓은 여행// -->

      <!-- 이달의 추천 여행지 //-->
      <recommend-prd></recommend-prd>
      <!--// 이달의 추천 여행지 -->

      <!-- 인기있는 쇼킹딜 상품//-->
      <showking-prd></showking-prd>
      <!--//인기있는 쇼킹딜 상품 -->


       <!-- 도착지 변경 // -->
       <search-modal></search-modal>
       <!-- //도착지 변경 -->

  </div>
</template>


<script>

import quick_search from './main/quickSearchComp.vue'
import my_area from './main/myAreaComp.vue'
import recommend_prd from './main/recommendPrdComp.vue'
import showking_prd from './main/showkingDealPrdComp.vue'
import search_modal from './modal/majorCitySearchModal.vue'

export default {
   components: {
      'qiuck-search': quick_search,
      'my-area' : my_area,
      'recommend-prd' : recommend_prd,
      'showking-prd' : showking_prd,
      'search-modal':search_modal
    },
    methods : {
        init: function init() {
            //패키지 메인 ajax 호출
            this.$store.dispatch('tourpackageMain/apackageMainAjax','Tour/apackage/main');
        }
    },
    created : function(){
        this.init();
    }
}

</script>

<style>

</style>
