angular
    .module('app.youtube')
    .directive('youtubeStream', function () {
        // use this tag for video <youtube-stream></youtube-stream>
      return {
        restrict: 'E',
        templateUrl: '/app/common/youtube/youtube.template.html',
        controller: 'YoutubeController',
        controllerAs: 'vmYoutube'
      };
    })
;
