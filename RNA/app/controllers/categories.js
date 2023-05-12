angular.module('MyApp')
  .controller('CategoriesCtrl', function ($scope, $rootScope, $location, Categories, AlertService) {

    $scope.currentUser = $rootScope.currentUser;

    fetchData();

    // object that stores an array of categories
    $scope.categoryDataModel = {
      "categorydata": []
    };

    $scope.onSuccess = function (response) {
      AlertService.pushSuccess(response.data.message);
      fetchData();
    }

    $scope.tableRowExpanded = false;
    $scope.tableRowIndexExpandedCurr = "";
    $scope.tableRowIndexExpandedPrev = "";
    $scope.categoryNumberExpanded = "";

    $scope.subcategoryDataCollapseFn = function () {
      $scope.subcategoryDataCollapse = [];
      for (var i = 0; i < $scope.categoryDataModel.categorydata.length; i += 1) {
        $scope.subcategoryDataCollapse.push(false);
      }
    };

    $scope.selectTableRow = function (index, number) {
      if (typeof $scope.subcategoryDataCollapse === 'undefined') {
        $scope.subcategoryDataCollapseFn();
      }

      if ($scope.tableRowExpanded === false && $scope.tableRowIndexExpandedCurr === "" &&
        $scope.categoryNumberExpanded === "") {
        $scope.tableRowIndexExpandedPrev = "";
        $scope.tableRowExpanded = true;
        $scope.tableRowIndexExpandedCurr = index;
        $scope.categoryNumberExpanded = number;
        $scope.subcategoryDataCollapse[index] = true;
      } else if ($scope.tableRowExpanded === true) {
        if ($scope.tableRowIndexExpandedCurr === index && $scope.categoryNumberExpanded === number) {
          $scope.tableRowExpanded = false;
          $scope.tableRowIndexExpandedCurr = "";
          $scope.categoryNumberExpanded = "";
          $scope.subcategoryDataCollapse[index] = false;
        } else {
          $scope.tableRowIndexExpandedPrev = $scope.tableRowIndexExpandedCurr;
          $scope.tableRowIndexExpandedCurr = index;
          $scope.categoryNumberExpanded = number;
          $scope.subcategoryDataCollapse[$scope.tableRowIndexExpandedPrev] = false;
          $scope.subcategoryDataCollapse[$scope.tableRowIndexExpandedCurr] = true;
        }
      }

    };

    $scope.isEmpty = function (categorydata) {
      if (!categorydata.data.subcategoryData.length) {
        return true;
      }
      return false;
    };

    function fetchData() {
      Categories.fetchAll().then(
        function (response) {
          if(response.data.length){
          $scope.categories = response.data;

          var aux_categ;

          // temporary object that contains a category and an array of subcategories
          var temp_obj = {
            "category": {},
            "data": {
              "subcategoryData": []
            }
          };

          for (categ in $scope.categories) { // go through all categegories and subcategories retrieved from DB

            var categ_obj = $scope.categories[categ]; // current element
            var categ_number = categ_obj.number;  // number of current element

            if (Number.isInteger(categ_number)) { // check if element is category

              if (aux_categ) {
                // add temporary object to scope object
                $scope.categoryDataModel.categorydata.push(temp_obj);

                // reset temporary object
                temp_obj = {
                  "category": {},
                  "data": {
                    "subcategoryData": []
                  }
                };

              }

              temp_obj.category = categ_obj; // add category to temporary object
              aux_categ = categ_obj;

            } else {  // element is subcategory
              temp_obj.data.subcategoryData.push(categ_obj);  // add subcategory to the array of temporary object
            }
          }

          // add last element
          $scope.categoryDataModel.categorydata.push(temp_obj);
        }
        });
    }
    $location.path('/categories');
  });
