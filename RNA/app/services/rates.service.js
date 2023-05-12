angular.module('MyApp')
  .factory('Rates', function ($http) {
    return {
      fetch: function () {
        return $http.get('/api/rates');
      },
      add: function (data) {
        return $http.post('/api/rates', data);
      }
    };
  });