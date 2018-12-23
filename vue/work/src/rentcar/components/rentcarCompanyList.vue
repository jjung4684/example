<template>
    <section id="cts" ref="containter">
        <carinfo-comp></carinfo-comp>
        <carsort-comp></carsort-comp>
        <carlist-comp></carlist-comp>
    </section>
</template>

<script>
import carinfoComp from './detail/carInfoComp';
import carSortComp from './detail/carSortComp';
import carDetailListComp from './detail/carDetailListComp';
import { mapGetters } from 'vuex';

export default {
    computed :{
         ...mapGetters({
           totalCount  : 'rentcarCompanyList/totalCount'
        })
    },
    created(){
         this.init();
         this.fetchData();
    },
    components : {
        'carinfo-comp' : carinfoComp,
        'carsort-comp' : carSortComp,
        'carlist-comp' : carDetailListComp
    },
    methods : {
        init(){
          this.$store.commit('rentcarCompanyList/setQuery',this.$route.query);
          this.$store.commit('rentcarCompanyList/setCarInfo');
        },
        fetchData(){
            this.$store.dispatch('rentcarCompanyList/fetchData');
        }
    },
    mounted(){

        this.$refs.containter.scrollTop = 0;
        new skpui.magnet('.car_condition', {useSticky: false, zIndex: 102});     

    },
    updated(){
        
    }
}
</script>

<style>

</style>
