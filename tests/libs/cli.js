module.exports = function (key) {
    var result = null,
        re = new RegExp('^' + key + '=(.*)$');

    process.argv.forEach(function (val, index, array) {
        if (val.match(re)) {
            result = RegExp.$1;
        }
    });
    return result;
};