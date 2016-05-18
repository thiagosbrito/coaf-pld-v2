'use strict';
angular.module('wbaApp')
  .factory('apiDocumentacao', ['$http', 'baseUrl', function ($http, baseUrl) {

    var api = {};

    // {
    //   "descricao": "string",
    //   "json_schema": "string",
    //   "path_relatorio": "string",
    //   "tipo_pessoa": "string",
    //   "tipo_template": "string",
    //   "titulo": "string",
    //   "uuid": "string",
    //   "uuidCarteira": "string",
    //   "uuidPessoa": "string"
    // }

    // TEMPLATES SERVICES

    var _getTemplates = function () {
      return $http({
        url: baseUrl.apiDocumentacao + '/templates',
        method: 'GET'
      }).then(
        function (results) {
          return results
        }
      )
    };
    var _deleteTemplate = function (data) {
      return $http({
        url: baseUrl.apiDocumentacao + '/templates',
        method: 'DELETE',
        data: data,
        headers: {
          "Content-Type":"application/json"
        }
      }).then(function (results) {
        return results;
      });
    };
    var _addTemplate = function (data) {
      return $http({
        url: baseUrl.apiDocumentacao + '/templates',
        method: 'POST',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then(
        function (result) {
          return result
        }
      )
    };
    var _updateTemplate = function (data) {
      return $http({
        url: baseUrl.apiDocumentacao + '/templates',
        method: 'PUT',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then(
        function (result) {
          return result
        }
      )
    };
    var _getTemplateByCarteira = function (carteiraId) {
      return $http({
        url: baseUrl.apiDocumentacao + '/templates/carteira/' + carteiraId,
        method: 'GET',
        header : {'Content-Type' : 'application/json; charset=UTF-8'}
      }).then(
        function (result) {
          return result
        }
      )
    };
    var _getTemplateEmailByCarteira = function (carteiraId) {
      return $http({
        url: baseUrl.apiDocumentacao + '/templates/carteira/' + carteiraId + '/buscarTemplates-email',
        method: 'POST'
      }).then(
        function (result) {
          return result
        }
      )
    };
    var _getTemplateDocumento = function () {
      return $http({
        url: baseUrl.apiDocumentacao + '/templates/documento',
        method: 'GET'
      }).then(
        function (result) {
          return result
        }
      )
    };
    var _getTemplateById = function (id) {
      return $http({
        url: baseUrl.apiDocumentacao + '/templates/' + id ,
        method: 'GET'
      }).then(
        function (result) {
          return result
        }
      )
    };
    var _desvincularCarteira = function (id) {
      return $http({
        url: baseUrl.apiDocumentacao + '/templates/' + id + '/desvincularCarteira',
        method: 'PUT'
      }).then(
        function (result) {
          return result
        }
      )
    };
    var _regerarRelatorio = function (id, operacaoId) {
      return $http({
        url: baseUrl.apiDocumentacao + '/templates/' + id + '/relatorio/operacao/' + operacaoId,
        method: 'POST '
      }).then(
        function (result) {
          return result
        }
      )
    };
    var _relatorioOperacao = function (id, operacaoId) {
      return $http({
        url: baseUrl.apiDocumentacao + '/templates/' + id + '/relatorio/' + operacaoId,
        method: 'POST '
      }).then(
        function (result) {
          return result
        }
      )
    };

    api.getTemplates                  = _getTemplates;
    api.deleteTemplate                = _deleteTemplate;
    api.addTemplate                   = _addTemplate;
    api.updateTemplate                = _updateTemplate;
    api.getTemplateByCarteira         = _getTemplateByCarteira;
    api.getTemplateEmailByCarteira    = _getTemplateEmailByCarteira;
    api.getTemplateDocumento          = _getTemplateDocumento;
    api.getTemplateById               = _getTemplateById;
    api.desvincularCarteira           = _desvincularCarteira;
    api.regerarRelatorio              = _regerarRelatorio;
    api.relatorioOperacao             = _relatorioOperacao;

    return api;

  }]);
