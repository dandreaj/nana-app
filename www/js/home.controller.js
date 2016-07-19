(function() {
  'use strict';

  angular
    .module('nana')
    .controller('homeController', homeController);

  /** @ngInject */
  homeController.$inject = ['$log', 'mainService'];

  function homeController($log, mainService) {
    var vm = this;

    vm.test = "hello world";

    vm.testingFirebase = testingFirebase;

    function testingFirebase() {
      mainService.getData().
      then(function(data) {
        $log.debug(data);
        vm.test = data;
      });
    }
  }
  // var homeCtrl = function($scope) {
  //   $scope.items = [];
  //   $scope.addMe = function(fname, lname) {
  //     if (fname, lname) {
  //       $scope.items.push({
  //         fname: this.fname,
  //         lname: this.lname
  //       });
  //     }
  //   };
  //   $scope.deleteItem = function(item) {
  //     var index = $scope.items.indexOf(item);
  //     if (index > -1) {
  //       $scope.items.splice(index, 1);
  //     }
  //   };
  // };
  //
  // homeCtrl.$inject = ['$scope'];
  // angular.module('nana').controller('homeCtrl', homeCtrl);

}());
