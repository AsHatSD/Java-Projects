angular.module('MyApp')
  .factory('Categories', function ($http) {
    return {
      fetchAll: function () {
        return $http.get('/api/categories');
      }
    };
  });