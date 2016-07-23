'use strict';
angular.module('wbaApp')

  .controller('LoginController', [
    '$scope',
    '$rootScope',
    '$state',
    '$stateParams',
    'toaster',
    'apiLogin',
    function ($scope, $rootScope, $state, $stateParams, toaster, apiLogin) {

      $scope.state = $state;

      $scope.doLogin = function (user) {
        var loginData = {j_username: user.username, j_password: user.password};
        apiLogin.doLogin(loginData).then(
          function (res) {
            console.log(res);
            $state.go('coafPld.dashboard');
          },
          function (err) {
            toaster.pop('error','Authentication',err.statusText);
          }
        )
      }

    }
  ])