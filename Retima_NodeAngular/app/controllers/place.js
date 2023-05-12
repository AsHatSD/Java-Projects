angular.module('MyApp')
    .controller('PlaceCtrl', function ($scope, $rootScope, $sce, $routeParams, $location, PlaceService) {
        $scope.currentUser = $rootScope.currentUser;


        init();
        function init() {

            var dialog = bootbox.dialog({
                        message: "Opdatering af steder..."
                    });
                    dialog.init(function () {
                        setTimeout(function () {
                            dialog.modal('hide');
                        }, 2000);
                    });

            PlaceService.getAll().then(function (result) {
                if (result) {
                        $scope.cities = [];
                        for (c in result.data.list) {
                            $scope.cities.push(result.data.list[c].City[0]);
                        }
                    }
                });
                
        }
    });