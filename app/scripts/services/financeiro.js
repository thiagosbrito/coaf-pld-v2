'use strict';
angular.module('wbaApp')
  .factory('apiFinanceiro', ['$http', 'baseUrl', function ($http, baseUrl) {

    var api = {};

    // BANCOS

    var _getBancos = function () {
      return $http({
        url: baseUrl.apiFinanceiro + '/bancos',
        method: 'GET'
      }).then(function (results) {
        return results;
      });
    };
    var _getBancoById = function (bancoId) {
      return $http({
        url: baseUrl.apiFinanceiro + '/bancos/' + bancoId,
        method: 'GET'
      }).then( function (results){
        return results
      })
    };
    var _addBanco = function (data) {
      return $http({
        url: baseUrl.apiFinanceiro + '/bancos',
        method: 'POST',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then( function (results){
        return results
      })
    };
    var _updateBanco = function (data) {
      return $http({
        url: baseUrl.apiFinanceiro + '/bancos',
        method: 'PUT',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then( function (results){
        return results
      })
    };
    var _deleteBanco = function (data) {
      return $http({
        url: baseUrl.apiFinanceiro + '/bancos',
        method: 'DELETE',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then( function (results){
        return results
      })
    };

    // ALINEAS

    var _getAlineas = function (bancoId) {
      return $http({
        url: baseUrl.apiFinanceiro + '/bancos/' + bancoId + '/alineas',
        method: 'GET'
      }).then( function (results) {
        return results
      })
    };
    var _getAlineaById = function (bancoId, alineaId) {
      return $http({
        url: baseUrl.apiFinanceiro + '/bancos/' + bancoId + '/alineas/' + alineaId,
        method: 'GET'
      }).then( function (results) {
        return results
      })
    };
    var _addAlinea = function (bancoId, data) {
      return $http({
        url: baseUrl.apiFinanceiro + '/bancos/' + bancoId + '/alineas',
        method: 'POST',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then( function (results) {
        return results
      })
    };
    var _deleteAlinea = function (bancoId, data) {
      return $http({
        url: baseUrl.apiFinanceiro + '/bancos/' + bancoId + '/alineas',
        method: 'DELETE',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then(function (results) {
        return results
      })
    };

    // INSTRUCOES DE COBRANCA

    var _getInstrucoes = function (bancoId) {
      return $http({
        url: baseUrl.apiFinanceiro + '/bancos/' + bancoId + '/instrucoesCobranca',
        method: 'GET'
      }).then( function (results) {
        return results
      })
    };
    var _getInstrucoesById = function (bancoId, instrucoesId) {
      return $http({
        url: baseUrl.apiFinanceiro + '/bancos/' + bancoId + '/instrucoesCobranca/' + instrucoesId,
        method: 'GET'
      }).then( function (results) {
        return results
      })
    };
    var _addInstrucoes = function (bancoId, data) {
      return $http({
        url: baseUrl.apiFinanceiro + '/bancos/' + bancoId + '/instrucoesCobranca',
        method: 'POST',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then( function (results) {
        return results
      })
    };
    var _updateInstrucoes = function (bancoId, data) {
      return $http({
        url: baseUrl.apiFinanceiro + '/bancos/' + bancoId + '/instrucoesCobranca',
        method: 'PUT',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then( function (results) {
        return results
      })
    };
    var _deleteInstrucoes = function (bancoId, data) {
      return $http({
        url: baseUrl.apiFinanceiro + '/bancos/' + bancoId + '/instrucoesCobranca',
        method: 'DELETE',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then(function (results) {
        return results
      })
    };

    // CODIGOS DE LANCAMENTO

    var _getCodigos = function () {
      return $http({
        url: baseUrl.apiFinanceiro + '/codigos-lancamento',
        method: 'GET'
      }).then(function (results) {
        return results;
      });
    };
    var _getCodigoById = function (codigoId) {
      return $http({
        url: baseUrl.apiFinanceiro + '/codigos-lancamento/' + codigoId,
        method: 'GET'
      }).then( function (results){
        return results
      })
    };
    var _addCodigo = function (data) {
      return $http({
        url: baseUrl.apiFinanceiro + '/codigos-lancamento',
        method: 'POST',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then( function (results){
        return results
      })
    };
    var _updateCodigo = function (data) {
      return $http({
        url: baseUrl.apiFinanceiro + '/codigos-lancamento',
        method: 'PUT',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then( function (results){
        return results
      })
    };
    var _deleteCodigo = function (data) {
      return $http({
        url: baseUrl.apiFinanceiro + '/codigos-lancamento',
        method: 'DELETE',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then( function (results){
        return results
      })
    };

    // CONTAS

    var _getContas = function () {
      return $http({
        url: baseUrl.apiFinanceiro + '/contas',
        method: 'GET'
      }).then(function (results) {
        return results;
      });
    };
    var _getContaById = function (bancoId) {
      return $http({
        url: baseUrl.apiFinanceiro + '/contas/' + bancoId,
        method: 'GET'
      }).then( function (results){
        return results
      })
    };
    var _addConta = function (data) {
      return $http({
        url: baseUrl.apiFinanceiro + '/contas',
        method: 'POST',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then( function (results){
        return results
      })
    };
    var _updateConta = function (data) {
      return $http({
        url: baseUrl.apiFinanceiro + '/contas',
        method: 'PUT',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then( function (results){
        return results
      })
    };
    var _deleteConta = function (data) {
      return $http({
        url: baseUrl.apiFinanceiro + '/contas',
        method: 'DELETE',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then( function (results){
        return results
      })
    };
    var _getLancamentosConta = function (id) {
      return $http({
        url: baseUrl.apiFinanceiro + '/contas/' + id + '/lancamentos',
        method: 'GET'
      }).then(
        function (results) {
          return results
        }
      )
    };

    // INFORMAÇÕES BANCARIAS

    var _getInfo = function (contaId) {
      return $http({
        url: baseUrl.apiFinanceiro + '/contas/' + contaId + '/informacao-bancaria',
        method: 'GET'
      }).then( function (results) {
        return results
      })
    };
    var _getInfoById = function (contaId, infoId) {
      return $http({
        url: baseUrl.apiFinanceiro + '/contas/' + contaId + '/informacao-bancaria/' + infoId,
        method: 'GET'
      }).then(function (results) {
        return results
      })
    };
    var _addInfo = function (contaId, data) {
      return $http({
        url: baseUrl.apiFinanceiro + '/contas/' + contaId + '/informacao-bancaria',
        method: 'POST',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then( function (results) {
        return results
      })
    };
    var _updateInfo = function (contaId, data) {
      return $http({
        url: baseUrl.apiFinanceiro + '/contas/' + contaId + '/informacao-bancaria',
        method: 'PUT',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then( function (results) {
        return results
      })
    };
    var _deleteInfo = function (contaId, data) {
      return $http({
        url: baseUrl.apiFinanceiro + '/contas/' + contaId + '/informacao-bancaria',
        method: 'DELETE',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then( function (results) {
        return results
      })
    };

    // CENTRO DE CUSTOS

    var _getCentroCusto = function () {
      return $http({
        url: baseUrl.apiFinanceiro + '/centro-custo',
        method: 'GET'
      }).then(
        function (results) {
          return results
        }
      )
    };
    var _getCentroCustoById = function (id) {
      return $http({
        url: baseUrl.apiFinanceiro + '/centro-custo/' + id,
        method: 'GET'
      }).then(
        function (results) {
          return results
        }
      )
    };
    var _addCentroCusto = function (data) {
      return $http({
        url: baseUrl.apiFinanceiro + '/centro-custo',
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
    var _updateCentroCusto = function (data) {
      return $http({
        url: baseUrl.apiFinanceiro + '/centro-custo',
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
    var _deleteCentroCusto = function (data) {
      return $http({
        url: baseUrl.apiFinanceiro + '/centro-custo',
        method: 'DELETE',
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


    api.getBancos           = _getBancos;
    api.getBancoById        = _getBancoById;
    api.addBanco            = _addBanco;
    api.updateBanco         = _updateBanco;
    api.deleteBanco         = _deleteBanco;

    api.getAlineas          = _getAlineas;
    api.getAlineaById       = _getAlineaById;
    api.addAlinea           = _addAlinea;
    api.deleteAlinea        = _deleteAlinea;

    api.getInstrucoes       = _getInstrucoes;
    api.getInstrucoesById   = _getInstrucoesById;
    api.addInstrucoes       = _addInstrucoes;
    api.updateInstrucoes    = _updateInstrucoes;
    api.deleteInstrucoes    = _deleteInstrucoes;

    api.getCodigos          = _getCodigos;
    api.getCodigoById       = _getCodigoById;
    api.addCodigo           = _addCodigo;
    api.updateCodigo        = _updateCodigo;
    api.deleteCodigo        = _deleteCodigo;

    api.getContas           = _getContas;
    api.getContaById        = _getContaById;
    api.addConta            = _addConta;
    api.updateConta         = _updateConta;
    api.deleteConta         = _deleteConta;
    api.getLancamentosConta = _getLancamentosConta;

    api.getInfo             = _getInfo;
    api.getInfoById         = _getInfoById;
    api.addInfo             = _addInfo;
    api.updateInfo          = _updateInfo;
    api.deleteInfo          = _deleteInfo;

    api.getCentroCusto      = _getCentroCusto;
    api.getCentroCustoById  = _getCentroCustoById;
    api.addCentroCusto      = _addCentroCusto;
    api.updateCentroCusto   = _updateCentroCusto;
    api.deleteCentroCusto   = _deleteCentroCusto;

    return api;

  }]);
