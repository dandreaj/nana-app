(function() {
  'use strict';

  angular
    .module('nana')
    .controller('infoController', infoController);

  /** @ngInject */
  infoController.$inject = ['$log', '$state', 'userService', 'currentUser'];

  function infoController($log, $state, userService, currentUser) {
    var vm = this;
    // var ipObj1 = {
    //   callback: function(val) { //Mandatory
    //     console.log('Return value from the datepicker popup is : ' + val, new Date(val));
    //   }
      // disabledDates: [ //Optional
      //   new Date(2016, 2, 16),
      //   new Date(2015, 3, 16),
      //   new Date(2015, 4, 16),
      //   new Date(2015, 5, 16),
      //   new Date('Wednesday, August 12, 2015'),
      //   new Date("08-16-2016"),
      //   new Date(1439676000000)
      // ],
      // from: new Date(2012, 1, 1), //Optional
      // to: new Date(2016, 10, 30), //Optional
      // inputDate: new Date(), //Optional
      // mondayFirst: true, //Optional
      // disableWeekdays: [0], //Optional
      // closeOnSelect: false, //Optional
      // templateType: 'popup' //Optional
    // };



    vm.addAnimal = addAnimal;
    vm.currentUser = currentUser;
    vm.animalName = "";
    vm.breed = "";
    vm.birthday = "";
    vm.acquisitionDate = "";
    vm.color = "";
    vm.microchip = "";
    vm.registration = "";
    vm.openDatePicker = openDatePicker;

    function openDatePicker(){
      $log.debug('here!');
    }

    function addAnimal() {
      $log.debug(currentUser);
      var animalInfo = {
        "animalName": vm.animalName,
        "breed": vm.breed,
        "birthday": vm.birthday,
        "dateAcquired": vm.dateAcquired,
        "color": vm.color,
        "microchip": vm.microchip,
        "registration": vm.registration
      };
      userService.addAnimal(animalInfo);
    }

  }

}());
