angular.module('MyApp')
  .controller('ExportsCtrl', function ($scope, $rootScope, Jobs, Users, AlertService, $window) {
    fetchData();

    $scope.currentUser = $rootScope.currentUser;

    $scope.createReport = function () {

      Users.fetchForAdmin().then(function (response) {
        $scope.users = response.data.users;

        for (u in $scope.users) {
          Jobs.createReport($scope.users[u]).then(function (response) {
            fetchData();
          })
            .catch(function (response) {
              if (response.status === 400) {
                for (var i = 0; i < response.data.length; i++) {
                  AlertService.pushDanger(response.data[i].msg);
                }
              } else {
                AlertService.pushDanger("Something went wrong, please call support or try again");
              }
            });
        }
      });
    };

    function fetchData() {
      Jobs.listExports()
        .then(function (response) {
          $scope.files = response.data;
        });
    }
  });
