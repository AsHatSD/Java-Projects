angular.module('MyApp', ['ngRoute', 'satellizer', 'lr.upload', 'angularTrix', 'ui.bootstrap'])
  .config(function ($routeProvider, $locationProvider, $authProvider) {
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
  })
  .run(function ($rootScope, $window) {
    if ($window.localStorage.user) {
      $rootScope.currentUser = JSON.parse($window.localStorage.user);
    }
  });
