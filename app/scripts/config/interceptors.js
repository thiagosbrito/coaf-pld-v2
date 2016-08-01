'use strict';

angular.module('wbaApp')
  // Session interceptor - 
  // If the user is not set in session, 
  // the user will be redirected to Login Page
  .factory('SessionInterceptor', [
    '$q',
    '$injector',
    function($q, $injector){
      var SessionInterceptor = {
        request: function (config) {

          var Session   = $injector.get('Session');
          var apiLogin  = $injector.get('apiLogin');

          if (Session.getUser()) {
            config.isLogged = true;
          }
          
          else {
            
            config.isLogged = false;
            $injector.get('$state').transitionTon('login');
              
          }
          return config
        }
      }
      return SessionInterceptor;
    }
  ])