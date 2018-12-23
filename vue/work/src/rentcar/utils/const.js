export const IMG_URL = "http://i.011st.com"

export function getImgDomain(){

    return (typeof _TOUR_PRODUCT_IMG_URL_ == "undefined") ? IMG_URL : _TOUR_PRODUCT_IMG_URL_;
         
}