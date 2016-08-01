'use strict';

angular.module('wbaApp')
  .factory('apiManual',[
    'baseUrl',
    '$http',
    function (baseUrl, $http) {
      var api = {};

      var _CheckManualPrevencao = function () {
        return $http({
          url: baseUrl.apiUrl + '/analyzes/checkPrevencao',
          method: 'GET'
        }).then(
          function (results) {
            return results;
          }
        )
      };

      var _GetManualPrevencao = function () {
        return $http({
          url: baseUrl.apiUrl + '/analyzes/prevencao',
          method: 'GET'
        }).then(
          function (results) {
            return results;
          }
        )
      };

      api.CheckManualPrevencao  = _CheckManualPrevencao;
      api.GetManualPrevencao    = _GetManualPrevencao;

      return api;


    }
  ])