(function() {
  'use strict';

  angular
    .module('nana')
    .controller('authController', authController);

  /** @ngInject */
  function authController(authService) {

    var vm = this;

    vm.signIn = signIn;
    vm.signOut = signOut;
    vm.email = "";
    vm.password = "";

    function signIn(email, password) {
      authService.signIn(email, password);
    }

    function signOut(){
      authService.signOut();
    }

  }
})();
