angular.module('wbaApp')
  .run([
    '$state',
    '$rootScope',
    'apiUsers',
    'apiPermissions',
    'Session',
    '$timeout',
    'apiLogin',
    function ($state, $rootScope, apiUsers, apiPermissions, Session, $timeout, apiLogin) {
      $rootScope.$state = $state;
      $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
        // console.log('$stateChangeStart to '+toState.to+'- fired when the transition begins. toState,toParams : \n',toState, toParams);
        if(!apiLogin.isAuthenticated()) {
          $timeout(function () {
            $state.go('login')
          });
        }
      });

      $rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams){
        // console.log('$stateChangeError - fired when an error occurs during transition.');
      });

      $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
        $rootScope.prevState = fromState;
        // console.log('$stateChangeSuccess to '+toState.name+'- fired once the state transition is complete.');
      });

      $rootScope.$on('$viewContentLoaded',function(event){
        // console.log('$viewContentLoaded - fired after dom rendered',event);
      });

      $rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
        // console.log('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name.');
        // console.log(unfoundState, fromState, fromParams);
      });
    }
  ])
