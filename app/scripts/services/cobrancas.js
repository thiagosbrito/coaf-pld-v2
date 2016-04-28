'use strict';
angular.module('wbaApp')
  .factory('apiCobrancas', ['$http', 'baseUrl', 'uuid4', function ($http, baseUrl, uuid4) {

    var api = {};

    // PLATAFORMAS
    // LIST
    var _getCobrancas = function () {
      return $http({
        url: baseUrl.apiCobrancas + '/cobrancas',
        method: 'GET'
      }).then(function (results) {
        return results;
      });
    };
    // GET BY ID
    var _getCobrancasById = function (id) {
      return $http({
        url: baseUrl.apiCobrancas + '/cobrancas/' + id,
        method: 'GET'
      }).then(function (results) {
        return results;
      });
    };

    // var _getBancos = function () {
    //   var bancos = [
    //     {
    //       "uuid": uuid4.generate(),
    //       "numeroBanco": '001',
    //       "nomeBanco": 'BANCO DO BRASIL S.A'
    //     },
    //     {
    //       "uuid": uuid4.generate(),
    //       "numeroBanco": '237',
    //       "nomeBanco": 'BANCO BRADESCO S.A'
    //     },
    //     {
    //       "uuid": uuid4.generate(),
    //       "numeroBanco": '341',
    //       "nomeBanco": 'BANCO ITAÚ S.A'
    //     },
    //     {
    //       "uuid": uuid4.generate(),
    //       "numeroBanco": '033',
    //       "nomeBanco": 'BANCO SANTANDER S.A'
    //     },
    //     {
    //       "uuid": uuid4.generate(),
    //       "numeroBanco": '104',
    //       "nomeBanco": 'CAIXA ECONÔMICA FEDERAL'
    //     }
    //   ];
    //
    //   return bancos;
    // };

    // DOWNLOAD CNAB

    var _getCnab = function (id) {
      return $http({
        url: baseUrl.apiCobrancas + '/cobrancas/' + id + '/cnab',
        method: 'GET'
      }).then(function (results) {
        return results;
      });
    };

    // SAVE
    var _saveCobranca = function (data) {
      var url = baseUrl.apiCobrancas + '/cobrancas';
      return $http.post(url, data, {headers: {'Content-Type':'application/json'}}).then(
        function (res) {
          return res
        }
      )
    };

    var _geraCobranca = function (data) {
      var url = baseUrl.apiCobrancas + '/cobrancas/gera-cobranca';
      return $http.post(url, data, {headers: {'Content-Type':'application/json'}}).then(
        function (res) {
          return res
        }
      )
    };

    // UPDATE
    var _updateCobranca = function (data) {
      var url = baseUrl.apiCobrancas + '/cobrancas';
      return $http.put(url, data, {headers: {'Content-Type':'application/json'}}).then(
        function (res) {
          return res
        }
      )
    };

    // DELETE
    var _deleteCobranca = function (data) {
      var url = baseUrl.apiCobrancas + '/cobrancas';
      return $http({
        url: url,
        method: 'DELETE',
        data: data,
        headers: {
          'Content-Type':'application'
        }
      }).then(
        function (res) {
          return res
        }
      )
    };

    // Comercial
    api.getCobrancas        = _getCobrancas;
    api.getCobrancasById    = _getCobrancasById;
    api.saveCobranca        = _saveCobranca;
    api.updateCobranca      = _updateCobranca;
    api.deleteCobranca      = _deleteCobranca;
    api.geraCobranca       = _geraCobranca;

    api.getCnab             = _getCnab;
    // api.getBancos           = _getBancos;

    return api;

  }]);
