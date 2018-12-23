<template>
    <div v-show="showFilter" class="filter_contents_wrap" id='filter_contents_detail_wrap' style="display:block">
        <div class="filter_contents filter_contents_overflow_init" id='filter_contents_detail' style='background:#fff;'>
            <div class="filter_isc" id="filter_scroller">
                <div class="detail_filter_box">
                    <h2 class="filter_tit">제조사<span>(중복선택가능)</span></h2>
                    <ul class="filter_choice_list" >
                        <li v-for="(item, key) in filterInfo.vendor" :key="key">
                            <button type="button" :class="{on: item.isActive}" @click="toggleActive(item)" >{{item.name}}</button>
                        </li>
                    </ul>
                </div>

                <div class="detail_filter_box">
                    <h2 class="filter_tit">연료<span>(중복선택가능)</span></h2>
                    <ul class="filter_choice_list">
                        <li v-for="(item, key) in filterInfo.fuel" :key="key">
                            <button type="button" :class="{on: item.isActive}" @click="toggleActive(item)" >{{item.name}}</button>
                        </li>
                    </ul>
                </div>

                <div class="detail_filter_box">
                    <h2 class="filter_tit">정원<span>(중복선택가능)</span></h2>
                    <ul class="filter_choice_list">
                         <li v-for="(item, key) in filterInfo.capacity" :key="key">
                            <button type="button" :class="{on: item.isActive}" @click="toggleActive(item)" >{{item.name}}</button>
                        </li>
                    </ul>
                </div>

                <div class="detail_filter_box">
                    <h2 class="filter_tit">자동차 모델 검색</h2>
                    <div class="result_research">
                        <input type="text" v-focus="focused" @focus="focused = true" @blur="focused = false" v-model="keyword" name="" value="">
                        <button type="submit" class="mbtn gy" @click="applySearchKeyword" >검색</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="btn_filter_set">
            <button type="button" class="reset" @click="clearFilter">초기화</button>
            <button type="button" class="apply" @click="applySearch"><i>결과보기</i></button>
            <button type="button" class="closeCont" @click="closeModal">닫기</button>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';
import * as Utils from '../../utils/tour-list.js';
import filterService from '../../utils/filter.js';

