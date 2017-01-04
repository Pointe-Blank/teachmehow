/**
 * angular 1.5 component for the auth/profile
 * buttons on the navbar
 */
angular.module('teachMe')
.component('auth', {
  templateUrl: 'app/auth/auth.html',
  controller: 'AuthCtrl',
  controllerAs: 'vm'
});
