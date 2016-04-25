'use strict';
angular.module('wbaApp')
  .factory('apiOperacoes', ['$http', 'baseUrl', function ($http, baseUrl) {

    var api = {};

    // CARTEIRAS
    var _getCarteiras = function () {
      return $http({
        url: baseUrl.apiOperacoes + '/carteiras',
        method: 'GET'
      }).then(function (results) {
        return results;
      });
    };
    var _getCarteiraById = function (id) {
      return $http({
        url: baseUrl.apiOperacoes + '/carteiras/' + id,
        method: 'GET'
      }).then(function (results) {
        return results;
      });
    };
    var _saveCarteira = function (data) {
      return $http({
        url: baseUrl.apiOperacoes + '/carteiras',
        method: 'POST',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then(function (results) {
        return results;
      });
    };

    var _addTarifaToCarteira = function (idCarteira, idTarifa, valor) {
      return $http({
        url: baseUrl.apiOperacoes + '/carteiras/' + idCarteira + '/tarifas/' + idTarifa,
        method: 'POST',
        data: valor,
        headers: {
          'Content-Type':'application/json'
        }
      }).then(function (results) {
        return results;
      });
    }
    var _updateCarteira = function (data) {
      return $http({
        url: baseUrl.apiOperacoes + '/carteiras',
        method: 'PUT',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then(function (results) {
        return results;
      });
    };
    var _deleteCarteira = function (data) {
      return $http({
        url: baseUrl.apiOperacoes + '/carteiras',
        method: 'DELETE',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then(function (results) {
        return results;
      });
    };

    // OPERACOES
    var _getOperacoes = function () {
      return $http({
        url: baseUrl.apiOperacoes + '/operacoes',
        method: 'GET'
      }).then(function (results) {
        return results;
      });
    }
    var _getOperacaoById = function (id) {
      return $http({
        url: baseUrl.apiOperacoes + '/operacoes/' + id,
        method: 'GET'
      }).then(function (results) {
        return results;
      });
    }
    var _saveOperacao = function (data) {
      return $http({
        url: baseUrl.apiOperacoes + '/operacoes',
        method: 'POST',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then(function (results) {
        return results;
      });
    }
    var _updateOperacao = function (data) {
      return $http({
        url: baseUrl.apiOperacoes + '/operacoes',
        method: 'PUT',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then(function (results) {
        return results;
      });
    }

    var _addRecebivel = function (id , data) {
      return $http({
        url: baseUrl.apiOperacoes + '/operacoes/' + id + '/recebivel',
        method: 'POST',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then(function (results) {
        return results;
      }); 
    }

    var _addTarifaToOperacao = function (idOperacao, idTarifa, tarifa) {
      return $http({
        url: baseUrl.apiOperacoes + '/operacoes/' + idOperacao + '/tarifas/' + idTarifa,
        method: 'POST',
        data: tarifa,
        headers: {
          'Content-Type':'application/json'
        }
      }).then(function (results) {
        return results;
      });
    }

    // 

    var _getTarifas = function () {
      return $http({
        url: baseUrl.apiOperacoes + '/tarifas',
        method: 'GET'
      }).then(function (results) {
        return results;
      });
    };
    var _getTarifaById = function (id) {
      return $http({
        url: baseUrl.apiOperacoes + '/tarifas/' + id,
        method: 'GET'
      }).then(function (results) {
        return results;
      });
    };
    var _saveTarifa = function (data) {
      return $http({
        url: baseUrl.apiOperacoes + '/tarifas',
        method: 'POST',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then(function (results) {
        return results;
      });
    };
    var _updateTarifa = function (data) {
      return $http({
        url: baseUrl.apiOperacoes + '/tarifas',
        method: 'PUT',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then(function (results) {
        return results;
      });
    };
    var _deleteTarifa = function (data) {
      return $http({
        url: baseUrl.apiOperacoes + '/tarifas',
        method: 'DELETE',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then(function (results) {
        return results;
      });
    };

    var _liberarOperacao = function (id) {
      return $http({
        url: baseUrl.apiOperacoes + '/operacoes/' + id + '/iniciar',
        method: 'PUT'
      }).then(
        function (results) {
          return results;
        }
      )
    };

    var _getRecebiveisByOperacao = function (id) {
      return $http({
        url: baseUrl.apiOperacoes + '/operacoes/' + id + '/recebivel',
        method: 'GET'
      }).then(
        function (results) {
          return results;
        }
      )
    }

    
    // Comercial
    api.getCarteiras        = _getCarteiras;
    api.getCarteiraById     = _getCarteiraById;
    api.saveCarteira        = _saveCarteira;
    api.updateCarteira      = _updateCarteira;
    api.deleteCarteira      = _deleteCarteira;
    api.addTarifaToCarteira = _addTarifaToCarteira;

    api.getTarifas          = _getTarifas;
    api.getTarifaById       = _getTarifaById;
    api.saveTarifa          = _saveTarifa;
    api.updateTarifa        = _updateTarifa;
    api.deleteTarifa        = _deleteTarifa;

    api.getOperacoes        = _getOperacoes;
    api.getOperacaoById     = _getOperacaoById;
    api.saveOperacao        = _saveOperacao;
    api.updateOperacao      = _updateOperacao;
    api.addRecebivel        = _addRecebivel;
    api.addTarifaToOperacao = _addTarifaToOperacao;
    api.liberarOperacao     = _liberarOperacao;

    api.getRecebiveisByOperacao = _getRecebiveisByOperacao;

    return api;

}]);