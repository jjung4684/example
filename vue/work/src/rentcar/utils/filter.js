import axios from 'axios';


export default {
    getFilter(){
        var url = "http://tour.m.11st.co.kr/MW/Tour/jeju/filter";
        return axios.get(url,{
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        });
    },
    init(resData) { 

        var filterTypes = Object.keys(resData);
        var resultData = {};
        
        filterTypes.map(function(type){
            //sorting
            //var items = Object.values(resData[type]);

            var items = Object.keys(resData[type]).map(function(key) {
                return resData[type][key];
            });

            items.sort((a,b) => a.order - b.order);
            var resultItems = items.map(function(data){
                var obj = {
                    key : data.id,
                    name : data.name,
                    type : type,
                    isActive : (data.id == "0")
                }
                return obj;
            })
            resultData[type] = resultItems;
        
        });

        return resultData;

    },
    filterSelectedAttribute( filterObj ){

      var keys =  Object.keys(filterObj);

      var selectedItem = [];

      keys.map(function(key){
        filterObj[key].map(function(item){
            if(item.key > 0 && item.isActive){
                selectedItem.push(item);
            }
        })
      })

      return selectedItem;

    }
}
