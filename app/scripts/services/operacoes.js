'use strict';
angular.module('wbaApp')
  .factory('apiOperacoes', ['$http', 'baseUrl', function ($http, baseUrl) {

    var api = {};

    // LIST
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

    
    // Comercial
    api.getCarteiras        = _getCarteiras;
    api.getCarteiraById     = _getCarteiraById;
    api.saveCarteira        = _saveCarteira;
    api.updateCarteira      = _updateCarteira;
    api.deleteCarteira      = _deleteCarteira;

    api.getOperacoes        = _getOperacoes;
    api.getOperacaoById     = _getOperacaoById;
    
    return api;

}]);