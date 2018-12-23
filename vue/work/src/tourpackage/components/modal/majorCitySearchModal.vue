<template>
    <modal name="majorCitySearchModal" @opened="modalScroll" @before-open="beforeOpen">
      <section class="lodge_search" id="modalLodgeSearch" style="display: block"> <!-- APP일경우를 구분해서 클래스 추가 해주세요 : lodgeSearchApp -->
        <div class="lodge_contents">
          <div class="lodge_search_wrap" >

             <div :class="lodgeSearchCss">
                 <input type="search" v-model="searcKeyword" @input="searchTyping" placeholder="여행도시, 명소" @click="inputCss('lodge_search_input focusin', 'C')">
                 <!-- <input type="hidden" id="searchKeyValue" value="">-->
                 <div class="search_option">
                     <button type="button" class="lodge_search_delete" @click="inputCss('lodge_search_input focusout', 'D')"><span>삭제</span></button>
                     <button type="submit" class="lodge_search_search" @click="search(searcKeyword)"><span>검색</span></button>
                 </div>
             </div>
          </div>

          <div class="lodge_kwd_wrap">
            <div class="lodge_kwd_sebox">

              <!-- 최근검색어 주요도시선택 -->
              <div class="majorcity_recent_search" v-show="majorcityShow" >
                 <h2>출발지</h2>
                 <ul class="recent_tag_list">
                    <li v-for="(dpt,index) in departureCityList" :key="index" v-if="dpt.attributeCode == departureCode"><a href="javascript:" >{{departureStr}}</a><button type="button" class="modify mbtn frd" id="btn_modify" @click="departureModalShow('departureModal')">변경</button></li>
                   <!-- <li v-for="(dpt,index) in departureCityList" :key="index" v-if="dpt.attributeCode !== departureCode"><a href="javascript:">{{dpt.name}}</a></li> -->
                 </ul>
                 <h2 v-show="majorCityListShow">여행지역</h2>
                 <ul class="major_country_list" v-show="majorCityListShow" >
                     <li :class="city.display?'on':''" v-for="(city,index) in majorCityList" :key="index">
                         <a class="country" href="javascript:" @click="majorCityshow(city.dispObjNo)">{{city.dispObjNm}}</a>
                         <div class="major_city_cont" v-show="city.display">
                             <ul class="major_cities">
                                 <li v-for="(item,index) in city.dpDispObjBOList" :key="index">
                                  <a href="javascript:" @click.prevent="selectArriveCity(item.extraText, item.dispObjNm)">{{item.dispObjNm}}</a>
                                 </li>
                             </ul>
                         </div>
                     </li>
                     <li><a class="country" href="#">일본</a></li>
                                                     <li><a class="country" href="#">중국</a></li>
                                                     <li><a class="country" href="#">아시아</a></li>
                                                     <li><a class="country" href="#">미주/중남미</a></li>
                                                     <li><a class="country" href="#">유럽</a></li>
                                                     <li><a class="country" href="#">대양주</a></li>
                                                     <li><a class="country" href="#">중동/아프리카</a></li>
                 </ul>
              </div>
              <!-- //최근검색어 주요도시선택 -->

              <!-- 자동 검색어 //-->
              <div  v-show="autoSearchShow">
                <div id="noneKwd" class="no_corre" style="display:block;" v-show="!autoCompleteShow">
                  <p class="none">일치하는 검색어가 없습니다.</p>
                </div>

                <div class="search_input_typing" v-show="autoCompleteShow">
                    <div v-if="autoCompleteSearchList.countrySize > 0">
                      <h2>지역 (도시/국가)</h2>
                      <ul class="typing_list" >
                         <li v-for="(item, index) in autoCompleteSearchList.countryList"  :key="index"><a href="javascript:" @click="selectArriveCity(item.cityCode,item.cityName,item.searchType)" v-html="item.searchWord"></a></li>
                      </ul>
                    </div>

                    <div v-if="autoCompleteSearchList.continentSize > 0">
                      <h2>대륙</h2>
                        <ul class="typing_list">
                           <li v-for="(item, index) in autoCompleteSearchList.continentList" :key="index"><a href="#" @click="selectArriveCity(item.continentCode, item.continentName,item.searchType)" v-html="item.searchWord"></a></li>
                        </ul>
                    </div>
                </div>
              </div>
              <!--// 자동 검색어 -->

            </div>
          </div>
         </div>
         <button type="button" class="close lodge-close" @click="hideModal('majorCitySearchModal')">닫기</button>
     </section>
     <!-- //lodge search  -->

     <!-- 출발지 변경시 검색 //-->
     <departure-search ></departure-search>
     <!-- 출발지 변경시 검색 //-->

 </modal>
</template>

<script src="../.././js/modal/majorCitySearch.js"/>
