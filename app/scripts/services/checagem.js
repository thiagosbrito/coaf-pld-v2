'use strict';
angular.module('wbaApp')
  .factory('apiChecagem', ['$http', 'baseUrl', function ($http, baseUrl) {

    var api = {};

    var _findConferenciasByData = function (data) {
      return $http({
        url: baseUrl.apiChecagem + '/conferencias/search/findByDataAgendamento?dataAgendamento=' + data,
        method: 'GET'
      }).then(
        function (results){
          return results
        }
      )
    };
    var _findConferenciasByOperacao = function (uuid) {
      return $http({
        url: baseUrl.apiChecagem + '/conferencias/search/findByUuidOperacao?uuid=' + uuid,
        method: 'GET'
      }).then(
        function (results){
          return results
        }
      )
    };
    var _addConferencia = function (data) {
      return $http({
        url: baseUrl.apiChecagem + '/conferencias',
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
    var _agendarConferencia = function (id, data) {
      return $http({
        url: baseUrl.apiChecagem + '/conferencias/' + id + '/agendar',
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
    var _getAnexosConferencia = function (id) {
      return $http({
        url: baseUrl.apiChecagem + '/conferencias/' + id + '/anexo',
        method: 'GET'
      }).then(
        function (results) {
          return results
        }
      )
    };
    var _addAnexoConferencia = function (id, data) {
      return $http({
        url: baseUrl.apiChecagem + '/conferencias/' + id + '/anexo',
        method: 'PUT',
        data: data,
        headers: {
          'Content-Type':'application/octet-stream'
        }
      }).then(
        function (results){
          return results
        }
      )
    };
    var _confirmarConferencia = function (id, data) {
      return $http({
        url: baseUrl.apiChecagem + '/conferencias/' + id + '/confirmar',
        method: 'PUT',
        data: data,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(
        function (results) {
          return results
        }
      )
    };
    var _getNotasConferencia = function (id) {
      return $http({
        url: baseUrl.apiChecagem + '/conferencias/' + id + '/notas',
        method: 'GET'
      }).then(
        function (results) {
          return results
        }
      )
    };
    var _addNotaConferencia = function (id, data) {
      return $http({
        url: baseUrl.apiChecagem + '/conferencias/' + id + '/notas',
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

    api.findConferenciasByData      = _findConferenciasByData;
    api.findConferenciasByOperacao  = _findConferenciasByOperacao;
    api.addConferencia              = _addConferencia;
    api.agendarConferencia          = _agendarConferencia;
    api.getAnexosConferencia        = _getAnexosConferencia;
    api.addAnexoConferencia         = _addAnexoConferencia;
    api.confirmarConferencia        = _confirmarConferencia;
    api.getNotasConferencia         = _getNotasConferencia;
    api.addNotaConferencia          = _addNotaConferencia;



    return api;

  }]);
