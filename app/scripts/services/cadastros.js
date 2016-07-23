'use strict';
angular.module('wbaApp')
  .factory('apiCadastro', [
    '$http',
    'baseUrl',
    'Session',
    function($http, baseUrl, Session){
      
      var api = {}

      var _getCedentes = function () {
        return $http({
          url: baseUrl.apiUrl + '/customers',
          method: 'GET'
        }).then(
          function (results) {
            return results;
          }
        )
      }

      var _addCedente = function (data) {
        return $http({
          url: baseUrl.apiUrl + '/customers',
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


      api.getCedentes   = _getCedentes;
      api.addCedente    = _addCedente;
      
      return api;

    }
  ])