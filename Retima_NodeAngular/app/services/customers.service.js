angular.module('MyApp')
  .factory('Customers', function ($http) {
    return {
        fetch: function(){
            return $http.get('/api/customers');
        },
      add: function (data) {
        return $http.post('/api/customers', data);
      },
      save: function (data) {
        return $http.put('/api/customers/save', data);
      },
      findCustomer: function (data) {
        var p = {
          params: {
            customerId: data
          }
        };
        return $http.get('/api/customers/findCustomer', p);
      }
    };
  });