angular.module('MyApp')
  .controller('CreateCustomerCtrl', function ($scope, $rootScope, $routeParams, $location, Customers, AlertService) {
    $scope.currentUser = $rootScope.currentUser;

    $scope.newCustomer = {
      name: null,
      code: null
    };

    $scope.text = "Opret kunde";
    $scope.edit = false;

    $scope.addNewCustomer = function () {



      if ($scope.edit) {
        Customers.save($scope.newCustomer)
          .then(function (response) {
            var dialog = bootbox.dialog({
              message: $scope.newCustomer.name + " gemt"
            });
            dialog.init(function () {
              setTimeout(function () {
                dialog.modal('hide');
              }, 2000);
            });
            $location.path('/customers');
          })
      } else {
        Customers.add($scope.newCustomer)
          .then(function (response) {
            var dialog = bootbox.dialog({
              message: $scope.newCustomer.name + " gemt"
            });
            dialog.init(function () {
              setTimeout(function () {
                dialog.modal('hide');
              }, 2000);
            });
            $location.path('/customers');
          })
          .catch(function (response) {
            $scope.messages = {
              error: Array.isArray(response.data) ? response.data : [response.data]
            };
          });
      }
    };

    init();
    function init() {
      if ($routeParams.customerId) {

        Customers.findCustomer($routeParams.customerId)
          .then(function (response) {
            $scope.text = "Rediger kunde";
            $scope.newCustomer = response.data.customer;
            $scope.edit = true;
          });
      }

    }
  });
