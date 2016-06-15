'use strict';
angular.module('wbaApp')
  .factory('apiChecagem', ['$http', 'baseUrl', function ($http, baseUrl) {

    var api = {};

    // CPONFERENCIA DE DOCUMENTOS API
    var _getConferencias = function () {
      return $http({
        url: baseUrl.apiChecagem + '/conferencias',
        method: 'GET'
      }).then(
        function (results){
          return results
        }
      )
    };
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

    // ESTADOS DE CONFIRMAÇÃO API
    var _getEstados = function () {
      return $http({
        url: baseUrl.apiChecagem + '/estados',
        method: 'GET'
      }).then(
        function (results) {
          return results
        }
      )
    };
    var _getEstadoById = function (id) {
      return $http({
        url: baseUrl.apiChecagem + '/estados/' + id,
        method: 'GET'
      }).then(
        function (results) {
          return results
        }
      )
    };
    var _addEstado = function (data) {
      return $http({
        url: baseUrl.apiChecagem + '/estados',
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
    var _updateEstado = function (id, data) {
      return $http({
        url: baseUrl.apiChecagem + '/estados/' + id,
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
    var _deleteEstado = function (id) {
      return $http({
        url: baseUrl.apiChecagem + '/estados/' + id,
        method: 'DELETE'
      }).then(
        function (results) {
          return results
        }
      )
    };

    // DOCUMENTOS DE CONFERENCIA API

    var _getDocumentosConferencia = function () {
      return $http({
        url: baseUrl.apiChecagem + '/documentoConferencia',
        method: 'GET'
      }).then(
        function (results) {
          return results;
        }
      );
    };
    var _getDocumentoConferenciaById = function (id) {
      return $http({
        url: baseUrl.apiChecagem + '/documentoConferencia/' + id,
        method: 'GET'
      }).then(
        function (results) {
          return results;
        }
      );
    };
    var _addDocumentoConferencia = function (data) {
      return $http({
        url: baseUrl.apiChecagem + '/documentoConferencia',
        method: 'POST',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then(
        function (results) {
          return results;
        }
      );
    };
    var _updateDocumentoConferencia = function (id, data) {
      return $http({
        url: baseUrl.apiChecagem + '/documentoConferencia/' + id,
        method: 'PUT',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then(
        function (results) {
          return results;
        }
      );
    };
    var _deleteDocumentoConferencia = function (id, data) {
      return $http({
        url: baseUrl.apiChecagem + '/documentoConferencia/' + id,
        method: 'DELETE',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then(
        function (results) {
          return results;
        }
      );
    };
    var _associarCarteira = function (idDocumento, idCarteira) {
      return $http({
        url: baseUrl.apiChecagem + '/documentoConferencia/' + idDocumento + '/carteira',
        method: 'POST',
        data: idCarteira
      }).then(
        function (results) {
          return results;
        }
      );
    };
    var _getDocumentosByCarteira = function (carteiraId) {
      return $http({
        url: baseUrl.apiChecagem + '/documentosParaConferir/search/findByIdCarteira?id=' + carteiraId,
        method: 'GET'
      }).then(
        function (results) {
          return results
        }
      )
    };
    var _getDocumentosParaConferirCarteira = function (id){
      return $http({
        url: baseUrl.apiChecagem + '/documentosParaConferir/' + id + '/documentoConferencia',
        method: 'GET'
      }).then(
        function (results) {
          return results
        }
      )
    };
    var _getTitulosConfirmacao = function () {
      return $http({
        url: baseUrl.apiChecagem + '/titulos',
        method: 'GET'
      }).then(
        function (results) {
          return results
        }
      )
    };
    var _getTitulosBySacado = function () {
      return $http({
        url: baseUrl.apiChecagem + '/titulos/confirmacao/sacado',
        method: 'GET'
      }).then(
        function (results) {
          return results
        }
      )
    };
    var _addNotaConfirmacao = function (id, data) {
      return $http({
        url: baseUrl.apiChecagem + '/titulos/' + id + '/notas',
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
    var _agendarConfirmacao = function (id, data) {
      return $http({
        url: baseUrl.apiChecagem + '/titulos/' + id + '/agendamento',
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
    var _confirmarConfirmacao = function (id, data) {
      return $http({
        url: baseUrl.apiChecagem + '/titulos/' + id + '/confirmar',
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
    var _getNotasByTitulosConfirmacao = function (id) {
      return $http({
        url: baseUrl.apiChecagem + '/titulos/' + id + '/notas',
        method: 'GET'
      }).then(
        function (results) {
          return results
        }
      )
    };

    api.getConferencias               = _getConferencias;
    api.findConferenciasByData        = _findConferenciasByData;
    api.findConferenciasByOperacao    = _findConferenciasByOperacao;
    api.addConferencia                = _addConferencia;
    api.agendarConferencia            = _agendarConferencia;
    api.getAnexosConferencia          = _getAnexosConferencia;
    api.addAnexoConferencia           = _addAnexoConferencia;
    api.confirmarConferencia          = _confirmarConferencia;
    api.getNotasConferencia           = _getNotasConferencia;
    api.addNotaConferencia            = _addNotaConferencia;
    api.getEstados                    = _getEstados;
    api.getEstadoById                 = _getEstadoById;
    api.addEstado                     = _addEstado;
    api.updateEstado                  = _updateEstado;
    api.deleteEstado                  = _deleteEstado;
    api.getDocumentosConferencia      = _getDocumentosConferencia;
    api.getDocumentoConferenciaById   = _getDocumentoConferenciaById;
    api.addDocumentoConferencia       = _addDocumentoConferencia;
    api.updateDocumentoConferencia    = _updateDocumentoConferencia;
    api.deleteDocumentoConferencia    = _deleteDocumentoConferencia;
    api.associarCarteira              = _associarCarteira;
    api.getDocumentosByCarteira       = _getDocumentosByCarteira;
    api.getTitulosConfirmacao         = _getTitulosConfirmacao;
    api.getTitulosBySacado            = _getTitulosBySacado;
    api.addNotaConfirmacao            = _addNotaConfirmacao;
    api.agendarConfirmacao            = _agendarConfirmacao;
    api.confirmarConfirmacao          = _confirmarConfirmacao;
    api.getNotasByTitulosConfirmacao  = _getNotasByTitulosConfirmacao;
    api.getDocumentosParaConferirCarteira = _getDocumentosParaConferirCarteira;
    return api;

  }]);
