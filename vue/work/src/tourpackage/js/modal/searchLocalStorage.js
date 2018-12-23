export default {
    fetchStorage(key){
        if(localStorage.getItem(key)){
            return JSON.parse(localStorage.getItem(key));
        }
        return [];
    },
    saveStorage(key, value){
        var result = this.fetchStorage(key);
        localStorage.removeItem(key);
        result.push(value);
        localStorage.setItem(key, JSON.stringify(result));
    },
    createObject(code, city, startDate, endDate){
        //{"code":"68785349_68855701","city":"후쿠오카","startDate":"20181209","endDate":""}
        return {
            "code" : code,
            "city" : city,
            "startDate" : startDate,
            "endDate" : endDate
        }

    }
}