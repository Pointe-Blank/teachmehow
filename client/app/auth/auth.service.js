angular.module('teachMe')
.factory('authService', function ($q, $http, $state, lock, Helpers, authManager) {
  /**
   * connect the profile sent back from Auth0 with the profile from our
   * database. If the profile does not exist in our database, create it.
   */
  let connectProfile = (profile) => {
    $http.post('/api/login', {
      /**
       * The 'auth' field in the user database must be identical to the
       * user_id field from the profile object sent back by auth0 in
       * order to connect the accounts
       */
      auth: profile.user_id
    })
    .then((user) => {
      /**
       * If the user exists in our database, the post request to /api/login
       * will return the user profile as the first entry in an array. If the
       * user does not exist, teh request will send back an empty array
       */
      if (user.data[0]) {
        currentUser = user.data[0];
      } else {
        $http.post('/api/users', {
          name: profile.nickname,
          teachFlag: false,
          rating: null,
          bio: '',
          picture: profile.picture,
          auth: profile.user_id,
          spare1: profile.email || profile.link
        })
        .then((user) => {
          currentUser = user.data;
          if (currentUser.teacherFlag) {
            /**
             * Re-initialize Helpers to update the cache with new user
             * information
             */
            Helpers.init()
            .then($state.go('dash', {
              input: currentUser.id
            }));
          } else {
            Helpers.init()
            .then($state.go('prof', {
              input: currentUser.id
            }));
          }
        });
      }
    });
  };

  /**
   * check to see if user is already logged in. If they are, fetch
   * auth0 profile and then use that to fetch database profile
   */
  let currentUser = window.localStorage.getItem('id_token');
  if (currentUser) {
    lock.getProfile(currentUser, (err, profile) => {
      if (err) throw new Error(err);
      connectProfile(profile);
    });
  }

  /**
   * set up the logic for when a user authenticates
   * This method is called from .run in app.js
   */
  let registerAuthListener = () => {
    lock.on('authenticated', (authResult) => {
      window.localStorage.setItem('id_token', authResult.idToken);
      authManager.authenticate();
      /**
       * Use the token sent back to get full Auth0 profile
       * information, then connect that to database profile
       */
      lock.getProfile(authResult.idToken, (err, profile) => {
        if (err) throw new Error(err);
        connectProfile(profile);
      });
    });
  };

  let becomeTeacher = () => {
    return $http.put('/api/users/' + currentUser.id + '/teach', {
      teachFlag: true
    });
  };

  /** basic authentication functionality */
  let showCurrent = function () {
    return currentUser;
  };

  let login = () => {
    lock.show();
  };

  let logout = () => {
    window.localStorage.removeItem('id_token');
    authManager.unauthenticate();
    currentUser = false;
    $state.go('splash');
  };

  /** expose public methods */
  return {
    login: login,
    logout: logout,
    showCurrent: showCurrent,
    becomeTeacher: becomeTeacher,
    registerAuthListener: registerAuthListener
  };
});
