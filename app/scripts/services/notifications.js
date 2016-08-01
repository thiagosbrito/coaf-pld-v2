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


      api.getNotifications = _getNotifications;

      return api;

    }

  ]);