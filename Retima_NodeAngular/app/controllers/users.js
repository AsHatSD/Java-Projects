angular.module('MyApp')
  .controller('UsersCtrl', function ($scope, $rootScope, $routeParams, $location, Users, Customers, AlertService) {
    $scope.currentUser = $rootScope.currentUser;

    $scope.goToCreate = function () {
      var newPath = '/' + $scope.customer._id + '/createUser/';
      $location.path(newPath);
    };

    $scope.editUser = function (user) {
      var newPath = '/' + $scope.customer._id + '/editUser/' + user._id + '/';
      $location.path(newPath);
    };

    $scope.deleteUser = function (user) {
      bootbox.confirm({
        message: "Ønsker du at slette?",
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
            Users.delete(user).then(function (result) {
              Users.fetchForAdmin()
                .then(function (response) {
                  $scope.users = response.data.users;
                });
            });
          }
        }
      });
    };

    init();

    function init(){
      if ($routeParams.customerId) {

        Customers.findCustomer($routeParams.customerId)
          .then(function (response) {
            if(response.data){
              $scope.customer = response.data.customer;
            }
          });
      }

       Users.fetchForAdmin()
        .then(function (response) {
          if(response.data){
          $scope.users = response.data.users.filter(function (elem) {
            return elem.company === $scope.customer._id;
          });
        }
        });
    }
  });
