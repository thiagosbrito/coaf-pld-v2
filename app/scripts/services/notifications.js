'use strict';

angular.module('wbaApp')
  .factory('apiNotifications',[
    'baseUrl',
    '$http',
    function (baseUrl, $http) {
      
      var api = {};

      var _getNotifications = function () {
        return $http({
          url: baseUrl.apiUrl + '/notifications',
          method: 'GET'
        }).then(
          function (results) {
            return results;
          }
        )
      };

      var _getNotificationById = function (id) {
        return $http({
          url: baseUrl.apiUrl + '/notifications/' + id,
          method: 'GET'
        }).then(
          function (results) {
            return results
          }
        )
      };

      var _saveNotification = function (data) {
        return $http({
          url: baseUrl.apiUrl + '/notifications',
          method: 'POST',
          data: data,
          headers: {
            'Content-Type':'application/json'
          }
        }).then(
          function (results) {
            return results
          }
        )
      }

      var _executeNotification = function (id, operation) {
        return $http({
          url: baseUrl.apiUrl + '/notifications/' + id + '/' + operation,
          method: 'POST',
          data: data,
          headers: {
            'Content-Type':'application/json'
          }
        }).then(
          function (results) {
            return results
          }
        )
      }
      

      api.getNotifications      = _getNotifications;
      api.getNotificationById   = _getNotificationById;
      api.saveNotification      = _saveNotification;
      api.executeNotification   = _executeNotification;

      return api;

    }

  ]);