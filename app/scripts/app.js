'use strict';

/**
 * @ngdoc overview
 * @name webrtcIiApp
 * @description
 * # webrtcIiApp
 *
 * Main module of the application.
 */
angular
  .module('webrtcIiApp', []);

angular
  .module('webrtcIiApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/room/:roomId', {
        templateUrl: 'views/room.html',
        controller: 'RoomCtrl'
      })
      .when('/room', {
        templateUrl: 'views/room.html',
        controller: 'RoomCtrl'
      })
      .otherwise({
        redirectTo: '/room'
      });
  });

Object.setPrototypeOf = Object.setPrototypeOf || function(obj, proto) {
  obj.__proto__ = proto;
  return obj; 
};