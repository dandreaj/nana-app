(function() {
  'use strict';

  angular
    .module('nana')
    .controller('homeController', homeController);

  /** @ngInject */
  homeController.$inject = ['$log', '$rootScope','mainService', 'infoService', 'authService', 'animalData', '$scope'];

  function homeController($log, $rootScope, mainService, infoService, authService, animalData, $scope) {
    var vm = this;

    vm.uploadImage = uploadImage;
    vm.itemSelected = [];
    vm.options = {
      unselectOthers: false
    };
    vm.carouselOptions4 = {
      carouselId: 'carousel-4',
      align: 'centerOnSelect',
      selectFirst: true,
      centerOnSelect: true,
      template: 'templates/demo-1.html',
    };
    // vm.getAnimalData = getAnimalData;
    vm.onSelectCarousel = onSelectCarousel;
    vm.carouselData4 = animalData;

    authService.currentUser().then(function(data) {
      vm.userInfo = data;
    });

    // $scope.$watch(function() {
    //   return infoService.getAnimalData;
    // }, function(newObj) {
    //   $log.debug(newObj);
    //   $log.debug('animal data has changed:', newObj);
    //   vm.carouselData4 = newObj;
    // }, true);

    function onSelectCarousel(item) {
      console.log('Carousel item selected:', item);
      vm.itemSelected = item;

      // unselect all carousel with id that contains string except one
      if (vm.options.unselectOthers) {
        $scope.$broadcast('a-carousel.desactivateItem', {
          idContains: 'carousel-',
          except: item.carouselId
        });
      }
    }

    function uploadImage() {
      authService.uploadImage(vm.imageFile, vm.userInfo.userId).then(function(data) {
        vm.userInfo.photoUrl = data;
      });
    }

  }

}());
