angular.module('MyApp')
  .controller('HomeCtrl', function ($scope, $rootScope, $location, Emails, AlertService, $auth) {
    $scope.currentUser = $rootScope.currentUser;

    $scope.sendEmail = function () {
      console.log("send email");
      Emails.sendEmail().then(function (response) {
        console.log(response);
      });
    }

    init();

    function init() {
      bootbox.hideAll();
      if($scope.currentUser){
        $scope.userPath = '/' + $scope.currentUser.company + '/users/';
      }
    }
  });
