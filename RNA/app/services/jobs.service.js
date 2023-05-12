angular.module('MyApp')
  .factory('Jobs', function ($http) {
    return {
      fetchForWeek: function () {
        return $http.get('/api/jobs');
      },
      add: function (data) {
        return $http.post('/api/jobs', data);
      },
      listExports: function () {
        return $http.get('/api/exports');
      },
      createReport: function (data) {
        return $http.post('/api/exports', data);
      }
    };
  });