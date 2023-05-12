angular.module('MyApp')
    .factory('PlaceService', function ($http) {
        return {
            getAll: function (data) {
                return $http.get('/api/place');
            }
        };
    });