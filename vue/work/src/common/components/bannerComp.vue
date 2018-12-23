<template>
    <div class="tour_bnr" v-if="bannerData.lnkBnnrImgUrl" v-bind:style="{ backgroundColor:bannerData.extraText}">
        <a :href="bannerData.dispObjLnkUrl"><img :src="uplaodURL + bannerData.lnkBnnrImgUrl" :alt="bannerData.dispObjNm" ></a>
    </div>
</template>

<script>
import * as PATH from '../const.js';

export default {
    data(){
        return {
            uplaodURL : PATH.getUploadURL()
        }
    },
    props : {
        bannerData : {
            type : Object,
            default (){
                return {}
            }
        }
    }
}
</script>

<style>

</style>
