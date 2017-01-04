angular
.module('app.privateRoom', [])
.controller('PrivateRoomCtrl', function ($scope, $state, $stateParams, Helpers, authService, $http) {
  const vm = this;
  let userExists = authService.showCurrent();
  if (!userExists) {
    $state.go('splash');
  }
  vm.id = $stateParams.input;

  vm.goLesson = (input) => {
    $state.go('lesson', {
      input: input
    });
  };

  vm.goClassroom = (input) => {
    $state.go('classroom', {
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

  vm.initClassroom = () => {
    vm.Lesson = Helpers
      .getCache()
      .Master
      .filter(lesson => {
        if (lesson.id === +vm.id) return lesson;
      })[0];

    console.log('INSIDE', vm.Lesson);
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

    var fbId = vm.Lesson.UserName.auth.slice(9);
    var url = 'https://graph.facebook.com/' + fbId + '/picture?width=9999';
    vm.picture = url || 'http://victory-design.ru/sandbox/codepen/profile_card/avatar.svg';
  };

  if (Object.keys(Helpers.getCache()).length === 0) {
    Helpers.init()
      .then(() => {
        vm.initClassroom();
      });
  } else {
    vm.initClassroom();
  }

  return vm;
});
