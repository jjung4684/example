<template>
    <div class="detail_filter_box">
        <h2 class="filter_tit">{{filterInfo.title}}<span>(중복선택가능)</span></h2>
        <ul class="filter_choice_list">
             <li v-for="(item, key) in filterInfo.data" :key="key">
                <button type="button" :class="{on: item.isActive}" @click="toggleActive(item)" >{{item.name}}</button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return {
            filterInfo : {}
        }
    },
    props : {
        filterData : {
            type : Object,
            default (){
                return {}
            }
        }
    },
    beforeMount(){
        this.filterInfo = this.filterData
    },
    methods : {
        toggleActive(item){

            if(item.key == "-1"  && item.isActive) return;
           
            item.isActive = !item.isActive;

            if(item.key == "-1"){ //전체선택인 경우
                this.filterInfo.data.map(obj => obj.isActive = (obj.key == "-1"));
            }else{
                var selectedOptions = this.filterInfo.data.filter(function(obj){
                    return (obj.key !== "-1" && obj.isActive);
                });

                //전체 선택
                this.filterInfo.data[0].isActive = (selectedOptions.length == 0);
            }
            

            this.$emit('interface', this.filterInfo);

        }
    },
    watch : {
        'filterData': function (obj){
            this.filterInfo = obj;
        }
    }

}
</script>

<style>

</style>
