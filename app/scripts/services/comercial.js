'use strict';
angular.module('wbaApp')
  .factory('apiComercial', ['$http', 'baseUrl', function ($http, baseUrl) {

    var api = {};

    // PLATAFORMAS
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

    // HIERARQUIAS
    // LIST
    var _getHierarquias = function () {
      return $http({
        url: baseUrl.apiComercial + '/hierarquias',
        method: 'GET'
      }).then(function (results) {
        return results;
      });
    };
    // GET BY ID
    var _getHierarquiasById = function (id) {
      return $http({
        url: baseUrl.apiComercial + '/hierarquias/' + id,
        method: 'GET'
      }).then(function (results) {
        return results;
      });
    };
    // SAVE
    var _saveHierarquia = function (data) {
      var url = baseUrl.apiComercial + '/hierarquias';
      return $http.post(url, data, {headers: {'Content-Type':'application/json'}}).then(
        function (res) {
          return res
        }
      )
    };
    // UPDATE
    var _updateHierarquia = function (data) {
      var url = baseUrl.apiComercial + '/hierarquias';
      return $http.put(url, data, {headers: {'Content-Type':'application/json'}}).then(
        function (res) {
          return res
        }
      )
    };


    var _getHierarquiaByPlatformId = function (plataformaId) {
      return $http({
        url: baseUrl.apiComercial + '/plataformas/' + plataformaId + '/hierarquias',
        method: 'GET'
      }).then(
        function(res) {
          return res
        }
      )
    };

    var _adicionarCedente = function (idHierarquia, idCedente) {
      return $http({
        url: baseUrl.apiComercial + '/hierarquias/' + idHierarquia + '/adicionarCedente',
        method: 'POST',
        data: idCedente,
        headers: {
          'Content-Type':'application/json'
        }
      }).then(
        function (results) {
          return results
        }
      )
    };

    // Comercial
    api.getPlataformas        = _getPlataformas;
    api.getPlataformasById    = _getPlataformasById;
    api.savePlataforma        = _savePlataforma;
    api.updatePlataforma      = _updatePlataforma;

    api.getHierarquias        = _getHierarquias;
    api.getHierarquiasById    = _getHierarquiasById;
    api.saveHierarquia        = _saveHierarquia;
    api.updateHierarquia      = _updateHierarquia;

    api.getHierarquiaByPlatformId = _getHierarquiaByPlatformId;
    api.adicionarCedente      = _adicionarCedente;

    return api;

}]);
