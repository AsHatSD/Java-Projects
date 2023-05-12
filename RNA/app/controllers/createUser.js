angular.module('MyApp')
  .controller('CreateUserCtrl', function ($scope, $rootScope, $routeParams, $location, Users, Customers,
    AlertService) {
    $scope.currentUser = $rootScope.currentUser;

    $scope.newUser = {
      number: null,
      name: null,
      password: null,
      type: null
    };

    $scope.text = "Opret medarbejder";
    $scope.edit = false;

    $scope.passwordFieldType = "password";

    $scope.addNewUser = function () {

      $scope.newUser.createdBy = $scope.currentUser._id;
      $scope.newUser.company = $scope.customer._id;

      if ($scope.edit) {
        Users.save($scope.newUser)
          .then(function (response) {
            var newPath = '/' + $scope.customer._id + '/users/';
            $location.path(newPath);
          })
      } else {
        Users.add($scope.newUser)
          .then(function (response) {
            var newPath = '/' + $scope.customer._id + '/users/';
            $location.path(newPath);
          })
          .catch(function (response) {
            $scope.messages = {
              error: Array.isArray(response.data) ? response.data : [response.data]
            };
          });
      }
    };

    $scope.showPassword = function () {
      $scope.passwordFieldType = "text";
    };

    $scope.hidePassword = function () {
      $scope.passwordFieldType = "password";
    };

    init();
    function init() {
      if ($routeParams.customerId) {

        Customers.findCustomer($routeParams.customerId)
          .then(function (response) {
            $scope.customer = response.data.customer;
          });

        if ($routeParams.userId) {

          Users.findUser($routeParams.userId)
            .then(function (response) {
              $scope.text = "Rediger medarbejder";
              $scope.newUser = response.data.user;
              $scope.edit = true;
            });
        }
      }
    }
  });
