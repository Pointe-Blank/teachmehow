angular
.module('app.youtube', [])
.controller('YoutubeController', function ($scope, $state, Helpers, $sce, $stateParams) {
  let vmYoutube = this;
  vmYoutube.channelId;
  vmYoutube.lessonID = $stateParams.input;

  vmYoutube.init = function () {
    let youtubeId = Helpers.getCache().Lessons[vmYoutube.lessonID - 1].youtubeKey;
    console.log('fadsa', vmYoutube.channelId);
    vmYoutube.channelId = $sce.trustAsResourceUrl('https://www.youtube.com/embed/live_stream?channel=' + youtubeId);
  };

  if (Object.keys(Helpers.getCache()).length === 0) {
    Helpers.init()
      .then(() => {
        vmYoutube.init();
      });
  } else {
    vmYoutube.init();
  }
});
