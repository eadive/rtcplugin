'use strict';

/**
 * @ngdoc function
 * @name webrtcIiApp.controller:RoomCtrl
 * @description
 * # RoomCtrl
 * Controller of the webrtcIiApp
 */
angular.module('webrtcIiApp')
  .controller('RoomCtrl', ['$sce', 'VideoStream', '$location', '$routeParams', '$scope', 'Room',
  function ($sce, VideoStream, $location, $routeParams, $scope, Room) {

    if (!window.RTCPeerConnection || !navigator.getUserMedia) {
      $scope.error = 'WebRTC is not supported by your browser. You can try the app with Chrome and Firefox.';
      return;
    }

    var stream;

    $scope.peers = [];

    Room.on('peer.stream', function (peer) {
      console.log('Client connected, adding new stream');
      $scope.peers.push({
        id: peer.id,
        stream: URL.createObjectURL(peer.stream)
      });
    });
    Room.on('peer.disconnected', function (peer) {
      console.log('Client disconnected, removing stream');
      $scope.peers = $scope.peers.filter(function (p) {
        return p.id !== peer.id;
      });
    });

    $scope.getLocalVideo = function () {
      return $sce.trustAsResourceUrl(stream);
    };

    $scope.createRoom = function(classroom) {

      $scope.classroom = classroom.name;
      VideoStream.get()
      .then(function (s) {
        stream = s;
        Room.init(stream);
        stream = URL.createObjectURL(stream);
        if (classroom) {
          Room.createRoom(classroom.name)
          .then(function (roomId) {
            Room.joinRoom(roomId);
          });
        }
      }, function () {
        $scope.error = 'No audio/video permissions. Please refresh your browser and allow the audio/video capturing.';
      });

    }
  }]);
