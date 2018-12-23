<template>
  <modal name="departureModal"  :pivotY="0" @opened="desModalScroll"  @before-open="beforeOpen" >
    <div id="layer_search" class="keylst" style="display:block;height:100%">
       <div class="search_input_typing">
           <h2 style="font-size: 12px">출발지</h2>
           <ul class="typing_list">
               <li v-for="(dpt,index) in departureCityList" :key="index">
                  <a href="javascript:" @click="selectDepartureCity(dpt.attributeCode,dpt.name)"  v-if="dpt.attributeCode == selectCity">
                     <strong>{{dpt.name}}</strong>
                  </a>
                  <a href="javascript:" @click="selectDepartureCity(dpt.attributeCode,dpt.name)" v-else>
                    {{dpt.name}}
                  </a>
                </li>
           </ul>
       </div>
    </div>
  </modal>
</template>

<script src="../.././js/modal/departureSearch.js"/>
