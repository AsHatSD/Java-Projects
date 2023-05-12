angular.module('MyApp')
    .filter('caps', function () {
        return function (data) {
            return data.toUpperCase();
        }
    });