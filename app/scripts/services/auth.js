'use strict';
angular.module('wbaApp')
  .factory('apiLogin', [
    '$http',
    'baseUrl',
    'transformRequestAsFormPost',
    'apiPermissions',
    'apiUsers',
    'Session',
    '$timeout',
    '$localStorage',
    function ($http, baseUrl, transformRequestAsFormPost, apiPermissions, apiUsers, Session, $timeout, $localStorage) {

      var api = {};
      var user, permissions, loggedBuyingEntity, operationPolicy, customerPolicy;
      var $localstorage = $localStorage;


      var _getPermissions = function () {
        apiPermissions.getPermissions().then(
          function (res) {
            permissions = res.data;
            Session.create(user, permissions, loggedBuyingEntity, operationPolicy, customerPolicy);
          },
          function (err) {
            console.log(err.statusText);
          }
        );
      };

      var _getUserProfile = function () {
        apiUsers.getUsers('profile').then(
          function (res) {
            user = res.data;
            loggedBuyingEntity = res.data.buyingEntity;
            operationPolicy = loggedBuyingEntity.operationPolicy;
            customerPolicy = loggedBuyingEntity.customerPolicy;
            _getPermissions();
          }
        );
      };

      var _isAuthenticated = function () {
        return !!Session.getUser();
      };

      var _doLogin = function (data) {
        return $http({
          url: baseUrl.apiLogin,
          method: 'POST',
          data: data,
          transformRequest: transformRequestAsFormPost
        }).then(
          function (results) {
            
            _getUserProfile();

            return results;
          }
        )
      };

      var _doLogout = function () {
        return $http({
          url: baseUrl.apiUrl + '/logout',
          method: 'GET'
        }).then(
          function (results) {
            delete $localStorage.profile;
            $timeout(function () {
              return results;
            },1000)
          }
        )
      }

      api.doLogin         =    _doLogin;
      api.doLogout        =    _doLogout;
      api.isAuthenticated = _isAuthenticated;
      
      return api;

    }
  ]);

  