export default {
    data(){

        return {
            filterInfo : {},
            keyword : "",
            focused : false
        }
    },
    created(){

        var that = this;

        filterService.getFilter().then(function(res){
            if(res.status == 200){
               
                that.filterInfo = filterService.init(res.data);
              
                //queryString에 filter data가 있는 경우 초기값 setting
                var filterQueryStr = that.filterQueryString;
                var Keys = Object.keys(filterQueryStr);
                var tagList = [];
                
                Keys.map(function(key){

                    if(key == 'keyword'){
                        
                        that.keyword = filterQueryStr[key];

                    }else{

                        if(filterQueryStr[key].length > 0){

                            var activeKeys = filterQueryStr[key].split("@");
        
                            that.$store.commit('setFilterApplyInfo', { type : key, keys : activeKeys});
                            
                            activeKeys.map(function(attrKey){
                                var findIndex = that.filterInfo[key].findIndex( v => v.key == attrKey);
                                if(findIndex > -1){
                                    var filterData = that.filterInfo[key][findIndex];
                                    tagList.push(filterData);
                                }      

                            });

                        }

                    }
                    
                });

                that.setKeywordStore(tagList);
              
                
            }
        }).catch(function(err){

        });

    },
    computed : {
        ...mapGetters({
            showFilter : 'showFilter',
            filterTagList : 'filterTagList',
            applyFilterInfo : 'applyFilterInfo',
            filterQueryString : 'filterQueryString'
        })        
    },
    methods : {
        init(){

        },
        closeModal(){
            skpui.dimmedLayer.hide();
            this.$store.commit('closeFilter');
        },
        toggleActive(item) {
           
            if(item.key == 0  && item.isActive) return;
           
            item.isActive = !item.isActive;

            if(item.key == 0){ //전체선택인 경우
                this.filterInfo[item.type].map(obj => obj.isActive = (obj.key == "0"));
            }else{
                var selectedOptions = this.filterInfo[item.type].filter(function(obj){
                    return (obj.key !== "0" && obj.isActive);
                });

                //전체 선택
                this.filterInfo[item.type][0].isActive = (selectedOptions.length == 0);
            }
           
        },
        setKeywordStore(filterTagList){

             //키워드 검색
            var keyword =  this.keyword.trim();
            
            if(keyword.length > 0){

                if(filterTagList.length > 0){
                    var findIndex = filterTagList.findIndex( v => v.type == 'keyword');
                    if(findIndex > -1){
                        filterTagList.splice(findIndex,1);
                    }    
                }

                var obj = {
                    type : 'keyword',
                    name : this.keyword
                }
                filterTagList.push(obj);               
        
                this.$store.commit('setFilterKeyword', this.keyword);
               
            }

            this.$store.commit('setFilterTagList', filterTagList);

        },
        applySearchKeyword(){
            this.closeModal();
            this.setKeywordStore(this.filterTagList);
            this.$store.dispatch('applySearch');
        },
        applySearch(){

            this.closeModal();

            var that = this;

            var keys = Object.keys(this.filterInfo);
        
            var tagList = [];
        
            //속성 검색
            keys.map(function(key){

                var activeKeys = [];
 
                that.filterInfo[key].map(function(obj){
                    if(obj.key !== "0" && obj.isActive){
                        tagList.push(obj);
                        activeKeys.push(obj.key);
                    }
                });

                that.$store.commit('setFilterApplyInfo', { type : key, keys : activeKeys});

           });

           this.setKeywordStore(tagList);

           this.$store.dispatch('applySearch');
           
        },
        clearFilter(){

            var that = this;

            this.keyword = "";

            var keys = Object.keys(this.filterInfo);

            keys.map(function(key){
                that.filterInfo[key].map(function(item){
                    item.isActive = (item.key == "0");
                })
            })

        }
    },
    mounted(){
        this.tabScroll = Utils.scrolltoTab('#filter_contents_detail');

        /**
         * MPSR-30613 안드로이드 input 박스 포커스 추가
         */
        var $filterWrapper = $('#filter_contents_detail');
        var $filterScroller = $('#filter_scroller');
        var filterScrollHeight;
        
        if (/Android/.test(navigator.appVersion)) {
            window.addEventListener('resize', function () {
                if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
                    filterScrollHeight = $filterWrapper.height() - $filterScroller.height();
                    window.setTimeout(function(){
                        $filterScroller.css('transform', 'translate(0px, ' + filterScrollHeight + 'px)');
                    }, 0);
                }
            })
        } else if (/iPod|iPhone|iPad/.test(navigator.platform)) {
            $('#filter_contents_detail').removeClass('filter_contents_overflow_init');
        }

    },
    updated(){
        this.tabScroll.refresh();

    },
    watch : {
        showFilter (){
            var that = this;
            if(this.showFilter){
            
                this.clearFilter();
                
                var activeAttributesKeys = this.applyFilterInfo;
                var keys = Object.keys(activeAttributesKeys);
                keys.map(function(key){

                    if(key == "keyword") {
                       that.keyword = activeAttributesKeys[key];
                       return;
                    }
                    //전체선택
                    that.filterInfo[key][0].isActive = (activeAttributesKeys[key].length == 0);

                    activeAttributesKeys[key].map(function(obj){
                       
                        var findIndex = that.filterInfo[key].findIndex( v => v.key == obj);
                        if(findIndex > 0){
                            that.filterInfo[key][findIndex].isActive = true;
                        };

                    });     
                  
                });
                
            }
        },
        focused(){
            var tabScroll = this.tabScroll;
            if(!this.focused){
            }
        }
    },
    directives: {
        focus: {
            // 디렉티브 정의
            inserted: function (el) {
            el.focus()
        }
    }
}
}
</script>

<style>

</style>
