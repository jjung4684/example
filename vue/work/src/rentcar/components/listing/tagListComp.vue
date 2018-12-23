<template>
    <div v-show="filterTagList.length && !isLoading" class="tag_scroll rent" id="scrollTagList">
        <ul class="tag_list">
            <li v-for="(item, index) in filterTagList" :key="index">
                <span>{{item.name}} <a @click="removeItem(index, item)">선택 삭제</a></span>
            </li>
        </ul>
        <a class="btn_reset" @click="clearItem">({{filterTagList.length}})<span>초기화</span></a>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed : {
         ...mapGetters({
            isLoading : 'isLoading',
            filterTagList : 'filterTagList',
            applyFilterInfo : 'applyFilterInfo'
        })
    },
    mounted(){
        this.init();
    },
    updated(){
        this.tagZone.refresh();
    },
    methods : {
        init(){
            this.initScrollTag();
        },
        removeItem(index, item){
            this.filterTagList.splice(index, 1);

            if(item.type == 'keyword'){
                this.applyFilterInfo.keyword = "";
            }else{
                var findIndex = this.applyFilterInfo[item.type].findIndex( v => v == item.key);
                if(findIndex > -1){
                    this.applyFilterInfo[item.type].splice(findIndex,1);
                };
            }
            this.$store.dispatch('applySearch');  
        },
        clearItem(){
            this.$store.commit('clearfilterTagList');
            this.$store.dispatch('applySearch');  
        },
        initScrollTag(){
            this.tagZone = new IScroll('#scrollTagList', {
                scrollX: true,
                click: true
            });
        }
    }

}
</script>

<style>

</style>
