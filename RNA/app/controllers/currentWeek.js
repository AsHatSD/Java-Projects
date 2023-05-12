angular.module('MyApp')
  .controller('CurrentWeekCtrl', function ($scope, $rootScope, $sce, $location, Jobs, AlertService, $auth, $window) {
    $scope.currentUser = $rootScope.currentUser;

    init();

    function init(){

        var startDay = moment().startOf('week').add(1, 'd');

        Jobs.fetchForWeek().then(function(result){
            if(result){
                $scope.jobs = result.data.filter(function(elem){
                    return moment(elem.createdAt).isSameOrAfter(startDay);
                });
            }  
        });
    }
  });
