export const comma = function setComma(value){
    if (typeof value === 'undefined') return;
    return Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const stringUtil = {

   trim : function(str){
     if (dateUtil.isEmptyValue(str)) return '';
     return str.replace(/\s*/g, "");
   },

  moneyComma : function(value) {
    if (typeof value === 'undefined' || value == 0 || value == null) return 0;
    return Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  timeComma : function(str){
    if (str === '' || str === null) return '';
    let h = str.substr(0, 2),
      m = str.substr(2,4);
    return `${h}:${m}`;
  }

}

export const dateUtil = {
    yyyymmdd: function(date) {
        var mm = date.getMonth() + 1,
            dd = date.getDate();

        return [date.getFullYear(), (mm < 10 ? '0' : ''), mm, (dd < 10 ? '0' : ''), dd].join('');
    },
    parseDateFormat : function(str){
        if(!/^(\d){8}$/.test(str)) return null;
        var y = str.substr(0,4),
            m = str.substr(4,2),
            d = str.substr(6,2);
        return new Date(y,m-1,d);
    },
    dateDiffInDays : function(checkin, checkout, defaultVal){

        if(dateUtil.isNotEmptyValue(checkin) && dateUtil.isNotEmptyValue(checkout)){
            var date1 = dateUtil.parseDateFormat(checkin.replace(/-/gi,""));
            var date2 = dateUtil.parseDateFormat(checkout.replace(/-/gi,""));
            if(date1 !== null && date2 !== null){
                var diffDays =(date2.getTime() - date1.getTime())/1000/60/60/24;
                return diffDays;
            }
        }
        return defaultVal;

    },
    isEmptyValue : function(value){

        if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
            return true
        }else{
            return false
        }

    },
    isNotEmptyValue : function(value){

    return !dateUtil.isEmptyValue(value);

    }

}

function getCookie(cName) {
    cName = cName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cName);
    var cValue = '';
    if(start != -1){
         start += cName.length;
         var end = cookieData.indexOf(';', start);
         if(end == -1)end = cookieData.length;
         cValue = cookieData.substring(start, end);
    }
    return unescape(cValue);
}

export function isApp(){
    var appType = getCookie("appType");
    return (appType.indexOf("appmw") > -1);
}

