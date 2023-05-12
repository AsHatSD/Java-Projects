angular.module('MyApp')
  .controller('PreviousRegistrationsCtrl', function ($scope, $rootScope, $location, Emails, AlertService, $auth) {
    $scope.currentUser = $rootScope.currentUser;

    
  });
