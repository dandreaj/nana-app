(function() {
  'use strict';

  angular
    .module('nana')
    .controller('somethingController', somethingController);

  /** @ngInject */
  somethingController.$inject = ['$log', '$state', 'authService','userService'];

  function somethingController($log, $state, authService, userService) {
    var vm = this;

    vm.uploadImage = uploadImage;
    authService.currentUser().then(function(data) {
      vm.userInfo = data;
    });

    function uploadImage() {
      $log.debug(vm.imageFile);
      userService.uploadImage(vm.imageFile, vm.userInfo.userId).then(function(data) {
        vm.userInfo.photoUrl = data;
      });
    }

  }

}());
