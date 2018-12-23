<template>
    <div v-show="filterTagList.length && !isLoading" class="path_tag_scroll_horizontal" id="scrollTagList" @click="openFilterLayer">
        <ul class="tag_list">
            <li v-for="(item, index) in filterTagList" :key="index">
                <em>{{item.name}} </em>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import eventBus from '../../event-bus.js';

export default {
    computed : {
         ...mapGetters({
            isLoading : 'tourpackageList/isLoading',
            filterTagList : 'tourpackageList/filterTagList'
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
        initScrollTag(){
            this.tagZone = new IScroll('#scrollTagList', {
                scrollX: true,
                click: true
            });
        },
        openFilterLayer(){
            eventBus.$emit('openFilterLayer');
        }
    }

}
</script>

<style>

</style>
