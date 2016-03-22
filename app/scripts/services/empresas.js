'use strict';
angular.module('wbaApp')
  .factory('apiEmpresas', ['$http', 'baseUrl', function ($http, baseUrl) {

    var api = {};

    var _getAll = function (cep) {
      return $http({
        url: baseUrl.apiEmpresas + '/empresas',
        method: 'GET'
      }).then(function (results) {
        return results;
      });
    };

    var _getById = function (id) {
      return $http({
        url: baseUrl.apiEmpresas + '/empresas/' + id,
        method: 'GET'
      }).then(function (results) {
        return results;
      });
    };

    var _save = function (data) {
      return $http({
        url: baseUrl.apiEmpresas + '/empresas',
        method: 'POST',
        data: data,
        headers: [
          {'Content-Type':'application/json'}
        ]
      }).then(function (results) {
        return results;
      })
    };

    var _update = function (data) {
      return $http({
        url: baseUrl.apiEmpresas + '/empresas',
        method: 'PUT',
        data: data,
        headers: [
          {'Content-Type':'application/json'}
        ]
      }).then(function (results) {
        return results;
      })
    };
    
    var _delete = function (id) {
      return $http({
        url: baseUrl.apiEmpresas + '/empresas/' + id,
        method: 'DELETE'
      }).then(function (results) {
        return results;
      })
    };

    api.getAll = _getAll;
    api.getById = _getById;
    api.save = _save;
    api.update = _update;
    api.delete = _delete;

    return api;

}]);