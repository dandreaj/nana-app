(function() {
  'use strict';

  angular
    .module('nana')
    .controller('authController', authController);

  /** @ngInject */
  function authController($log, $cordovaToast, $ionicModal, $scope, ionicToast, authService) {

    var vm = this;

    vm.signIn = signIn;
    vm.signOut = signOut;
    vm.createUser = createUser;
    vm.goSign = goSign;
    vm.backLogin = backLogin;
    vm.email = '';
    vm.password = '';
    vm.forgotPassword = forgotPassword;

    $ionicModal.fromTemplateUrl('templates/forgotPassword.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    function forgotPassword(email){
      authService.forgotPassword(email);
    }

    function signIn(email, password) {
      authService.signIn(email, password);
    }

    function signOut() {
      authService.signOut();
    }

    function createUser(email, password) {
      authService.createUser(vm.email, vm.password);
    }

    function goSign() {
      $state.go('sign');
    }

    function backLogin() {
      $state.go('login');
    }

  }
})();
