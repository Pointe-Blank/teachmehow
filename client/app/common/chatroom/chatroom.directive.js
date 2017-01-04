(function () {
  angular
    .module('app.chatroom')
    // .controller('NavBarController'). This directive is associating the navBar template to the NavBarController.
    .directive('chatroom', function () {
      return {
        restrict: 'E',
        templateUrl: '/app/common/chatroom/chatroom.template.html',
        controller: 'ChatroomCtrl',
        controllerAs: 'vmCR'
      };
    });
})();
