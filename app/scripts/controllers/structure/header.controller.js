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
        $state.go('logout');
      };

    }]
  )