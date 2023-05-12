angular.module('MyApp', ['ngRoute', 'satellizer', 'lr.upload', 'angularTrix', 'ui.bootstrap'])
  .config(["$routeProvider", "$locationProvider", "$authProvider", function ($routeProvider, $locationProvider, $authProvider) {
    loginRequired.$inject = ["$location", "$auth"];
    skipIfAuthenticated.$inject = ["$location", "$auth"];
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl',
        resolve: { loginRequired: loginRequired }
      })
      .when('/place', {
        templateUrl: 'partials/place.html',
        controller: 'PlaceCtrl',
        resolve: { loginRequired: loginRequired }
      })
      .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/signup', {
        templateUrl: 'partials/signup.html',
        controller: 'SignupCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/customers', {
        templateUrl: 'partials/customers.html',
        controller: 'CustomersCtrl',
        resolve: { loginRequired: loginRequired }
      })
      .when('/customers/:customerId', {
        templateUrl: 'partials/customer.html',
        controller: 'CustomerCtrl',
        resolve: { loginRequired: loginRequired }
      })
      .when('/:customerId/users', {
        templateUrl: 'partials/users.html',
        controller: 'UsersCtrl',
        resolve: { loginRequired: loginRequired }
      })
      .when('/createcustomer', {
        templateUrl: 'partials/createCustomer.html',
        controller: 'CreateCustomerCtrl',
        resolve: { loginRequired: loginRequired }
      })
      .when('/editCustomer/:customerId', {
        templateUrl: 'partials/createCustomer.html',
        controller: 'CreateCustomerCtrl',
        resolve: { loginRequired: loginRequired }
      })
      .when('/:customerId/createUser', {
        templateUrl: 'partials/createUser.html',
        controller: 'CreateUserCtrl',
        resolve: { loginRequired: loginRequired }
      })
      .when('/:customerId/editUser/:userId', {
        templateUrl: 'partials/createUser.html',
        controller: 'CreateUserCtrl',
        resolve: { loginRequired: loginRequired }
      })
      .when('/timeregistration', {
        templateUrl: 'partials/timeregistration.html',
        controller: 'TimeRegistrationCtrl',
        resolve: { loginRequired: loginRequired }
      })
      .when('/previousRegistrations', {
        templateUrl: 'partials/previousRegistrations.html',
        controller: 'PreviousRegistrationsCtrl',
        resolve: { loginRequired: loginRequired }
      }).when('/currentWeek', {
        templateUrl: 'partials/currentWeek.html',
        controller: 'CurrentWeekCtrl',
        resolve: { loginRequired: loginRequired }
      })
      .when('/lastWeek', {
        templateUrl: 'partials/lastWeek.html',
        controller: 'LastWeekCtrl',
        resolve: { loginRequired: loginRequired }
      })
      .when('/cases', {
        templateUrl: 'partials/cases.html',
        controller: 'CasesCtrl',
        resolve: { loginRequired: loginRequired }
      })
      .when('/categories', {
        templateUrl: 'partials/categories.html',
        controller: 'CategoriesCtrl',
        resolve: { loginRequired: loginRequired }
      })
      .when('/rates', {
        templateUrl: 'partials/rates.html',
        controller: 'RatesCtrl',
        resolve: { loginRequired: loginRequired }
      })
      .when('/export', {
        templateUrl: 'partials/exports.html',
        controller: 'ExportsCtrl',
        resolve: { loginRequired: loginRequired }
      })
      .otherwise({
        templateUrl: 'partials/404.html'
      });

    $authProvider.loginUrl = '/login';
    $authProvider.signupUrl = '/signup';

    function skipIfAuthenticated($location, $auth) {
      if ($auth.isAuthenticated()) {
        $location.path('/');
      }
    }

    function loginRequired($location, $auth) {
      if (!$auth.isAuthenticated()) {
        $location.path('/login');
      }
    }
  }])
  .run(["$rootScope", "$window", function ($rootScope, $window) {
    if ($window.localStorage.user) {
      $rootScope.currentUser = JSON.parse($window.localStorage.user);
    }
  }]);

angular.module('MyApp').controller('AlertsCtrl', ["$scope", "AlertService", function ($scope, AlertService) {
  $scope.alerts = AlertService.list;
  $scope.dismiss = function (index) {
    AlertService.dismiss(index);
  };
}]);

angular.module('MyApp')
  .controller('CasesCtrl', ["$scope", "$rootScope", "Cases", "AlertService", function ($scope, $rootScope, Cases, AlertService) {
    fetchData();

    $scope.currentUser = $rootScope.currentUser;

    $scope.onSuccess = function (response) {
      AlertService.pushSuccess(response.data.message);
      fetchData();
    }

    function fetchData() {
      Cases.fetchAll()
        .then(function (response) {
          $scope.cases = response.data;
        });
    }

  }]);

angular.module('MyApp')
  .controller('CategoriesCtrl', ["$scope", "$rootScope", "$location", "Categories", "AlertService", function ($scope, $rootScope, $location, Categories, AlertService) {

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
  }]);

