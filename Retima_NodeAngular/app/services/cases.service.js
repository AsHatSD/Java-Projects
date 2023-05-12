angular.module('MyApp')
  .factory('Cases', function ($http) {
    return {
      fetchAll: function (data) {
        return $http.get('/api/cases');
      },
      save: function (data) {
        return $http.put('/api/cases/save', data);
      }
    };
  });