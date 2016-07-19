(function() {
  'use strict';

  angular
    .module('nana')
    .controller('infoController', infoController);

  /** @ngInject */
  infoController.$inject = ['$log', '$state', 'infoService'];

  function infoController($log, $state, infoService) {
    var vm = this;

    vm.addDog = addDog;
    vm.dogName = "";
    vm.breed = "";
    vm.birthday = "";
    vm.acquisitionDate = "";
    vm.color = "";
    vm.microchip = "";
    vm.registration = "";

    function addDog(){
      vm.dogInfo = {
        "dogName" : vm.dogName,
        "breed" : vm.breed,
        "birthday" : vm.birthday,
        "acquisitionDate" : vm.acquisitionDate,
        "color" : vm.color,
        "microchip" : vm.microchip,
        "registration" : vm.registration
      };

      infoService.pushData(vm.dogInfo)
      .then(function(err){
        if(err){
          $log.debug(err);
        } else {
          $log.debug("successfully pushed to firebase");
          $state.go("home");
        }
      });
    }
  }

}());
