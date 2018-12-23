import axios from 'axios';

export const ahotelDetail = {
    namespaced: true,
    state : {
        hotelCode : "",
        images : []
    },
    getters : {
        getImages(state){
            return state.images;
        }
    },
    mutations : {
        setHotelCode (state, hotelCode){
            state.hotelCode = hotelCode;
        },
        setImages(state, imageList){
            state.images = imageList;
        }
    },
    actions : {
        fetchImages({state}){

            var url = "http://tour.m.11st.co.kr/MW/Tour/ahotel/hotel/"+state.hotelCode+"/gallery";
            axios.get(url,{
                headers: {
                'Access-Control-Allow-Origin': '*',
                }
            }).then(function(res){
                if(res.status == 200){
                    state.images = res.data;
                }
            }).catch(function(e){
            })
        }
    }
}