angular.module('MyApp')
  .controller('CreateCustomerCtrl', ["$scope", "$rootScope", "$routeParams", "$location", "Customers", "AlertService", function ($scope, $rootScope, $routeParams, $location, Customers, AlertService) {
    $scope.currentUser = $rootScope.currentUser;

    $scope.newCustomer = {
      name: null,
      code: null
    };

    $scope.text = "Opret kunde";
    $scope.edit = false;

    $scope.addNewCustomer = function () {



      if ($scope.edit) {
        Customers.save($scope.newCustomer)
          .then(function (response) {
            var dialog = bootbox.dialog({
              message: $scope.newCustomer.name + " gemt"
            });
            dialog.init(function () {
              setTimeout(function () {
                dialog.modal('hide');
              }, 2000);
            });
            $location.path('/customers');
          })
      } else {
        Customers.add($scope.newCustomer)
          .then(function (response) {
            var dialog = bootbox.dialog({
              message: $scope.newCustomer.name + " gemt"
            });
            dialog.init(function () {
              setTimeout(function () {
                dialog.modal('hide');
              }, 2000);
            });
            $location.path('/customers');
          })
          .catch(function (response) {
            $scope.messages = {
              error: Array.isArray(response.data) ? response.data : [response.data]
            };
          });
      }
    };

    init();
    function init() {
      if ($routeParams.customerId) {

        Customers.findCustomer($routeParams.customerId)
          .then(function (response) {
            $scope.text = "Rediger kunde";
            $scope.newCustomer = response.data.customer;
            $scope.edit = true;
          });
      }

    }
  }]);

angular.module('MyApp')
  .controller('CreateUserCtrl', ["$scope", "$rootScope", "$routeParams", "$location", "Users", "Customers", "AlertService", function ($scope, $rootScope, $routeParams, $location, Users, Customers,
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
  }]);

angular.module('MyApp')
  .controller('CurrentWeekCtrl', ["$scope", "$rootScope", "$sce", "$location", "Jobs", "AlertService", "$auth", "$window", function ($scope, $rootScope, $sce, $location, Jobs, AlertService, $auth, $window) {
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
  }]);

angular.module('MyApp')
    .controller('CustomerCtrl', ["$scope", "$rootScope", "$routeParams", "$location", "Customers", "AlertService", function ($scope, $rootScope, $routeParams, $location, Customers, AlertService) {
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
    }]);

angular.module('MyApp')
  .controller('CustomersCtrl', ["$scope", "$rootScope", "$location", "Customers", "Users", "AlertService", function ($scope, $rootScope, $location, Customers, Users, AlertService) {
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
  }]);

angular.module('MyApp')
  .controller('ExportsCtrl', ["$scope", "$rootScope", "Jobs", "Users", "AlertService", "$window", function ($scope, $rootScope, Jobs, Users, AlertService, $window) {
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
  }]);

angular.module('MyApp')
  .controller('HeaderCtrl', ["$scope", "$rootScope", "$location", "$window", "$auth", function ($scope, $rootScope, $location, $window, $auth) {
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };

    $scope.isAuthenticated = function () {
      return $auth.isAuthenticated();
    };

    $scope.getRoute = function(){
      if($rootScope.currentUser){
        if($rootScope.currentUser.type === 'system_admin'){
          return "/customers";
        }
      }
        return "/";
    }

    $scope.logout = function () {
      $auth.logout();
      delete $window.localStorage.user;
      $location.path('/login');
    };
  }]);

angular.module('MyApp')
  .controller('HomeCtrl', ["$scope", "$rootScope", "$location", "Emails", "AlertService", "$auth", function ($scope, $rootScope, $location, Emails, AlertService, $auth) {
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
  }]);

angular.module('MyApp')
  .controller('LastWeekCtrl', ["$scope", "$rootScope", "$sce", "$location", "Rates", "AlertService", "$auth", "$window", function ($scope, $rootScope, $sce, $location, Rates, AlertService, $auth, $window) {
    $scope.currentUser = $rootScope.currentUser;

  }]);

angular.module('MyApp')
  .controller('LoginCtrl', ["$scope", "$rootScope", "$location", "$window", "$auth", function ($scope, $rootScope, $location, $window, $auth) {
    $scope.login = function () {
      $auth.login($scope.user)
        .then(function (response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          if($rootScope.currentUser.type === "system_admin"){
            $location.path('/customers');
          }else{
            $location.path('/');
          } 
        })
        .catch(function (response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
          console.log($scope.messages);
        });
    };
  }]);
angular.module('MyApp')
    .controller('PlaceCtrl', ["$scope", "$rootScope", "$sce", "$routeParams", "$location", "PlaceService", function ($scope, $rootScope, $sce, $routeParams, $location, PlaceService) {
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
    }]);
angular.module('MyApp')
  .controller('PreviousRegistrationsCtrl', ["$scope", "$rootScope", "$location", "Emails", "AlertService", "$auth", function ($scope, $rootScope, $location, Emails, AlertService, $auth) {
    $scope.currentUser = $rootScope.currentUser;

    
  }]);

