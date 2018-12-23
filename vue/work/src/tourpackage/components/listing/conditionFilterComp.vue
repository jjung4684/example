<template>
   <div v-if="filterData.isOpen" class="filter_contents_wrap" id='filter_contents_detail_wrap' style='display:block;'>
        <div class="filter_contents" id='filter_contents_detail' ref='filterContentsDetail' style='background:#fff;'><!-- iscroll -->
            <div class="filter_isc">

                <filterbox-comp v-for="filterInfoData in filterInfo" :key="filterInfoData.key"  :filterData="filterInfoData" @interface="getFilterSearchCount"></filterbox-comp>

                <div class="detail_filter_box cost_range" ref="linearGraphWrap">
                    <h2 class="filter_tit">가격<span class="linear_graph_text"><em class="min_price">82,000원</em>~<em class="max_price">426,000원</em></span><span>(세금포함)</span></h2>
                    <div class="linear_graph_wrap">
                        <div class="linear_graph">
                            <span class="linear_bar"></span>
                            <span class="min"></span>
                            <span class="max"></span>
                            <p class="min_price">최저 {{priceInfo.minPrice | comma}}원</p>
                            <p class="max_price">최고 {{priceInfo.maxPrice | comma}}원</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn_filter_set">
            <button type="button" class="reset" @click="clearFilter">초기화</button>
            <button type="button" class="apply" @click="goSearch"><span v-if="searchCount !== null">총 {{searchCount}}개의</span> <i>결과보기</i></button>
            <button type="button" class="closeCont" @click="closeLayer">닫기</button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import filterBoxComp from '../../../common/components/filterBoxComp.vue'
import filterService from '../../js/listing/filter.js';
import '../../../common/lib/range_slider.js'

