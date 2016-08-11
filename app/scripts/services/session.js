'use strict';
angular.module('wbaApp')
  .service('Session', [
    'apiUsers',
    'apiPermissions',
    '$localStorage',
    function (apiUsers, apiPermissions, $localStorage) {
      var $session = $localStorage;

      this.create = function (user, permissions, loggedBuyingEntity, operationPolicy, customerPolicy) {
        this.user               = user;
        this.permissions        = permissions;
        this.loggedBuyingEntity = loggedBuyingEntity;
        this.operationPolicy    = operationPolicy;
        this.customerPolicy     = customerPolicy;

        var obj = {
          user:               this.user,
          permissions:        this.permissions,
          loggedBuyingEntity: this.loggedBuyingEntity,
          operationPolicy:    this.operationPolicy,
          customerPolicy:     this.customerPolicy,
          isLogged:           true
        };
        $session.$default({
          profile: obj
        })
        // $window.sessionStorage.setItem('profile', JSON.stringify(obj));
      };
      
      this.getUser = function () {
        // var obj = $window.sessionStorage.getItem('profile');
        // return JSON.parse(obj);
        return $session.profile;
        
      }
      
      this.destroy = function () {
         return $session.$reset();
      }

    }
  ]);