angular.module('MyApp')
  .controller('RatesCtrl', ["$scope", "$rootScope", "$sce", "$location", "Rates", "AlertService", "$auth", "$window", function ($scope, $rootScope, $sce, $location, Rates, AlertService, $auth, $window) {
    $scope.currentUser = $rootScope.currentUser;

    $scope.addRates = function () {
      console.log($scope.rates);

      Rates.add($scope.rates)
        .then(function (response) {
          $scope.alert = response.data.msg;
          $scope.rates = response.data.rates;
        });
    };

    init();

    function init() {
      Rates.fetch($scope.currentUser._id)
        .then(function (response) {
          $scope.rates = response.data;
          console.log($scope.rates);
          if ($scope.currentUser.type === 'user') {
            $scope.rates.text = sanitizeHtml($scope.rates.text);
            $scope.rates.text = $sce.trustAsHtml($scope.rates.text);
          }
        });
    }
  }]);

angular.module('MyApp')
  .controller('SignupCtrl', ["$scope", "$rootScope", "$location", "$window", "$auth", function ($scope, $rootScope, $location, $window, $auth) {
    $scope.signup = function () {
      $auth.signup($scope.user)
        .then(function (response) {
          $auth.setToken(response);
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          if ($rootScope.currentUser.type === 'system_admin') {
            $location.path('/users');
          }
          else {
            $location.path('/');
          }
        })
        .catch(function (response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };
  }]);
angular.module('MyApp')
  .controller('TimeRegistrationCtrl', ["$scope", "$routeParams", "$location", "Cases", "Categories", "AlertService", "PlaceService", "Jobs", function ($scope, $routeParams, $location, Cases, Categories, AlertService, PlaceService, Jobs) {
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
  }]);

angular.module('MyApp')
  .controller('UsersCtrl', ["$scope", "$rootScope", "$routeParams", "$location", "Users", "Customers", "AlertService", function ($scope, $rootScope, $routeParams, $location, Users, Customers, AlertService) {
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
  }]);

angular.module('MyApp').service('AlertService', function () {
  this.list = [];

  this.push = function (type, message) {
    this.list.push({
      id: this.list.length,
      message: message,
      type: type
    });
  };

  this.pushSuccess = function (message) {
    this.push("success", message);
  };

  this.pushDanger = function (message) {
    this.push("danger", message);
  };

  this.dismiss = function (index) {
    this.list.splice(index, 1);
  };

});

angular.module('MyApp')
  .factory('Cases', ["$http", function ($http) {
    return {
      fetchAll: function (data) {
        return $http.get('/api/cases');
      },
      save: function (data) {
        return $http.put('/api/cases/save', data);
      }
    };
  }]);
angular.module('MyApp')
  .factory('Categories', ["$http", function ($http) {
    return {
      fetchAll: function () {
        return $http.get('/api/categories');
      }
    };
  }]);
angular.module('MyApp')
  .factory('Customers', ["$http", function ($http) {
    return {
        fetch: function(){
            return $http.get('/api/customers');
        },
      add: function (data) {
        return $http.post('/api/customers', data);
      },
      save: function (data) {
        return $http.put('/api/customers/save', data);
      },
      findCustomer: function (data) {
        var p = {
          params: {
            customerId: data
          }
        };
        return $http.get('/api/customers/findCustomer', p);
      }
    };
  }]);
angular.module('MyApp')
  .factory('Emails', ["$http", function ($http) {
    return {
      sendEmail: function () {
        return $http.post('/api/emails/sendEmail');
      }
    };
  }]);
angular.module('MyApp')
  .factory('Jobs', ["$http", function ($http) {
    return {
      fetchForWeek: function () {
        return $http.get('/api/jobs');
      },
      add: function (data) {
        return $http.post('/api/jobs', data);
      },
      listExports: function () {
        return $http.get('/api/exports');
      },
      createReport: function (data) {
        return $http.post('/api/exports', data);
      }
    };
  }]);
angular.module('MyApp')
    .factory('PlaceService', ["$http", function ($http) {
        return {
            getAll: function (data) {
                return $http.get('/api/place');
            }
        };
    }]);
angular.module('MyApp')
  .factory('Rates', ["$http", function ($http) {
    return {
      fetch: function () {
        return $http.get('/api/rates');
      },
      add: function (data) {
        return $http.post('/api/rates', data);
      }
    };
  }]);
angular.module('MyApp')
  .factory('Users', ["$http", function ($http) {
    return {
      fetchForAdmin: function () {
        return $http.get('/api/users');
      },
      fetchForCustomer: function (data) {
        var p = {
          params: {
            customerId: data
          }
        };
        return $http.get('/api/users/getForCustomer', p);
      },
      add: function (data) {
        return $http.post('/api/users', data);
      },
      save: function (data) {
        return $http.put('/api/users/save', data);
      },
      delete: function (data) {
        return $http.put('/api/users/delete', data);
      },
      findUser: function (data) {
        var p = {
          params: {
            userId: data
          }
        };
        return $http.get('/api/users/findUser', p);
      }
    };
  }]);