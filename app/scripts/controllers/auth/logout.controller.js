'use strict';

angular.module('wbaApp')
.controller('LogoutController', [
  '$scope',
  '$state',
  'apiLogin',
  'Session',
  function ($scope, $state, apiLogin, Session) {

    if(apiLogin.isAuthenticated()) {
      apiLogin.doLogout().then(
        function (res) {
          Session.destroy();
          $state.go('login');
        },
        function (err) {
          if(err.status == 301) {
            Session.destroy();
            $state.go('login');  
          }
        }
      )
    }
    else {
      apiLogin.doLogout().then(
        function (res) {
          $state.go('login');
        },
        function (err) {
          console.log(err)
        }
      )
    }

  }
])