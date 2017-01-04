angular
  .module('app.request', ['datatables'])
  .controller('RequestCtrl', function ($state, $http, RequestService, Helpers, authService) {
    const vm = this;
    vm.requests = [];
    vm.pendingRequest;

    vm.goProfile = (input) => {
      $state.go('prof', {
        input: input
      });
    };

    vm.init = () => {
      vm.cache = Helpers.getCache();
      RequestService
        .getAllRequests()
        .then((returnedRequests) => {
          vm.requests = returnedRequests.map(vm.editRequests).reverse();
        })
        .catch((error) => {
          console.log('Error returning requests', error);
        });
    };

    vm.editRequests = (request) => {
      request.userName = vm.cache.Users.filter((user) => {
        if (user.id === request.UserId) return user;
      })[0].name;
      request.categoryName = vm.cache.Category.filter((category) => {
        if (category.id === request.CategoryId) return category;
      })[0].name;
      return request;
    };

    vm.addRequest = () => {
      let userExists = authService.showCurrent();
      if (!userExists) {
        swal({
          title: 'Invalid Login',
          text: 'Please log in to make a request.',
          imageUrl: 'http://vignette2.wikia.nocookie.net/youtubepoop/images/4/4e/Tubby.png/revision/latest?cb=20140517044848'
        });
      } else {
        let UserId = authService.showCurrent().id;
        vm.UserId = UserId;
        RequestService
          .addRequest()
          .then((addedRequest) => {
            vm.pendingRequest = addedRequest;
            return Helpers.init();
          })
          .then((returnedCache) => {
            vm.cache = returnedCache;
            let modifiedRequest = vm.editRequests(vm.pendingRequest);
            vm.requests.unshift(modifiedRequest);
          })
          .catch((error) => {
            console.log('Error adding request', error);
          });
      }
    };

    if (Object.keys(Helpers.getCache()).length === 0) {
      Helpers
        .init()
        .then(() => {
          vm.init();
        });
    } else {
      vm.init();
    }

    return vm;
  });
