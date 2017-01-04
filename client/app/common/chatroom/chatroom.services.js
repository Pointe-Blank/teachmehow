(function () {
  'use strict';

  angular
    .module('app.chatroom')
    .factory('socket', socket);

  function socket ($location) {
    var socket = io.connect($location.absUrl());
    return socket;
  }
})();
