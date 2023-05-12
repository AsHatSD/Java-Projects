angular.module('MyApp')
  .controller('HeaderCtrl', function ($scope, $rootScope, $location, $window, $auth) {
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };

    $scope.isAuthenticated = function () {
      return $auth.isAuthenticated();
    };

    $scope.getRoute = function(){
      if($rootScope.currentUser){
        if($rootScope.currentUser.type === 'system_admin'){
          return "/customers";
        }
      }
        return "/";
    }

    $scope.logout = function () {
      $auth.logout();
      delete $window.localStorage.user;
      $location.path('/login');
    };
  });
