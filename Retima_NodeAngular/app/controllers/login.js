angular.module('MyApp')
  .controller('LoginCtrl', function ($scope, $rootScope, $location, $window, $auth) {
    $scope.login = function () {
      $auth.login($scope.user)
        .then(function (response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          if($rootScope.currentUser.type === "system_admin"){
            $location.path('/customers');
          }else{
            $location.path('/');
          } 
        })
        .catch(function (response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
          console.log($scope.messages);
        });
    };
  });