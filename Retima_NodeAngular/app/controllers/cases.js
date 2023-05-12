angular.module('MyApp')
  .controller('CasesCtrl', function ($scope, $rootScope, Cases, AlertService) {
    fetchData();

    $scope.currentUser = $rootScope.currentUser;

    $scope.onSuccess = function (response) {
      AlertService.pushSuccess(response.data.message);
      fetchData();
    }

    function fetchData() {
      Cases.fetchAll()
        .then(function (response) {
          $scope.cases = response.data;
        });
    }

  });
