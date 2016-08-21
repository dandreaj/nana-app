(function() {
  'use strict';
  angular.module('nana')

  .factory('authService', authService);


  authService.$inject = ['$log', '$firebaseAuth', '$q', '$state', 'ionicToast'];
  /** @ngInject **/
  function authService($log, $firebaseAuth, $q, $state, ionicToast) {

    var auth = firebase.auth();
    var authSession = $firebaseAuth();
    var ref = firebase.database().ref();
    var authData = authSession.$getAuth();

    var service = {
      checkAuthSession: checkAuthSession,
      signIn: signIn,
      signOut: signOut,
      createUser: createUser,
      currentUser: currentUser,
      forgotPassword: forgotPassword
    };

    return service;

    function checkAuthSession() {
      return authSession.$requireSignIn();
    }

    function forgotPassword(emailAddress) {
      auth.sendPasswordResetEmail(emailAddress).then(function() {
        // Email sent.
        $log.debug('email sent');
      }, function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        $log.debug(errorCode, errorMessage);
      });
    }

    function signIn(email, password) {
      authSession.$signInWithEmailAndPassword(email, password)
        .then(function(auth) {
          $log.debug("User " + auth.uid + " signed in successfully!");
          $state.go('main.home');
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          $log.debug(errorCode, errorMessage);
          ionicToast.show(errorMessage, 'top', false, 2500);
        });
    }

    function signOut() {
      authSession.$signOut();
    }

    function createUser(email, password) {
      authSession.$createUserWithEmailAndPassword(email, password)
        .then(function(firebaseUser) {
          $log.debug("User " + firebaseUser.uid + " created successfully!");
          ref.child("users").child(firebaseUser.uid).set({
            email: email,
            userType: "owner"
              // dateRegistered: moment.utc().valueOf()
          });
          $state.go('main.home');
        }).catch(function(error) {
          if (error) {
            switch (error.code) {
              case "auth/email-already-in-use":
                $log.debug("Error creating user:", error);
                break;
              case "auth/invalid-email":
                $log.debug("Error creating user:", error);
                break;
              default:
                $log.debug("Error creating user:", error);
            }
          }
        });
    }

    function currentUser() {
      var deferred = $q.defer();
      var user = firebase.auth().currentUser;
      if (user != null) {
        ref.child('users').child(user.uid).once('value').then(function(snapshot) {
          var userInfo = {
            email: user.email,
            userType: user.userType,
            created: user.dateRegistered
          };
          deferred.resolve(userInfo);
        });
      }
      return deferred.promise;
    }


  }

})();
