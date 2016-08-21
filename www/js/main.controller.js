(function() {
  'use strict';

  angular
    .module('nana')
    .controller('mainController', mainController);

  /** @ngInject */
  mainController.$inject = ['$log', '$state', 'authService'];

  function mainController($log, $state, authService) {
    var vm = this;

    vm.signOut = signOut;

    function signOut() {
      authService.signOut();
      $state.go('welcome');
    }
  }

}());
