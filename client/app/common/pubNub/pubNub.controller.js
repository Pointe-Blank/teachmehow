angular
.module('app.pubNub', [])
.controller('PubNubController', function ($scope, $state, Helpers, $sce, $stateParams) {
  let vmPubNub = this;

  var videoOut = document.getElementById('vid-box');

  vmPubNub.login = function (form) {
    console.log('heres the data ', form);
    var phone = window.phone = PHONE({
      number: form.username || 'Anonymous', // listen on username line else Anonymous
      publish_key: 'pub-c-d9aa0851-d09f-4bf5-ba90-1fc894f4df94',
      subscribe_key: 'sub-c-4bb7bf1c-bd94-11e6-b490-02ee2ddab7fe'
    });
    phone.ready(function () { });
    phone.receive(function (session) {
      session.connected(function (session) { videoOut.appendChild(session.video); });
      session.ended(function (session) { videoOut.innerHTML = ''; });
    });
    console.log('hello');
    return false;   // So the form does not submit.
  };

  vmPubNub.makeCall = function (form) {
    console.log('heres number ', form);
    if (!window.phone) alert('Login First!');
    else phone.dial(form.number);
    return false;
  };
});
