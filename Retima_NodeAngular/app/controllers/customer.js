angular.module('MyApp')
    .controller('CustomerCtrl', function ($scope, $rootScope, $routeParams, $location, Customers, AlertService) {
        $scope.currentUser = $rootScope.currentUser;

        $scope.goToUsers = function (customer) {
            var newPath = '/' + customer._id + '/users';
            $location.path(newPath);
        };

        init();
        function init() {
            if ($routeParams.customerId) {

                Customers.findCustomer($routeParams.customerId)
                    .then(function (response) {
                        $scope.customer = response.data.customer;
                    });
            }

        }
    });
