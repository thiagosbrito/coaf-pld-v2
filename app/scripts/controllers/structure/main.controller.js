'use strict';

angular.module('wbaApp')

  .controller('MainController', [
    '$scope',
    '$theme',
    '$timeout',
    '$location',
    'apiLogin',
    '$state',
    'toaster',
    'Session',
    'SweetAlert',
    'user',
    '$localStorage',
    function($scope, $theme, $timeout, $location, apiLogin, $state, toaster, Session, SweetAlert, user, $localStorage) {
      
      if(apiLogin.isAuthenticated()) {
        $scope.user = user;
        $scope.isLoggedIn = true;
      }


      $scope.logout = function () {

        SweetAlert.swal({
          title: "Deseja sair?",
          // text: "Se você prosseguir, essa operaçao no poderá ser desfeita",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Prosseguir",
          cancelButtonText: "Cancelar",
          closeOnConfirm: true,
          closeOnCancel: true
        },
        function(isConfirm){
          if (isConfirm) {
            $state.go('logout');
          }
        });
      };

      $scope.layoutLoading = true;

      $scope.getLayoutOption = function(key) {
        return $theme.get(key);
      };

      $scope.setNavbarClass = function(classname, $event) {
        $event.preventDefault();
        $event.stopPropagation();
        $theme.set('topNavThemeClass', classname);
      };

      $scope.setSidebarClass = function(classname, $event) {
        $event.preventDefault();
        $event.stopPropagation();
        $theme.set('sidebarThemeClass', classname);
      };
      $scope.toggleLeftBar = function() {
        $theme.set('leftbarCollapsed', !$theme.get('leftbarCollapsed'));
      };
      $scope.toggleSearchBar = function($event) {
        $event.stopPropagation();
        $event.preventDefault();
        $theme.set('showSmallSearchBar', !$theme.get('showSmallSearchBar'));
      };

    }
  ]);