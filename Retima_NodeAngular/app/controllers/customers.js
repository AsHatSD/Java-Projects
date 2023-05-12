angular.module('MyApp')
  .controller('CustomersCtrl', function ($scope, $rootScope, $location, Customers, Users, AlertService) {
    $scope.currentUser = $rootScope.currentUser;

    $scope.checked;

    $scope.goToCreate = function () {
      $location.path('/createcustomer');
    };

    $scope.propertyName = null;
    $scope.reverse = false;

    $scope.sortBy = function (propertyName) {
      $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
      $scope.propertyName = propertyName;
    };

    fetchData();

    function fetchData() {
      Customers.fetch()
        .then(function (response) {
          $scope.customers = response.data.customers;
        });
    }

    $scope.editCustomer = function (customer) {
      var newPath = '/editCustomer/' + customer._id + '/';
      $location.path(newPath);
    };

    $scope.disableCustomer = function (customer, $event) {
      $event.stopPropagation();
      bootbox.confirm({
        message: "Ønsker du at deaktivere?",
        buttons: {
          confirm: {
            label: 'Ja'
          },
          cancel: {
            label: 'Nej'
          }
        },
        callback: function (result) {
          if (result) {

            // Disable all users for Customer
            Users.fetchForCustomer(customer._id).then(function (response) {
              if (response.data) {
                $scope.disabledUsers = response.data.users;
                for (u in $scope.disabledUsers) {
                  $scope.disabledUsers[u].state = "inactive";
                  Users.save($scope.disabledUsers[u]);
                }
              }
            });

            // Disable customer
            customer.state = "inactive";
            Customers.save(customer);
          }
        }
      });
    };

    $scope.enableCustomer = function (customer, $event) {
      $event.stopPropagation();
      bootbox.confirm({
        message: "Ønsker du at aktivere?",
        buttons: {
          confirm: {
            label: 'Ja'
          },
          cancel: {
            label: 'Nej'
          }
        },
        callback: function (result) {
          if (result) {

            // Enable all users for Customer
            Users.fetchForCustomer(customer._id).then(function (response) {
              if (response.data) {
                $scope.enabledUsers = response.data.users;
                for (u in $scope.enabledUsers) {
                  $scope.enabledUsers[u].state = "active";
                  Users.save($scope.enabledUsers[u]);
                }
              }
            });

            // Enable customer
            customer.state = "active";
            Customers.save(customer);
          }
        }
      });
    };

    $scope.openCustomer = function (customer) {
      var newPath = '/customers/' + customer._id + '/';
      $location.path(newPath);
    };
  });
