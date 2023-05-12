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
