'use strict';
angular.module('wbaApp')
  .factory('apiCadastro', [
    '$http',
    'baseUrl',
    'Session',
    function($http, baseUrl, Session){
      
      var api = {}
      // CADASTRO DE CEDENTES
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
      var _getCedenteById = function (id) {
        return $http({
          url: baseUrl.apiUrl + '/customers/' + id,
          method: 'GET'
        }).then(
          function (results) {
            return results;
          }
        )
      };
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
      var _updateCedente = function (data) {
        return $http({
          url: baseUrl.apiUrl + '/customers',
          method: 'PUT',
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
      var _deleteCedente = function (id) {
        return $http({
          url: baseUrl.apiUrl + '/customers/' + id,
          method: 'DELETE'
        }).then(
          function (results) {
            return results;
          }
        )
      }

      // CADASTRO DE QUESTOES

      var _getPolicies = function () {
        return $http({
          url: baseUrl.apiUrl + '/policies',
          method: 'GET'
        }).then(
          function (results) {
            return results;
          }
        )
      };
      var _addPolicy = function (data) {
        return $http({
          url: baseUrl.apiUrl + '/policies',
          method: 'POST',
          data: data,
          headers: {
            'Content-Type':'application/json'
          }
        }).then(
          function (results) {
            return results;
          }
        )
      };
      var _updatePolicy = function (data) {
        return $http({
          url: baseUrl.apiUrl + '/policies',
          method: 'PUT',
          data: data,
          headers: {
            'Content-Type':'application/json'
          }
        }).then(
          function (results) {
            return results;
          }
        )
      };
      var _getPolicyById = function (id) {
        return $http({
          url: baseUrl.apiUrl + '/policies/' + id,
          method: 'GET'
        }).then(
          function (results) {
            return results
          }
        )
      }
      var _deletePolicy = function (id) {
        return $http({
          url: baseUrl.apiUrl + '/policies/' + id,
          method: 'DELETE'
        }).then(
          function (results) {
            return results
          }
        )
      }


      var _getRiskCriteria = function () {
        return $http({
          url: baseUrl.apiUrl + '/risk/criteria',
          method: 'GET'
        }).then(
          function (results) {
            return results
          }
        )
      };

      var _getRiskCriteriaById = function (id) {
        return $http({
          url: baseUrl.apiUrl + '/risk/criteria/' + id,
          method: 'GET'
        }).then(
          function (results) {
            return results
          }
        )
      };

      var _addRiskCriteria = function (data) {
        return $http({
          url: baseUrl.apiUrl + '/risk/criteria',
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
      };

      var _updateRiskCriteria = function (data) {
        return $http({
          url: baseUrl.apiUrl + '/risk/criteria',
          method: 'PUT',
          data: data,
          headers: {
            'Content-Type':'application/json'
          }
        }).then(
          function (results) {
            return results
          }
        )
      };

      var _deleteRiskCriteria = function (id) {
        return $http({
          url: baseUrl.apiUrl + '/risk/criteria/' + id,
          method: 'DELETE'
        }).then(
          function (results) {
            return results
          }
        )
      };


      var _getUsuarios = function () {
        return $http({
          url: baseUrl.apiUrl + '/users',
          method: 'GET'
        }).then(
          function (results) {
            return results
          }
        )
      };

      var _getUsuarioById = function (id) {
        return $http({
          url: baseUrl.apiUrl + '/users/' + id,
          method: 'GET'
        }).then(
          function (results) {
            return results
          }
        )
      };

      var _addUsuario = function (data) {
        return $http({
          url: baseUrl.apiUrl + '/users',
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
      };

      var _updateUsuario = function (data) {
        return $http({
          url: baseUrl.apiUrl + '/users',
          method: 'PUT',
          data: data,
          headers: {
            'Content-Type':'application/json'
          }
        }).then(
          function (results) {
            return results
          }
        )
      };

      var _deleteUsuario = function (id) {
        return $http({
          url: baseUrl.apiUrl + '/users/' + id,
          method: 'DELETE'
        }).then(
          function (results) {
            return results
          }
        )
      };




      api.getCedentes         = _getCedentes;
      api.addCedente          = _addCedente;
      api.getCedenteById      = _getCedenteById;
      api.updateCedente       = _updateCedente;
      api.deleteCedente       = _deleteCedente;

      api.getPolicies         = _getPolicies;
      api.getPolicyById       = _getPolicyById;
      api.addPolicy           = _addPolicy;
      api.updatePolicy        = _updatePolicy;
      api.deletePolicy        = _deletePolicy;

      api.getRiskCriteria     = _getRiskCriteria;
      api.getRiskCriteriaById = _getRiskCriteriaById;
      api.updateRiskCriteria  = _updateRiskCriteria;
      api.addRiskCriteria     = _addRiskCriteria;
      api.deleteRiskCriteria  = _deleteRiskCriteria;

      api.getUsuarios         = _getUsuarios;
      api.getUsuarioById      = _getUsuarioById;
      api.addUsuario          = _addUsuario;
      api.updateUsuario       = _updateUsuario;
      api.deleteUsuario       = _deleteUsuario;


      return api;

    }
  ])