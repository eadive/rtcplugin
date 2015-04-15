'use strict';

/**
 * @ngdoc service
 * @name webrtcIiApp.Io
 * @description
 * # Io
 * Factory in the webrtcIiApp.
 */
angular.module('webrtcIiApp')
  .factory('Io', function () {
    if (typeof io === 'undefined') {
      throw new Error('Socket.io required');
    }
    return io;
  });
