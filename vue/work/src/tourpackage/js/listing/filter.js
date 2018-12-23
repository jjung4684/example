

export default {
    init(resData, payload) { 

        var filterTypes = Object.keys(resData);
        var resultData = {};
        
        filterTypes.map(function(type){

            var selectedFilterKeys = [];    

            if(type == 'price') {
                     
                resultData[type] = resData[type];
                return ;
            }

            var items = Object.keys(resData[type]).map(function(key) {
                return resData[type][key];
            });

            if(payload.hasOwnProperty(type)){
                selectedFilterKeys = payload[type].split('@')
            } 

            items.sort((a,b) => a.order - b.order);
            var resultItems = items.map(function(data){

                var obj = {
                    key : data.id,
                    name : data.name,
                    type : type,
                    isActive : (selectedFilterKeys.length == 0 && data.id == "-1")
                }

                if(data.id !== "-1" && selectedFilterKeys.length > 0){
                    var findIndex = selectedFilterKeys.findIndex(a => a == data.id);
                    if(findIndex > -1){
                        obj.isActive = true;
                    }
                }

                return obj;
            })
            resultData[type] = resultItems;
        
        });

        return resultData;

    },
    getFilterSearchInfo(filterObj){

        var keys =  Object.keys(filterObj);

        var selectedTag = [];
        var selectedObj = {};

        keys.map(function(key){

            var selectedKeys = filterObj[key].data.reduce((acc, cur) => {
                if(cur.key != "-1" && cur.isActive){ 
                selectedTag.push(cur); acc.push(cur.key); } 
                return acc;
            },[]); 
        
            if(selectedKeys.length > 0){
                selectedObj[key] = selectedKeys.join("@");
            }
        });

        return {
            tags : selectedTag,
            keys : selectedObj
        };
    },
    getPriceSearchInfo(filterObj, priceInfo){

        if(priceInfo.minPrice == priceInfo.curMinValue && priceInfo.maxPrice == priceInfo.curMaxValue){
            return filterObj;
        }

        filterObj.keys.minPrice = priceInfo.curMinValue;
        filterObj.keys.maxPrice = priceInfo.curMaxValue;
        filterObj.tags.push({ key : priceInfo.curMinValue + "@" + priceInfo.curMaxValue,
                             name : priceInfo.curMinValue +"원~" + priceInfo.curMaxValue + "원", 
                             type : 'price' })

        return filterObj;

    },
    createPriceObj(defaultPrice, updatePrice, selectedParams){

        if(updatePrice.hasOwnProperty('minPrice') && updatePrice.hasOwnProperty('maxPrice')){

            let priceObj = Object.assign({},defaultPrice,updatePrice);
            priceObj.curMaxValue = (selectedParams.hasOwnProperty('maxPrice'))? selectedParams.maxPrice : priceObj.maxPrice;
            priceObj.curMinValue = (selectedParams.hasOwnProperty('minPrice'))? selectedParams.minPrice  : priceObj.minPrice;
            return priceObj
        }

        return defaultPrice;

    }
}
