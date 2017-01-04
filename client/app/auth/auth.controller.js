angular.module('teachMe')
.controller('AuthCtrl', function ($scope, $state, $timeout, authService) {
  let vm = this;
  vm.authService = authService;
  authService.registerAuthListener();
  /**
   * $timeout sets a delay to check if the logged-in
   * user is registered as a teacher. This accounts
   * for asynch issues with the auth service and makes
   * the become teacher and teacher dash buttons show/
   * hide themselves appropriately
   */
  $timeout(() => {
    vm.isTeach = authService.showCurrent().teachFlag;
  }, 100);

  vm.becomeTeacher = () => {
    authService.becomeTeacher()
    .then(() => {
      vm.isTeach = true;
      $state.go('dash');
    });
  };

/**
 * input object directs the state router to proper
 * profile/dash pages
 */
  vm.goDash = () => {
    $state.go('dash', {
      input: authService.showCurrent().id
    });
  };

  vm.goProf = () => {
    $state.go('prof', {
      input: authService.showCurrent().id
    });
  };

  return vm;
});
