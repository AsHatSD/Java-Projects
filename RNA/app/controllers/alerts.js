angular.module('MyApp').controller('AlertsCtrl', function ($scope, AlertService) {
  $scope.alerts = AlertService.list;
  $scope.dismiss = function (index) {
    AlertService.dismiss(index);
  };
});
