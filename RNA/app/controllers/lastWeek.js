angular.module('MyApp')
  .controller('LastWeekCtrl', function ($scope, $rootScope, $sce, $location, Rates, AlertService, $auth, $window) {
    $scope.currentUser = $rootScope.currentUser;

  });
