angular
  .module('app.prof', ['datatables'])
  .controller('ProfCtrl', function ($state, $stateParams, $scope, $http, authService, Helpers) {
    let vm = this;
    vm.cache = {};
    vm.cache = Helpers.getCache();

    vm.goLesson = (input) => {
      $state.go('lesson', {
        input: input
      });
    };

    function init () {
      /**
       * pulls the profile information for the current profile page
       * from the cache using the params from $state
       */
      vm.profile = vm.cache.Users.filter(user => {
        return user.id === +$stateParams.input;
      })[0];

      vm.allLessons = vm.cache.Master
        .filter(lesson => {
          if (lesson.UserName.id === +$stateParams.input) return lesson;
        });

      var fbId = vm.profile.auth.slice(9);
      var url = 'https://graph.facebook.com/' + fbId + '/picture?width=9999';
      vm.picture = url || 'http://victory-design.ru/sandbox/codepen/profile_card/avatar.svg';
      /**
      * The 'bio' information for the profile is stored on the server as JSON
      * data. This must be parsed back to an object, however new profiles might
      * not have bio data yet so the empty string must be accounted for or
      * else you will get json errors.
      */
      if (typeof vm.profile.bio === 'string' && vm.profile.bio !== '') {
        vm.profile.bio = JSON.parse(vm.profile.bio);
      }

      vm.title = vm.profile.bio && vm.profile.bio.title ?
        vm.profile.bio.title :
        'Knowledge Enthusiast';
      vm.blurb = vm.profile.bio && vm.profile.bio.blurb ?
        vm.profile.bio.blurb :
        'TeachMeHow.com member since\n' + vm.profile.createdAt;

      /**
       * myProfile is for determining if the profile being viewed
       * belongs to the currently logged in user. If it does, it
       * will be editable
       */
      if (authService.showCurrent()) {
        vm.myProfile = vm.profile.id === authService.showCurrent().id;
      }

      /**
       * watch for changes to profile information and send any
       * updates back to the database
       */
      $scope.$watch('vm.title', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          vm.profile.bio ?
            vm.profile.bio.title = newVal :
            vm.profile.bio = {
              title: newVal
            };
          $http.put('/api/users/' + vm.profile.id + '/bio', vm.profile.bio)
            .then(resp => console.log(resp));
        }
      });

      $scope.$watch('vm.blurb', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          vm.profile.bio ?
            vm.profile.bio.blurb = newVal :
            vm.profile.bio = {
              blurb: newVal
            };
          $http.put('/api/users/' + vm.profile.id + '/bio', vm.profile.bio)
            .then(resp => console.log(resp));
        }
      });

      $scope.$watch('vm.profile.name', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          vm.profile.name = newVal;
          $http.put('/api/users/' + vm.profile.id + '/name', {
            name: vm.profile.name
          })
            .then(resp => console.log(resp));
        }
      });
    }

    if (!Object.keys(vm.cache).length) {
      Helpers.init()
        .then(() => {
          vm.cache = Helpers.getCache();
          init();
        });
    } else {
      init();
    }

    return vm;
  });
