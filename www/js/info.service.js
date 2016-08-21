(function() {
  'use strict';
  angular.module('nana')

  .factory('infoService', infoService);


  infoService.$inject = ['$log', '$rootScope', '$firebaseArray', '$q'];
  /** @ngInject **/
  function infoService($log, $rootScope, $firebaseArray, $q) {

    var ref = firebase.database().ref();
    var service = {
      pushData: pushData,
      getAnimalData: getAnimalData
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

    function getAnimalData() {
      var deferred = $q.defer();
      // var animalData = [];
      var animalDataRef = ref.child('animals').child('123kjl123j213');
      var animalData = $firebaseArray(animalDataRef);
      var animalArray = [];

      animalData.$loaded()
        .then(function() {
          angular.forEach(animalData, function(animalData) {
            animalArray.push(animalData);
          });
          deferred.resolve(animalArray);
        });

      // animalDataRef.on('value', function(snapshot) {
      //   snapshot.forEach(function(childSnapshot) {
      //     var childData = childSnapshot.val();
      //     animalData.push(childData);
      //   });
      //   deferred.resolve(animalData);
      // });
      return deferred.promise;
    }


  }

})();
