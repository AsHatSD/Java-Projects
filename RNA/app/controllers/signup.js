angular.module('MyApp')
  .controller('SignupCtrl', function ($scope, $rootScope, $location, $window, $auth) {
    $scope.signup = function () {
      $auth.signup($scope.user)
        .then(function (response) {
          $auth.setToken(response);
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          if ($rootScope.currentUser.type === 'system_admin') {
            $location.path('/users');
          }
          else {
            $location.path('/');
          }
        })
        .catch(function (response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };
  });