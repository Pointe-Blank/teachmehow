angular.module('teachMe', [
  'xeditable',
  'auth0.lock',
  'angular-jwt',
  'app.dash',
  'app.prof',
  'app.lesson',
  'app.request',
  'app.splash',
  'app.helpers',
  'app.youtube',
  'app.classroom',
  'app.chatroom',
  'app.pubNub',
  'app.privateRoom',
  'ui.router'
])
  .config(config)
  .run(run);

function config ($stateProvider,
  $urlRouterProvider,
  jwtOptionsProvider,
  lockProvider) {
  $urlRouterProvider.otherwise('/splash');

  $stateProvider
    .state('splash', {
      url: '/splash',
      templateUrl: 'app/components/splash/splash.html',
      controller: 'SplashCtrl as vm'
    })
    .state('dash', {
      url: '/dash/:input',
      templateUrl: 'app/components/dash/dash.html',
      controller: 'DashCtrl as vm'
    })
    .state('lesson', {
      url: '/lesson/:input',
      templateUrl: 'app/components/lesson/lesson.html',
      controller: 'LessonCtrl as vm'
    })
    .state('prof', {
      url: '/prof/:input',
      templateUrl: 'app/components/prof/prof.html',
      controller: 'ProfCtrl as vm'
    })
    .state('request', {
      url: '/request',
      templateUrl: 'app/components/request/request.html',
      controller: 'RequestCtrl as vm'
    })
    .state('classroom', {
      url: '/lesson/:input/classroom',
      templateUrl: 'app/components/classroom/classroom.template.html',
      controller: 'ClassroomCtrl as vm'
    })
    .state('privateRoom', {
      url: '/lesson/:input/privateRoom',
      templateUrl: 'app/components/privateRoom/privateRoom.template.html',
      controller: 'PrivateRoomCtrl as vm'
    });

  lockProvider.init({
    clientID: 'n2ZOtt8oFInDvBD34j8741C1UV3PBh61',
    domain: 'teach-me-how.auth0.com'
  });

  /**
   * configuration for agular.jwt. If a user is logged
   * in, it will pull the id_token from local storage.
   */
  jwtOptionsProvider.config({
    tokenGetter: function () {
      return window.localStorage.getItem('id_token');
    }
  });
}

function run ($rootScope, authService, authManager, lock, editableOptions, editableThemes) {
  // set `default` theme for xEditable
  editableOptions.theme = 'default';

  // overwrite submit button template for xEditable
  editableThemes['default'].submitTpl = '<button type="submit">ok</button>';

  // Put the authService on $rootScope so its methods
  // can be accessed from the nav bar
  $rootScope.authService = authService;

  // Register the authentication listener that is
  // set up in auth.service.js
  authService.registerAuthListener();

  // Register the synchronous hash parser
  // when using UI Router
  lock.interceptHash();

  /**
   * Use the authManager from angular-jwt to check forf
   * the user's authentication state when the page is
   * refreshed and maintain authentication. Will use
   * the setting set in jwtOptionsProvider.config
   */
  authManager.checkAuthOnRefresh();
}
