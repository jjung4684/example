<template>
    <section id="cts">
        <quick-search></quick-search>
        <conditon-comp></conditon-comp>
        <taglist-comp></taglist-comp>
        <carlist-comp></carlist-comp>
        <quick-search-modal></quick-search-modal>
        <quick-search-calendar></quick-search-calendar>
    </section>
</template>

<script>
import quickSearchComp from './listing/quickSearchComp.vue'
import conditionComp from './listing/conditionComp.vue'
import tagListComp from './listing/tagListComp.vue'
import carListComp from './listing/carListComp.vue'
import quickSearchModalComp from './listing/quickSearchModalComp.vue'
import quickSearchCalendarComp from './listing/calendarComp.vue'

export default {
  created(){
     this.init(); 
     this.fetchData();
  },
  components : {
     'quick-search' : quickSearchComp,
     'conditon-comp' : conditionComp,
     'taglist-comp' : tagListComp,
     'carlist-comp' : carListComp,
     'quick-search-modal' : quickSearchModalComp,
     'quick-search-calendar' : quickSearchCalendarComp   
  },
  mounted(){
    var filterTabMagnet = new skpui.magnet('.detailed_condition_filter', {useSticky: false, zIndex: 102});
    
  },
  methods : {
    init(){
        this.$store.commit('setQuery', this.$route.query,{ module: 'rentcarList' });
        //this.$store.commit('setQuickSearchInfo',this.$route.query,{ module: 'rentcarList' });
    },
    fetchData(){
       this.$store.dispatch('fetchData');
    }
  }
}
</script>

<style>

</style>
