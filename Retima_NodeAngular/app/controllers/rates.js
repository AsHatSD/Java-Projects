angular.module('MyApp')
  .controller('RatesCtrl', function ($scope, $rootScope, $sce, $location, Rates, AlertService, $auth, $window) {
    $scope.currentUser = $rootScope.currentUser;

    $scope.addRates = function () {
      console.log($scope.rates);

      Rates.add($scope.rates)
        .then(function (response) {
          $scope.alert = response.data.msg;
          $scope.rates = response.data.rates;
        });
    };

    init();

    function init() {
      Rates.fetch($scope.currentUser._id)
        .then(function (response) {
          $scope.rates = response.data;
          console.log($scope.rates);
          if ($scope.currentUser.type === 'user') {
            $scope.rates.text = sanitizeHtml($scope.rates.text);
            $scope.rates.text = $sce.trustAsHtml($scope.rates.text);
          }
        });
    }
  });
