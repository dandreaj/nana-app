(function() {
  'use strict';
  angular.module('nana')

  .factory('infoService', infoService);


  infoService.$inject = ['$log', '$firebaseArray', '$q'];
  /** @ngInject **/
  function infoService($log, $firebaseArray, $q) {

    var ref = firebase.database().ref();
    var service = {
      pushData: pushData
    };

    return service;

    function pushData(data) {
      var deferred = $q.defer();

      ref.push(data, function(err) {
          if (err) {
            deferred.reject(err);
          } else {
            deferred.resolve();
          }
        });
      return deferred.promise;
    }


  }

})();
