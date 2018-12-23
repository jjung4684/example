import axios from 'axios';
import * as Util from '../../utils/tour-list.js';
import { getImgDomain } from '../../utils/const.js';
import _ from 'lodash';
import qs from 'qs';

export const rentcarCompanyList = {
    namespaced: true,
    state : {
        carinfo : {
            productName : "",
            fuelName : "",
            gradeName: "",
            capacity : 0,
            insuranceType : "",
            hours : "",
            imgPath : ""
        },
        carinfoList : [],
        totalCount : 0,
        isLoading : false,
        query : {},
        currentOrder : {
            key : "sellPrice", ///최저가 : sellPrice , 평점 : reviewScore
        }
    },
    getters : {
        totalCount(state){
            return state.carinfoList.length;
        },
        carinfoList(state){
        
            var orderKey =  (state.currentOrder.key == "sellPrice") ? 'asc' : 'desc';
            return _.orderBy(state.carinfoList,state.currentOrder.key, orderKey);                
        },
        carinfo(state){
            return state.carinfo;
        },
        currentOrder(state){
            return state.currentOrder.key
        },
        query(state){
            return state.query;
        },
        isLoading(state){
            return state.isLoading;
        },
        isUnlimitedInsurance(state){
            return (state.carinfo.insuranceType == Util.insurTypeKeys.insurCodes2);
        }
    },
    mutations : {
        setCarInfo(state){

            var checkin = state.query.checkin;
            var checkinTime =  state.query.checkinTime;
            var checkinDate = Util.convertStringToDate(checkin,checkinTime);

            var checkout = state.query.checkout;
            var checkoutTime =  state.query.checkoutTime;
            var checkoutDate = Util.convertStringToDate(checkout,checkoutTime);

            var queryKeys = Object.keys(state.query);

            queryKeys.map(function(key){
                state.query[key] = decodeURIComponent(state.query[key]);
            });

            state.query.hours =  Math.abs(checkinDate - checkoutDate) / 36e5;

            state.carinfo = Object.assign({},state.carinfo,state.query);
        },
        setCarInfoList(state, value){
            state.carinfoList = value;
        },
        sortList(state, param){
            state.carinfoList
        },
        setQuery(state, value){
            state.query = value;
        },
        setOrderKey(state,value){
            state.currentOrder.key = value;
        },
        setCarImgPath(state, value){
            state.carinfo.imgPath = getImgDomain() + value;
        }
    },
    actions : {
        fetchData({commit, state}){

            state.isLoading = true;

            commit('setCarInfoList',[]);

            var url = "http://tour.m.11st.co.kr/MW/Tour/jeju/cardetaillist";
            
            axios.get(url,{
                params : {
                    checkin : state.query.checkin,
                    checkout : state.query.checkout,
                    checkinTime : state.query.checkinTime,
                    checkoutTime : state.query.checkoutTime,
                    //carCode : state.query.carCode,
                    insuranceType : state.query.insuranceType,
                    ctlgNo : state.query.ctlgNo,
                    pageSize : 1000
                },
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            }).then(function(res){

                if(res.status == 200){ 
                    // console.log("companyList call");
                    // console.log(res.data);

                    var carCompanyList = (res.data.totalCount > 0) ? res.data.carinfoList : [];
                    commit('setCarImgPath',res.data.imagePath);
                    commit('setCarInfoList',carCompanyList);
                }

            }).catch(function(err){
                // console.log(err);
            }).then(function(){
                state.isLoading = false;
            })

        },
        goDetailPage({state},productNo){

            var queryObj = {
                checkin : state.query.checkin,
                checkout : state.query.checkout,
                checkinTime : state.query.checkinTime,
                checkoutTime : state.query.checkoutTime,
                productNo : productNo
            }

            var queryString =  qs.stringify(queryObj);

            window.location.href = "http://tour.m.11st.co.kr/MW/Tour/jeju/rentcarDetail.tmall?mallType=tour&"+queryString;

        }
    }

}