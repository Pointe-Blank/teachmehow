angular
  .module('app.lesson', [])
  .controller('LessonCtrl', function ($state, $stateParams, Helpers, authService, $http) {
    const vm = this;
    vm.currUserId = authService.showCurrent().id;
    console.log(vm.currUserId);
    if (!vm.currUserId) {
      $state.go('splash');
    }
    vm.id = $stateParams.input;

    vm.goLesson = (input) => {
      $state.go('lesson', {
        input: input
      });
    };

    vm.goProfile = (input) => {
      $state.go('prof', {
        input: input
      });
    };

    vm.bookLesson = function (ev) {
      swal({
        title: 'Contact Teacher',
        text: 'To book this lesson,\ncontact the teacher at:\n' + vm.Lesson.UserName.spare1,
        imageUrl: 'http://marketingland.com/wp-content/ml-loads/2015/12/email_ss_1920.png'
      });
    };

    vm.initLesson = () => {
      vm.Lesson = Helpers
        .getCache()
        .Master
        .filter(lesson => {
          if (lesson.id === +vm.id) return lesson;
        })[0];

      vm.relLessons = Helpers
        .getCache()
        .LessByCat
        .filter(lesson => {
          if (lesson.name === vm.Lesson.CategoryName.name) return lesson;
        })[0]
        .Lessons
        .filter(lesson => {
          if (lesson.name !== vm.Lesson.name) return lesson;
        });

      /**
       * ping the giphy api to get illustrate the lesson page
       */
      var fbId = vm.Lesson.UserName.auth.slice(9);
      var url = 'https://graph.facebook.com/' + fbId + '/picture?width=9999';
      vm.picture = url || 'http://victory-design.ru/sandbox/codepen/profile_card/avatar.svg';
      $http.get(`http://api.giphy.com/v1/gifs/search?q=${vm.Lesson.name}&api_key=dc6zaTOxFJmzC&limit=5`)
        .then(result => {
          vm.gifs = result.data.data.map(gif => {
            return gif.images.fixed_height.url;
          });
          vm.randGif = vm.gifs[Math.floor(Math.random() * vm.gifs.length)];
        });
        /**
         * fetch bookings and store bookings
         */
      vm.goClassroom = (input) => {
        $state.go('classroom', {
          input: input
        });
      };

      vm.goPrivateRoom = (input) => {
        $state.go('privateRoom', {
          input: input
        });
      };

      vm.bookings = Helpers
        .getCache()
        .Master
        .filter(lesson => {
          if (lesson.id === +vm.id) return lesson;
        })[0].bookings;

      vm.booked = !!vm.bookings.length;

      console.log('this is cache', Helpers.getCache());
      console.log('this is vm', vm);
    };

    if (Object.keys(Helpers.getCache()).length === 0) {
      Helpers.init()
        .then(() => {
          vm.initLesson();
        });
    } else {
      vm.initLesson();
    }

    return vm;
  });
