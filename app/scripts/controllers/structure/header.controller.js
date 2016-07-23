'use strict';

angular.module('wbaApp')
  .controller('HeaderController',[
    '$scope',
    'Session',
    '$theme',
    'apiLogin',
    '$state',
    function ($scope, Session, $theme, apiLogin, $state) {

      $scope.toggleLeftBar = function () {
        $theme.set('leftbarCollapsed', !$theme.get('leftbarCollapsed'));
      }

      $scope.logout = function () {
        apiLogin.doLogout().then(
          function (res) {
            $state.go('login');
          },
          function (err) {
            if(err.status == 301) {
              $state.go('login');
            }
            toaster.pop('error','Logout',err.statusText);
          }
        )
      };

    }]
  )