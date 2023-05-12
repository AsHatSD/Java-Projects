angular.module('MyApp')
  .factory('Users', function ($http) {
    return {
      fetchForAdmin: function () {
        return $http.get('/api/users');
      },
      fetchForCustomer: function (data) {
        var p = {
          params: {
            customerId: data
          }
        };
        return $http.get('/api/users/getForCustomer', p);
      },
      add: function (data) {
        return $http.post('/api/users', data);
      },
      save: function (data) {
        return $http.put('/api/users/save', data);
      },
      delete: function (data) {
        return $http.put('/api/users/delete', data);
      },
      findUser: function (data) {
        var p = {
          params: {
            userId: data
          }
        };
        return $http.get('/api/users/findUser', p);
      }
    };
  });