export default {
    computed : {
            ...mapGetters({
                searchCount : 'tourpackageList/filterSearchCount',
                filterTagList : 'tourpackageList/filterTagList',
                filterSearchParam : 'tourpackageList/filterSearchParam'
            })
    },
    data(){

        return {
            filterInfo : {
                tourType : {
                    title : '여행상품타입',
                    data : []
                },
                duration : {
                    title : '여행기간',
                    data : []
                },
                agency : {
                    title : '여행사',
                    data : []
                },
                departureTime : {
                    title : '출발시간',
                    data : []
                },
                airline : {
                    title : '이용항공권',
                    data : []
                },
                shopping : {
                    title : '쇼핑횟수',
                    data : []
                },
                reservationType : {
                    title : '예약상태',
                    data : []
                }
            },
            priceInfo : {
                minPrice : 0,
                maxPrice : 500000,
                curMinValue : 0,
                curMaxValue : 500000
            },
            copyInfo : null
        }
    },
    props : {
        filterData : {
            type : Object,
            default(){
                return {}
            }
        }
    },
    components : {
        'filterbox-comp' : filterBoxComp
    },
    created(){
       this.init();
    },
    methods : {
        init(){
            var that = this;

            this.$store.dispatch('tourpackageList/getFilter').then(function(res){
                var filterInfo = filterService.init(res.data, that.filterSearchParam);

                var filterKeys = Object.keys(filterInfo);
                filterKeys.map(function(key){
                    if('price' == key) {
                        that.priceInfo = filterService.createPriceObj(that.priceInfo,filterInfo[key],that.filterSearchParam);
                    }else{
                        if(typeof that.filterInfo[key] !== 'undefined') that.filterInfo[key].data = filterInfo[key] ;
                    } 
                });

                that.setFilterInfoState({filterInfo : that.filterInfo, priceInfo:  that.priceInfo});

                //that.getFilterSearchCount();

            });
            
        },
        setFilterInfoState(value){
            this.copyInfo = JSON.parse(JSON.stringify(value));
        },
        goSearch(){
            
            var selectedFilterInfo = filterService.getFilterSearchInfo(this.filterInfo);
            selectedFilterInfo = filterService.getPriceSearchInfo(selectedFilterInfo, this.priceInfo);

            let query = {
                optionParam : selectedFilterInfo.keys,
                pageNum : 1
            }

            this.$store.commit('tourpackageList/setFilterTagList',selectedFilterInfo.tags);
            this.$store.commit('tourpackageList/setSearchQuery',query);
            
            this.setFilterInfoState({filterInfo : this.filterInfo, priceInfo:  this.priceInfo});

            this.$store.dispatch('tourpackageList/getApackageList', {loadRegionInfo : false});
            

            //this.$router.replace({ path:'/list',query: this.$store.getters['tourpackageList/searchQueryString']});

            this.closeLayer();
            
        },
        getFilterSearchCount (payload){
            

            if(typeof payload !== "undefined" && payload.data.length > 0){
                let data = payload.data;
                let type = data[0].type;
                this.filterInfo[type].data = data;
            }
    
            var selectedFilterInfo = filterService.getFilterSearchInfo(this.filterInfo);
            selectedFilterInfo = filterService.getPriceSearchInfo(selectedFilterInfo, this.priceInfo);
            this.$store.dispatch('tourpackageList/getFilterSearchCount',selectedFilterInfo.keys);
       
        },
        closeLayer(){
            this.filterData.isOpen = false;
            skpui.dimmedLayer.hide();
        },
        clearFilter(){

            var that = this;

            var keys = Object.keys(this.filterInfo);

            keys.map(function(key){
                that.filterInfo[key].data.map(function(item){
                    item.isActive = (item.key == "-1");
                })

            })

            this.priceSlider.resetSlider();

            this.priceInfo.curMinValue = this.priceInfo.minPrice;
            this.priceInfo.curMaxValue = this.priceInfo.maxPrice;     

            this.getFilterSearchCount();

        },
        setSlider(opts) {
            this.priceSlider = new skp11.tour.rangeSlider(opts.rangeWrap, {
                minValue: opts.minValue,
                maxValue: opts.maxValue,
                curMinValue: opts.curMinValue,
                curMaxValue: opts.curMaxValue,
                onTouchEnd: opts.onTouchEnd
            });
            this.priceSlider.init();
        },
        updateCurrentPrice(price){

            if(price.hasOwnProperty('maxValue') && price.hasOwnProperty('minValue')){
                this.priceInfo.curMinValue = price.minValue;
                this.priceInfo.curMaxValue = price.maxValue;
                this.getFilterSearchCount();
            }
            
        }

    },
    filters : {
        comma(value) {
            if (typeof value === 'undefined') return;
            return Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    },
    watch : {
        'filterTagList' : function(tagList){

            if(tagList.length == 0){
                this.init();
            }
        },
        'filterData.isOpen' : function(isOpen){
            if(isOpen){

                this.$nextTick(function() {
                    

                    if( this.copyInfo !== null){
                        let copyInfo = this.copyInfo;
                        if(typeof copyInfo.filterInfo !== 'undefined'){
                            this.filterInfo = JSON.parse(JSON.stringify(copyInfo.filterInfo));
                        }
                        if(typeof copyInfo.priceInfo !== 'undefined'){
                            this.priceInfo = JSON.parse(JSON.stringify(copyInfo.priceInfo));
                        }
                    }  
                    
                    var defaultOptions = {
                        rangeWrap: this.$refs.linearGraphWrap,
                        minValue: this.priceInfo.minPrice,
                        maxValue: this.priceInfo.maxPrice,
                        curMinValue: this.priceInfo.curMinValue,
                        curMaxValue: this.priceInfo.curMaxValue,
                        onTouchEnd : this.updateCurrentPrice
                    }

                    this.setSlider(defaultOptions);


                    var iScrollOptions = {
                        preventDefaultException: {tagName: /.*/},
                        scrollbars: true,
                        fadeScrollbars: true,
                        mouseWheel: true,
                        tab: true
                    }; 

                    this.filterContentsIScroll = new IScroll(this.$refs.filterContentsDetail, iScrollOptions);

                    this.getFilterSearchCount();
                    
                });
                 
                
            }
        }
    }
}
</script>

<style>

</style>
