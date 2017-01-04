angular
.module('app.splash', ['datatables'])
.controller('SplashCtrl', function ($http, Helpers, $state, authService) {
  const vm = this;
  vm.cache;

  vm.goLesson = (input) => {
    if (!authService.showCurrent()) {
      swal({
        title: 'Invalid Login',
        text: 'Please log in to view lesson details.',
        imageUrl: 'http://vignette2.wikia.nocookie.net/youtubepoop/images/4/4e/Tubby.png/revision/latest?cb=20140517044848'
      });
    } else {
      console.log(input);
      $state.go('lesson', {input: input});
    }
  };

  vm.goProfile = (input) => {
    if (!authService.showCurrent()) {
      swal({
        title: 'Invalid Login',
        text: 'Please log in to view teacher details.',
        imageUrl: 'http://vignette2.wikia.nocookie.net/youtubepoop/images/4/4e/Tubby.png/revision/latest?cb=20140517044848'
      });
    } else {
      console.log(input);
      $state.go('prof', {input: input});
    }
  };

  if (!Object.keys(Helpers.getCache()).length) {
    Helpers.init()
      .then(() => {
        vm.cache = Helpers.getCache();
      });
  } else {
    vm.cache = Helpers.getCache();
  }

  return vm;
});
