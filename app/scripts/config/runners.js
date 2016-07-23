angular.module('wbaApp')
  .run(['$window', function ($window) {
    $window.ngGrid.config = {
        footerRowHeight: 40,
        headerRowHeight: 40,
        rowHeight: 40
    };
  }])
  .run([
    '$state',
    '$rootScope',
    'apiUsers',
    'apiPermissions',
    'Session',
    function ($state, $rootScope, apiUsers, apiPermissions, Session) {
      $rootScope.$state = $state;
      $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
        console.log('$stateChangeStart to '+toState.to+'- fired when the transition begins. toState,toParams : \n',toState, toParams);
      });

      $rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams){
        console.log('$stateChangeError - fired when an error occurs during transition.');
        console.log(arguments);
      });

      $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
        $rootScope.prevState = fromState;
        console.log('$stateChangeSuccess to '+toState.name+'- fired once the state transition is complete.');
      });

      $rootScope.$on('$viewContentLoaded',function(event){
        console.log('$viewContentLoaded - fired after dom rendered',event);
      });

      $rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
        console.log('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name.');
        console.log(unfoundState, fromState, fromParams);
      });
      Session.getUser();
      
      // $rootScope.loggedBuyingEntity = [];
      // $rootScope.operationPolicy = [];
      // $rootScope.customerPolicy = [];
      
      // apiPermissions.getPermissions().then(
  		  // function (res) {
  			 //  $rootScope.permissions = res.data;
  		  // },
  		  // function (err) {
  			 //  console.log(err.statusText);
  		  // }
      // );
      
      // apiUsers.getUsers('profile').then(
  		  // function (res) {
  			 //  $rootScope.loggedUser = res.data;
  			 //  $rootScope.loggedBuyingEntity = res.data.buyingEntity;
      //     $rootScope.operationPolicy = $rootScope.loggedBuyingEntity.operationPolicy;
      //     $rootScope.customerPolicy = $rootScope.loggedBuyingEntity.customerPolicy;
  		  // }
      // )
    }
  ])
