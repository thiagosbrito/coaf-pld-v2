'use strict';
angular.module('wbaApp')

  .controller('LoginController', [
    '$scope',
    '$rootScope',
    '$state',
    '$stateParams',
    'toaster',
    'apiLogin',
    '$timeout',
    function ($scope, $rootScope, $state, $stateParams, toaster, apiLogin, $timeout) {

      $scope.state = $state;

      $scope.verifySession = function () {
        if(apiLogin.isAuthenticated()) {
          $state.go('coafPld.dashboard')
        }
      }();

      $scope.doLogin = function (user) {
        var loginData = {j_username: user.username, j_password: user.password};
        apiLogin.doLogin(loginData).then(
          function (res) {
            $timeout(
              function (){
                if(apiLogin.isAuthenticated()) {
                  $state.go('coafPld.dashboard');
                }
              }
            ,1000)
          },
          function (err) {
            if (err.status == 405) {
              apiLogin.doLogout().then(
                function (res) {
                  apiLogin.doLogin(loginData).then(
                    function (res) {
                      $state.go('coafPld.dashboard');
                    }
                  )
                }
              )
            }
            toaster.pop('error','Authentication',err.statusText);
          }
        )
      }

    }
  ])