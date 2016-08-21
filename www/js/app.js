// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('nana', [
  'ionic',
  'firebase',
  'angularMoment',
  'ngCordova',
  'ionic-datepicker',
  'ionic-toast',
  'aCarousel'
])

.config(function($stateProvider, $urlRouterProvider) {

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyDIoaVit3N8f4XmONC1CFA-e9-Ey6RDUrg",
      authDomain: "nana-94c76.firebaseapp.com",
      databaseURL: "https://nana-94c76.firebaseio.com",
      storageBucket: "nana-94c76.appspot.com",
    };
    firebase.initializeApp(config);

    //routes
    $urlRouterProvider.when('/main', '/main/home');
    $urlRouterProvider.otherwise('/welcome');
    $stateProvider
      .state('main', {
        url: '/main',
        // abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'mainController',
        controllerAs: 'vm',
        resolve: {
          checkAuth: ['authService', function(authService) {
            return authService.checkAuthSession();
          }],
          animalData: ['infoService', function(infoService) {
            return infoService.getAnimalData();
          }]
        }
      })
      .state('main.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: './templates/home.html',
            controller: 'homeController',
            controllerAs: 'vm'
          }
        }
      })
      .state('main.settings', {
        url: '/settings',
        views: {
          'menuContent': {
            templateUrl: './templates/settings.html'
          }
        }
      })
      .state('main.something', {
        url: '/something',
        views: {
          'menuContent': {
            templateUrl: './templates/something.html',
            controller: 'somethingController',
            controllerAs: 'vm'
          }
        }
      })
      .state('main.addInfo', {
        url: '/addInfo',
        views: {
          'menuContent': {
            templateUrl: './templates/addInfo.html'
          }
        }
      })
      .state('welcome', {
        url: '/welcome',
        templateUrl: './templates/welcome.html',
        controller: 'authController',
        controllerAs: 'vm'
      })
      // .state('addInfo', {
      //   url: '/addInfo',
      //   views: {
      //     'menuContent': {
      //       templateUrl: './templates/addInfo.html'
      //     }
      //   }
      // templateUrl: './templates/addInfo.html',
      // controller: 'infoController',
      // controllerAs: 'vm'
      // resolve: {
      //   currentUser: ['authService', function(authService){
      //     return authService.currentUser();
      //   }]
      // }
      // })
      .state('register', {
        url: '/register',
        templateUrl: './templates/register.html',
        controller: 'authController',
        controllerAs: 'vm'
      });
  })
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });
//   .run(runBlock);
//
//
// function runBlock($rootScope, $log, $state) {
//   var runScopeOn = $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
//     if (error === "AUTH_REQUIRED") {
//       $state.go('login');
//     }
//   });
//   $log.debug('runBlock end');
//   $rootScope.$on('$destroy', runScopeOn);
// }
