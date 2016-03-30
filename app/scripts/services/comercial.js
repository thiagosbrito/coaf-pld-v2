'use strict';
angular.module('wbaApp')
  .factory('apiComercial', ['$http', 'baseUrl', function ($http, baseUrl) {

    var api = {};
    // LIST
    var _getPlataformas = function () {
      return $http({
        url: baseUrl.apiComercial + '/plataformas',
        method: 'GET'
      }).then(function (results) {
        return results;
      });
    };
    // GET BY ID
    var _getPlataformasById = function (id) {
      return $http({
        url: baseUrl.apiComercial + '/plataformas/' + id,
        method: 'GET'
      }).then(function (results) {
        return results;
      });
    };
    // SAVE
    var _savePlataforma = function (data) {
      var url = baseUrl.apiComercial + '/plataformas';
      return $http.post(url, data, {headers: {'Content-Type':'application/json'}}).then(
        function (res) {
          return res
        }
      )
    };
    // UPDATE
    var _updatePlataforma = function (data) {
      var url = baseUrl.apiComercial + '/plataformas';
      return $http.put(url, data, {headers: {'Content-Type':'application/json'}}).then(
        function (res) {
          return res
        }
      )
    };
    
    // Comercial
    api.getPlataformas        = _getPlataformas;
    api.getPlataformasById    = _getPlataformasById;
    api.savePlataforma        = _savePlataforma;
    api.updatePlataforma      = _updatePlataforma;
    

    return api;

}]);