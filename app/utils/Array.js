const array = {
    findIndexInData: (data, property, value) => {
        var result = -1;
        data.some(function (item, i) {
            if (item[property] === value) {
                result = i;
                return true;
            }
        });
        return result;
    }
}

export default array;