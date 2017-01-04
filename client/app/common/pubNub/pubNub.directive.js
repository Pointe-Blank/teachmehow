angular
    .module('app.pubNub')
    .directive('pubnubStream', function () {
        // use this tag for video <youtube-stream></youtube-stream>
      return {
        restrict: 'E',
        templateUrl: '/app/common/pubNub/pubNub.template.html',
        controller: 'PubNubController',
        controllerAs: 'vmPubNub'
      };
    })
;
