export default {
    orderHotels (items, currentOrderKey){
        switch (currentOrderKey) {
            case "best":
                // 인기순(인기 높은순)
                items.sort(function (a, b) {
                    if (a.tourSortIdx == b.tourSortIdx) {
                        return 0;
                    }
                    return a.tourSortIdx > b.tourSortIdx ? 1 : -1;
                });

                break;

            case 'pricelow':
                // 가격 낮은순
                items.sort(function (a, b) {

                    if (a.rateList[0].price == b.rateList[0].price) {
                        return 0;
                    }
                    return a.rateList[0].price > b.rateList[0].price ? 1 : -1;
                    
                });

                break;

            case 'pricehigh':
                // 가격 높은순
                items.sort(function (a, b) {
                    
                    if (a.rateList[0].price == b.rateList[0].price) {
                        return 0;
                    }
                    return b.rateList[0].price > a.rateList[0].price ? 1 : -1;

                });

                break;

            case 'starlow':
                // 성급 낮은순
                items.sort(function (a, b) {
                    if (a.allstay_hotel_type_id == '1' && b.allstay_hotel_type_id == '1') {
                        if (a.star_rating == b.star_rating) {
                            return 0;
                        }
                        return a.star_rating > b.star_rating ? 1 : -1;
                    } else if (a.allstay_hotel_type_id == '1' && b.allstay_hotel_type_id != '1') {
                        return 1;
                    } else if (b.allstay_hotel_type_id == '1' && a.allstay_hotel_type_id != '1') {
                        return -1;
                    } else {
                        if (a.star_rating == b.star_rating) {
                            return 0;
                        }
                        return a.star_rating > b.star_rating ? 1 : -1;
                    }
                });

                break;

            case 'starhigh':
                // 성급 높은순
                items.sort(function (a, b) {
                    if (a.allstay_hotel_type_id == '1' && b.allstay_hotel_type_id == '1') {
                        if (a.star_rating == b.star_rating) {
                            return 0;
                        }
                        return b.star_rating > a.star_rating ? 1 : -1;
                    } else if (a.allstay_hotel_type_id == '1' && b.allstay_hotel_type_id != '1') {
                        return -1;
                    } else if (b.allstay_hotel_type_id == '1' && a.allstay_hotel_type_id != '1') {
                        return 1;
                    } else {
                        if (a.star_rating == b.star_rating) {
                            return 0;
                        }
                        return b.star_rating > a.star_rating ? 1 : -1;
                    }
                });

                break;

            case 'reviewscore':
                // 평점 높은순
                items.sort(function (a, b) {


                    if (!a.hasOwnProperty('review_score') || !a.review_score.hasOwnProperty('review')) {
                        a = Object.assign({}, a, { review_score: {
                            review: {
                                score: 0
                            }
                        } });
                    }

                    if (!b.hasOwnProperty('review_score') || !b.review_score.hasOwnProperty('review')) {
                        b = Object.assign({}, b, { review_score: {
                            review: {
                                score: 0
                            }
                        } });
                    }

                    if (a.review_score.review.score == b.review_score.review.score) {
                        return 0;
                    }
                    return b.review_score.review.score > a.review_score.review.score ? 1 : -1;

                 
                });

                break;
        }
    }
}