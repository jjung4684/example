<template>
    <div>
        <quick-search></quick-search>
        <banner-bar :bannerData="bannerInfoData" ></banner-bar>
        <condition-comp></condition-comp>
        <tag-comp></tag-comp>
        <apackage-list></apackage-list>
        <quick-search-modal></quick-search-modal>
    </div>
</template>

<script>
import quickSearchComp from './listing/quickSearchComp.vue'
import bannerComp from '../../common/components/bannerComp.vue'
import conditionComp from './listing/conditionComp.vue'
import tagComp from './listing/tagListComp.vue'
import apackageListComp from './listing/apackageListComp.vue'
import quickSearcModal from './modal/quickSearchModal.vue'

import { mapGetters } from 'vuex'
import isEmpty from 'lodash.isempty'

export default {
    computed : {
        ...mapGetters({
            bannerInfoData : 'tourpackageList/bannerInfo'
        })
    },
    components : {
        'quick-search' : quickSearchComp,
        'banner-bar' : bannerComp,
        'condition-comp' : conditionComp,
        'tag-comp' : tagComp,
        'apackage-list' : apackageListComp,
        'quick-search-modal' : quickSearcModal
    },
    methods : {
        init() {

            var apackageListStore = this.$localStorage.get('apackageListStore');
            if(apackageListStore){
                var localData =  JSON.parse(apackageListStore);
                if(localData.key == this.$route.fullPath){
                    if(localData.filterTagList.length > 0){
                        this.$store.commit('tourpackageList/setFilterTagList',localData.filterTagList);
                    }
                    if(!isEmpty(localData.currentOrder)){
                        this.$store.commit('tourpackageList/setCurrentOrder',localData.currentOrder);
                    }
                    this.$store.commit('tourpackageList/setTempProductList',localData.data);
                }else{
                    this.$store.commit('tourpackageList/setTempProductList',[]);
                }
            }

            this.$store.commit('tourpackageList/setParams',this.$route.query);
            this.$store.dispatch('tourpackageList/getApackageList');
           
        }
    },
    created(){
        this.init();
    },
    watch : {
        '$route' (to, from) {  
            if (from.fullPath !== to.fullPath) {
                this.init();
            }
        }
    }
}
</script>

<style>

</style>
