
export const setCalendar = function setCalendar(dates, setDateFn){

    // console.log(dates)
    initCalendar(dates, setDateFn);
    initCalendarTime(dates);

}


export const carTypeKeys = {
    carCodes0 : "34663_33", //소형
    carCodes1 : "34663_151032", //준중형
    carCodes2 : "34663_31", //중형
    carCodes3 : "34663_151034", //고급
    carCodes4 : "34663_151035", //RV/SUV
    carCodes5 : "34663_151036" //승합
}

export const insurTypeKeys = {
    insurCodes0 : "34667_151044", //일반자차
    insurCodes1 : "34667_151033", //완전자차
    insurCodes2 : "34667_151045" //완전자차 (무제한)
}

export const carTypeCodes = {
    "34663_33" : "소형",
    "34663_151032" : "준중형",
    "34663_31" : "중형",
    "34663_151034" : "고급",
    "34663_151035" : "RV/SUV",
    "34663_151036" : "승합"
} 

export const insurTypeCodes = {
    "34667_151044" : "일반자차",
    "34667_151033" : "완전자차",
    "34667_151045" : "완전자차 (무제한)"
}


export const carTypeName = function carTypeName(types){

    var carTypeNames = [];

    types.map(function(type){
        if(typeof carTypeCodes[type] !== "undefined"){
            carTypeNames.push(carTypeCodes[type]);
        }
    })

    return carTypeNames;

}

export const insuranceName = function insuranceName(type){

    var insuranceName = insurTypeCodes[type];

    return (typeof insuranceName == "undefined") ? "" : insuranceName;
}

export const positionTop = function positionTop(element) {
    if (!element) {
        return false;
    }
    var posTop = element.offsetTop,
        posParent = element.offsetParent;

    if (!posParent) {
        return posTop;
    }
    while (posParent.offsetParent) {
        posTop += posParent.offsetTop;
        posParent = posParent.offsetParent;
    }
    return posTop;
};

export const convertStringToDate = function convertStringToDate(yyyymmdd, hhmm){

    var year   = parseInt(yyyymmdd.substring(0,4));
    var month  = parseInt(yyyymmdd.substring(4,6))-1;    
    var date   = parseInt(yyyymmdd.substring(6,8));
    var hour = parseInt(hhmm.substring(0,2));
    var mm = parseInt(hhmm.substring(2,4));

    var d = new Date(year,month,date,hour,mm);

    return d;
}

export const parseDate = function parseDate(date){

    var daysArray = ['일', '월', '화', '수', '목', '금', '토'];

    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        date = '' + d.getDate(),
        day = d.getDay(),
        dayStr = daysArray[day],
        hour = ''+ d.getHours(),
        year = d.getFullYear(),
        minute = '' + d.getMinutes();

    if (month.length < 2) month = '0' + month;
    if (date.length < 2) date = '0' + date;
    if (hour.length < 2 ) hour = '0' + hour;
    if (minute.length < 2) minute = '0' + minute;

    return {
        year : year,
        month : month,
        date : date,
        day : dayStr,
        hour : hour,
        minute : minute
    }
}

export const scrolltoTab = function setIScrolltoTab(elementId) {
    // set filter contents iscroll
    var iScrollOptions = {
        preventDefaultException: {tagName: /.*/},
        scrollbars: true,
        fadeScrollbars: true,
        mouseWheel: true,
        tab: true
    }; 

   try{
    return new IScroll(elementId, iScrollOptions);
   }catch(e){

   }

}

export const comma = function setComma(value){
    if (typeof value === 'undefined') return;
    return Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const toStringAttributeKeys = function toStringAttributeKeys(attributes){

    return { vendor : attributes.vendor.join('@'), fuel : attributes.fuel.join("@"), capacity : attributes.capacity.join("@"), keyword : attributes.keyword};

}

