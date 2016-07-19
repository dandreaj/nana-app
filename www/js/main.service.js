(function() {
  'use strict';
  angular.module('nana')

  .factory('mainService', mainService);


  mainService.$inject = ['$log', '$firebaseArray', '$q'];
  /** @ngInject **/
  function mainService($log, $firebaseArray, $q) {

    var ref = firebase.database().ref();
    var service = {
      getData: getData
    };

    return service;

    function getData() {
      var deferred = $q.defer();
      var usersRef = ref.child('users');
      var userInfo = $firebaseArray(usersRef).$loaded();
      deferred.resolve(userInfo);

      return deferred.promise;
    }


  }

})();
