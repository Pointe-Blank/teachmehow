(function () {
  'use strict';

  angular
    .module('app.chatroom')
    .controller('ChatroomCtrl', ChatroomCtrl);

  ChatroomCtrl.$inject = ['socket', 'authService', 'Helpers', '$stateParams', '$scope', '$anchorScroll', '$location'];

  function ChatroomCtrl (socket, authService, Helpers, $stateParams, $scope, $location) {
    var vmCR = this;
    vmCR.currentClass;
    vmCR.currentUserName = '';
    vmCR.text = '';
    vmCR.messages;

    vmCR.gotoBottom = function () {
      var objDiv = document.getElementById('chat');
      objDiv.scrollTop = objDiv.scrollHeight;
    };

    vmCR.chatInit = function () {
      vmCR.currentClass = parseInt($stateParams.input);
      vmCR.currentUserName = authService.showCurrent().name;
      socket.emit('send-room', parseInt($stateParams.input));
      socket.on('get-room', function (data) {
        if (data.id === vmCR.currentClass) {
          console.log('THIS IS CHATS', data.id);
          console.log('THIS IS CURRENT CLASS', vmCR.currentClass);
          vmCR.messages = data.chat.map(function (message) {
            return JSON.parse(message);
          });
          console.log('vmCR.messages = ', vmCR.messages);
          vmCR.gotoBottom();
          $scope.$digest();
        }
      });
    };

    window.setTimeout(function () {
      vmCR.gotoBottom();
    }, 500);

    vmCR.sendMessage = function () {
      console.log('THIS IS CURRENT CHAT', vmCR.messages.text);
      var chat = {
        'id': vmCR.currentClass,
        'msg': {
          'user': vmCR.currentUserName,
          'text': vmCR.messages.text,
          'date': new Date()
        }
      };
      socket.emit('send-message', chat);
      vmCR.messages.text = '';
    };

    socket.on('get-message', function (data) {
      if (data.id === vmCR.currentClass) {
        var chat = {
          user: data.msg.user,
          text: data.msg.text,
          date: data.msg.date
        };

        vmCR.messages.push(chat);
        $scope.$digest();
        vmCR.gotoBottom();
      }
    });

    if (Object.keys(Helpers.getCache()).length === 0) {
      Helpers.init()
      .then(() => {
        vmCR.chatInit();
      });
    } else {
      vmCR.chatInit();
    }
  }
})();
