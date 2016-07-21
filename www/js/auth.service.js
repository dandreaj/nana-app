(function() {
  'use strict';
  angular.module('nana')

  .factory('authService', authService);


  authService.$inject = ['$log', '$firebaseAuth', '$state'];
  /** @ngInject **/
  function authService($log, $firebaseAuth, $state) {

    var authSession = $firebaseAuth();

    authSession.$onAuthStateChanged(function(user) {
      if (!user) {
        $log.debug('no current user');
        $state.go('welcome');
      } else {
        $log.debug(user.email, 'is logged in');
        $state.go('main');
      }
    });

    var service = {
      checkAuthSession: checkAuthSession,
      signIn: signIn,
      signOut: signOut
    };

    return service;

    function checkAuthSession() {
      return authSession.$requireSignIn();
    }

    function signIn(email, password) {
      authSession.$signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        $log.debug(errorCode, errorMessage);
        // ...
      });
    }

    function signOut() {
      authSession.$signOut();
    }


  }

})();
