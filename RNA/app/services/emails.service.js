angular.module('MyApp')
  .factory('Emails', function ($http) {
    return {
      sendEmail: function () {
        return $http.post('/api/emails/sendEmail');
      }
    };
  });