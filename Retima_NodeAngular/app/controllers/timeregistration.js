angular.module('MyApp')
  .controller('TimeRegistrationCtrl', function ($scope, $routeParams, $location, Cases, Categories, AlertService, PlaceService, Jobs) {
    $scope.job = {};

    $scope.usedMaterials = [];
    $scope.usedExtraMaterials = [];

    $scope.usedMaterial = {
      material: null,
      color: null,
      quantity: null
    };
    $scope.usedExtraMaterial = {
      material: null,
      color: null,
      quantity: null
    };

    $scope.dt = new Date();

    $scope.popup = {
      opened: false
    };

    $scope.changeDate = function (dt) {
      $scope.dt = dt;
    };

    $scope.start = moment().day(1).hour(9).minute(0).second(0).toDate();

    $scope.dateOptions = {
      startingDay: 1,
      minDate: new Date($scope.start),
      maxDate: new Date()
    };

    $scope.openPopup = function () {
      $scope.popup.opened = true;
    };

    $scope.goToNext = function () {
      $scope.pageNumber += 1;
      if ($scope.pageNumber === 7) {
        $scope.showOverview();
      }
    };

    $scope.goToPrevious = function () {
      $scope.pageNumber -= 1;
    };

    $scope.changePage = function (number) {
      $scope.pageNumber = number;
      if ($scope.pageNumber === 7) {
        $scope.showOverview();
      }
    };

    $scope.getSalary = function () {
      if ($scope.temp_job.type === "time_based") {
        $scope.temp_job.salary = $scope.temp_job.hours * $scope.temp_job.price;
      } else {
        $scope.temp_job.salary = $scope.temp_job.consumption * $scope.temp_job.price;
      }
      return $scope.temp_job.salary;
    };

    $scope.showOverview = function () {
      $scope.temp_job = jQuery.extend(true, {}, $scope.job);

      $scope.temp_job.date = $scope.dt;

      //if ($scope.temp_job.case) $scope.temp_job.case = JSON.parse($scope.temp_job.case);
      //if ($scope.temp_job.category) $scope.temp_job.category = JSON.parse($scope.temp_job.category);
      //if ($scope.temp_job.timeType) $scope.temp_job.timeType = JSON.parse($scope.temp_job.timeType);
    };

    $scope.open = false;
    $scope.open2 = false;

    $scope.openUsedMaterials = function () {
      $scope.open = !$scope.open;
      $scope.usedMaterial = {
        material: null,
        color: null,
        quantity: null
      };
    };
    $scope.openUsedExtraMaterials = function () {
      $scope.open2 = !$scope.open2;
      $scope.usedExtraMaterial = {
        material: null,
        color: null,
        quantity: null
      };
    };

    $scope.addUsedMaterial = function (usedMaterial) {
      $scope.usedMaterials.push($scope.usedMaterial);
      $scope.job.usedMaterials = $scope.usedMaterials;

      $scope.open = false;
    };

    $scope.addUsedExtraMaterial = function (usedExtraMaterial) {
      $scope.usedExtraMaterials.push($scope.usedExtraMaterial);
      $scope.job.usedExtraMaterials = $scope.usedExtraMaterials;

      $scope.open2 = false;
    };

    $scope.removeUsedMaterial = function (usedMaterial) {
      var index = $scope.usedMaterials.indexOf(usedMaterial);
      $scope.usedMaterials.splice(index, 1);
      $scope.job.usedMaterials = $scope.usedMaterials;
    };

    $scope.removeUsedExtraMaterial = function (usedExtraMaterial) {
      var index = $scope.usedExtraMaterials.indexOf(usedExtraMaterial);
      $scope.usedExtraMaterials.splice(index, 1);
      $scope.job.usedExtraMaterials = $scope.usedExtraMaterials;
    };

    $scope.addNewJob = function () {

      if ($scope.temp_job.finishedCase === "Ja") {
        $scope.temp_job.case.finished = $scope.temp_job.finishedCase;
        Cases.save($scope.temp_job.case);
      }

      Jobs.add($scope.temp_job)
        .then(function (response) {
          AlertService.pushSuccess(response.data.message);
          $location.path('/');
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
    };

    fetchData();

    $scope.onlyCategories = [];
    $scope.onlySubcategories = [];

    $scope.shutDown = false;

    function fetchData() {

      $scope.pageNumber = 1;

      PlaceService.getAll().then(function (result) {
      if (result) {
        $scope.cities = [];
        for (c in result.data.list) {
          $scope.cities.push(result.data.list[c].City[0]);
        }
      }
    });

      // $scope.today = moment("10 8:00", "DD hh:mm");
      $scope.today = moment();

      if ($scope.today.day() === 0) {
        if ($scope.today.hour() >= 22) {
          $scope.shutDown = true;
        }
      } else if ($scope.today.day() === 1) {
        if ($scope.today.hour() < 9) {
          $scope.shutDown = true;
        }
      }

      if ($scope.shutDown) {
        bootbox.dialog({
          message: 'Shutdown',
          closeButton: false
        });
      }

      Cases.fetchAll()
        .then(function (response) {
          $scope.cases = response.data.filter(function (elem) {
            return elem.finished != "Ja";
          });
        });
      Categories.fetchAll()
        .then(function (response) {
          $scope.categories = response.data;

          for (categ in $scope.categories) { // go through all categegories and subcategories retrieved from DB

            var categ_obj = $scope.categories[categ]; // current element
            var categ_number = categ_obj.number;  // number of current element

            if (Number.isInteger(categ_number)) { // check if element is category
              $scope.onlyCategories.push(categ_obj);
            } else {  // element is subcategory
              $scope.onlySubcategories.push(categ_obj);
            }
          }

          $scope.timeTypes = response.data.filter(function (elem) {
            return elem.unit != undefined && elem.unit.toLowerCase() === "timer";
          });

        });
    }
  });
