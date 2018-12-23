const V_ROL_IMG_PREFIX_URL = "http://imgv3.011st.com/11st-hotel/w420h420,crop_middle,q85/rolPic.jpg?src="
const V_IMG_URL  = "http://s.011st.com"
const V_UPLOAD_URL = "http://i.011st.com"

export function getRolImgUrl(){
    return (typeof _ROL_IMG_PREFIX_PC == "undefined") ? V_ROL_IMG_PREFIX_URL : _ROL_IMG_PREFIX_PC;
}

export function getIMGURL(){
    return (typeof _IMG_URL_ == "undefined") ? V_IMG_URL : _IMG_URL_;
}

export function getUploadURL(){
    return (typeof _UPLOAD_URL_ == "undefined") ? V_UPLOAD_URL : _UPLOAD_URL_;
}