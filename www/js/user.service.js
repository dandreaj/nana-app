(function() {
  'use strict';
  angular.module('nana')

  .factory('userService', userService);


  userService.$inject = ['$log', '$firebaseArray', '$q'];
  /** @ngInject **/
  function userService($log, $firebaseArray, $q) {

    var ref = firebase.database().ref();
    var storageRef = firebase.storage().ref();
    var animalRef = ref.child("animals");
    var currentUser = currentUser;

    var service = {
      addAnimal: addAnimal,
      uploadImage: uploadImage
    };


    return service;

    function addAnimal(animalInfo) {
      $log.debug(userInfo);
      animalRef.child("123kjl123j213").push(animalInfo);
    }

    function updateUserProfile(url) {
        var user = firebase.auth().currentUser;
        user.updateProfile({
            photoURL: url
        }).then(function() {
            $log.debug("Update successful.");
        }, function(error) {
            $log.debug(error);
        });
    }

    function uploadImage(file, uid) {
        var deferred = $q.defer();
        var uploadTask = storageRef.child('images/' + file.name).put(file);
        uploadTask.on('state_changed', function(snapshot) {
            // Observe state change events such as progress, pause, and resume
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            $log.debug('Upload is ' + progress + '% done');
        }, function(error) {
            // Handle unsuccessful uploads
            deferred.reject(error);
            $log.debug(error);
        }, function() {
            // Handle successful uploads on complete
            var downloadURL = uploadTask.snapshot.downloadURL;
            updateUserProfile(downloadURL);
            deferred.resolve(downloadURL);
        });
        return deferred.promise;
    }

  }
})();
