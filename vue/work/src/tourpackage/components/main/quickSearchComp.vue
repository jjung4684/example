<template>
  <div class="quicksch">
     <div class="inner">
         <div class="selbox openerWrap">
             <a href="javascript:" class="calendarOpener" @click="openModal('D')">
                 <span class="tit">출발</span>
                 <span class="place" >{{departureStr}}</span>
             </a>
             <a href="javascript:" class="fr calendarOpener" @click="openModal('A')">
                 <span class="tit">도착</span>
                 <span :class="arriveStr == '도착지'? 'place empty': 'place'" >{{arriveStr}}</span>
             </a>
         </div>

         <div class="schedule">
             <a href="javascript:" @click="openCalendarModal" v-if="!departureDate && !arriveDate && !lowPrice">출발일 선택</a>
             <a href="javascript:" @click="openCalendarModal" v-if="departureDate && !arriveDate && !lowPrice">{{departureDate|dateFormat({type:'date'})}} 출발</a>
             <a href="javascript:" @click="openCalendarModal" v-if="departureDate && arriveDate && !lowPrice">{{departureDate|dateFormat({type:'date'})}} ~ {{arriveDate|dateFormat({type:'day', deptdate:departureDate})}} 출발</a>
             <a href="javascript:" @click="openCalendarModal" v-if="departureDate && lowPrice">{{departureDate|dateFormat({type:'date'})}} 출발 <span><b>{{lowPrice|moneyComma}}</b>원~</span></a>
         </div>

         <div class="btnwrap">
             <button type="button" class="bbtn" @click="goList()">검색</button>
         </div>
     </div>
     <calendar-modal @interface="setDates"></calendar-modal>
  </div>
</template>

<script src="../.././js/main/quickSearch.js"/>

