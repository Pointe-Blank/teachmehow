angular
  .module('app.dash', ['datatables'])
  .controller('DashCtrl', function ($scope, $state, $stateParams, authService, Helpers, $http) {
    if (!authService.showCurrent()) {
      $state.go('splash');
    }
    let vm = this;
    vm.lesson = {
      name: '',
      category: '',
      details: '',
      youtubeKey: ''
    };
    vm.teacherId = authService.showCurrent().id;
    vm.goLesson = (input) => {
      console.log(input);
      $state.go('lesson', {
        input: input
      });
    };
    vm.initDash = () => {
      vm.teacher = Helpers
        .getCache()
        .LessByUser
        .filter(user => {
          if (user.id === +vm.teacherId) return user;
        })[0];
    };

    vm.submitForm = function (isValid) {
      if (isValid) {
        let body = {
          userName: vm.teacher.name,
          name: vm.lesson.name,
          category: vm.lesson.category,
          details: vm.lesson.details,
          youtubeKey: vm.lesson.youtubeKey
        };
        $http.post('/api/lessons', body)
          .then(result => {
            console.log('Response from server:', result);
            vm.lesson.$setPristine;
            for (let key in vm.lesson) {
              vm.lesson[key] = '';
            }
            /**
             * reinitialize cache since database has changed
             */
            Helpers.init()
              .then(() => {
                vm.initDash();
              });
          })
          .catch(err => {
            console.log('Error creating new lesson', err);
            vm.lesson.$setPristine;
            for (let key in vm.lesson) {
              vm.lesson[key] = '';
            }
          });
      } else {
        let invalid = '';
        for (let key in vm.lesson) {
          if (vm.lesson[key].length === 0) {
            invalid += key + ', ';
          }
        }
        window.alert('To create a new lesson, please correct the following: \n' + invalid.substr(0, invalid.length - 2));
      }
    };

    if (Object.keys(Helpers.getCache()).length === 0) {
      Helpers.init()
          .then(() => {
            vm.initDash();
          });
    } else {
      vm.initDash();
    }

    return vm;
  });
