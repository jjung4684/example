

export default {

    updateHotels(originList, updateList){

        if (Object.keys(updateList).length == 0) return originList;

        Object.keys(updateList).forEach(function (vkey) {

            if (!updateList.hasOwnProperty(vkey) || updateList[vkey].length === 0) return;

            var index = originList.findIndex(function (r) {
                return r.hotel_id == vkey;
            });

            if (index > -1) {
                originList[index].rateList = updateList[vkey];
            }
        });

        originList.splice();
    },
    updateReview(originList, updateList){

        if (Object.keys(updateList).length == 0) return originList;
        
        Object.keys(updateList).forEach(function (vkey) {

            if (!updateList.hasOwnProperty(vkey) || updateList[vkey].length === 0) return;
            
            var index = originList.findIndex(function (r) {
                return r.hotel_id == vkey;
            });

            if (index > -1) {

                if (!originList[index].hasOwnProperty("review_score")) {
                    originList[index] = Object.assign({}, originList[index], { review_score: {} });
                }

                if (!originList[index]["review_score"].hasOwnProperty("review")) {
                    originList[index]["review_score"] = Object.assign({}, originList[index]["review_score"], { review: updateList[vkey].review });
                }

                // if(originList[index].hasOwnProperty('review_score')){
                //     originList[index].review_score = updateList[vkey];
                // }else{
                //     originList[index] = Object.assign({},originList[index],{
                //         review_score : updateList[vkey]
                //     })
                // }
            }
            
        });

        originList.splice();

    }
}