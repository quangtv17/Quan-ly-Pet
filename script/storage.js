'use trick';
//Lưu dữ liệu vào Local
function saveToStorage(key, value) {
    if (typeof (localStorage) !== "undefined") {
        if (Array.isArray(value)) {
            var json = JSON.stringify(value);
            localStorage.setItem(key, json)
        }
    }
};

//Lấy dữ liệu từ Local
function getFromStorage(key) {
    if (typeof (localStorage) !== "undefined") {
        var value = localStorage.getItem(key);
        if (value) {
            if (key) {
                var breedArr = JSON.parse(value);
                return breedArr;
            }
            if(key) {
                var petArr = JSON.parse(value);
                return petArr;
            }
        } else {
            return null;
        }
    } else {
        console.log('Sorry, your browser does not support web storage...');
    }
}

