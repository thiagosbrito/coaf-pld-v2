'use strict';
angular.module('wbaApp')
  .factory('apiLogin', [
    '$http',
    'baseUrl',
    'transformRequestAsFormPost',
    'apiPermissions',
    'apiUsers',
    'Session',
    function ($http, baseUrl, transformRequestAsFormPost, apiPermissions, apiUsers, Session) {

      // var authService = {};

      // authService.login = function (credentials) {
      //   return $http
      //     .post(baseUrl.apiLogin, credentials)
      //     .then(
      //       function (res) {
              // var user, permissions, loggedBuyingEntity, operationPolicy, customerPolicy;
              // apiPermissions.getPermissions().then(
              //   function (res) {
              //     permissions = res.data;
              //   },
              //   function (err) {
              //     console.log(err.statusText);
              //   }
              // );
              
              // apiUsers.getUsers('profile').then(
              //   function (res) {
              //     user = res.data;
              //     loggedBuyingEntity = res.data.buyingEntity;
              //     operationPolicy = loggedBuyingEntity.operationPolicy;
              //     customerPolicy = loggedBuyingEntity.customerPolicy;
              //   }
              // );
              // Session.create(user, permissions, loggedBuyingEntity, operationPolicy, customerPolicy);
      //       }
      //     )
      // }
      // authService.isAuthenticated = function () {
      //   return !!Session.user;
      // }

      // return authService;
    var api = {};
    var user, permissions, loggedBuyingEntity, operationPolicy, customerPolicy;


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
          Session.destroy();
          return results;
        }
      )
    }

    api.doLogin     =    _doLogin;
    api.doLogout    =    _doLogout;
    
    return api;

  }])

  
