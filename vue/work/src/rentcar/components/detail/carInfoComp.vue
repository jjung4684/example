<template>
    <div class="set_result_wrap type2" v-bind:style="{backgroundSize: 'cover',backgroundImage: 'url(' +carinfo.imgPath + ')'}">
        <div class="car_condition" v-if="carinfo">
            <strong v-show="carinfo.productName">{{carinfo.productName}}</strong>
            <span class="option" v-if="carinfo.insuranceType" >{{carinfo.hours}}시간 기준, {{carinfo.insuranceType | insurTypeName}}</span>
            <span class="types" v-if="carinfo.gradeName" >{{carinfo.gradeName}} / {{carinfo.capacity}}인승 / {{carinfo.fuelName}}</span>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as Utils from '../../utils/tour-list';

export default {
    computed : {
        ...mapGetters({
           carinfo  : 'rentcarCompanyList/carinfo'
        })
    },
    filters : {
        insurTypeName (value){
            var insurTypeName = Utils.insurTypeCodes[value];
            return (typeof insurTypeName == "undefined") ? "" : insurTypeName;
        }
    },
    mounted(){

        
    },
    methods : {
       

    }
}
</script>

<style>

</style>
