angular.module('wbaApp')
  .controller('MainController', [
    '$scope',
    '$theme',
    '$timeout',
    'progressLoader',
    'wijetsService',
    '$location',
    'apiLogin',
    '$state',
    'toaster',
    function($scope, $theme, $timeout, progressLoader, wijetsService, $location, apiLogin, $state, toaster) {
      
      $scope.layoutFixedHeader = $theme.get('fixedHeader');
      $scope.layoutPageTransitionStyle = $theme.get('pageTransitionStyle');
      $scope.layoutDropdownTransitionStyle = $theme.get('dropdownTransitionStyle');
      $scope.layoutPageTransitionStyleList = ['bounce','flash','pulse','bounceIn','bounceInDown','bounceInLeft',
      'bounceInRight','bounceInUp','fadeIn','fadeInDown','fadeInDownBig','fadeInLeft','fadeInLeftBig','fadeInRight',
      'fadeInRightBig','fadeInUp','fadeInUpBig','flipInX','flipInY','lightSpeedIn','rotateIn','rotateInDownLeft',
      'rotateInDownRight','rotateInUpLeft','rotateInUpRight','rollIn','zoomIn','zoomInDown','zoomInLeft','zoomInRight',
      'zoomInUp'];


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

      // there are better ways to do this, e.g. using a dedicated service
      // but for the purposes of this demo this will do
      $scope.isLoggedIn = true;

      $scope.$watch('layoutFixedHeader', function(newVal, oldval) {
        if (newVal === undefined || newVal === oldval) {
          return;
        }
        $theme.set('fixedHeader', newVal);
      });
      $scope.$watch('layoutLayoutBoxed', function(newVal, oldval) {
        if (newVal === undefined || newVal === oldval) {
          return;
        }
        $theme.set('layoutBoxed', newVal);
      });
      $scope.$watch('layoutLayoutHorizontal', function(newVal, oldval) {
        if (newVal === undefined || newVal === oldval) {
          return;
        }
        $theme.set('layoutHorizontal', newVal);
      });
      $scope.$watch('layoutPageTransitionStyle', function(newVal) {
        $theme.set('pageTransitionStyle', newVal);
      });
      $scope.$watch('layoutDropdownTransitionStyle', function(newVal) {
        $theme.set('dropdownTransitionStyle', newVal);
      });
      $scope.$watch('layoutLeftbarCollapsed', function(newVal, oldVal) {
        if (newVal === undefined || newVal === oldVal) {
          return;
        }
        $theme.set('leftbarCollapsed', newVal);
      });


      $scope.$on('themeEvent:maxWidth767', function(event, newVal) {
        $timeout(function() {
            $theme.set('leftbarCollapsed', newVal);
        });
      });
      $scope.$on('themeEvent:changed:fixedHeader', function(event, newVal) {
        $scope.layoutFixedHeader = newVal;
      });
      $scope.$on('themeEvent:changed:layoutHorizontal', function(event, newVal) {
        $scope.layoutLayoutHorizontal = newVal;
      });
      $scope.$on('themeEvent:changed:layoutBoxed', function(event, newVal) {
        $scope.layoutLayoutBoxed = newVal;
      });
      $scope.$on('themeEvent:changed:leftbarCollapsed', function(event, newVal) {
        $scope.layoutLeftbarCollapsed = newVal;
      });


    }
  ]);