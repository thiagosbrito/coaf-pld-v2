'use strict';
angular.module('wbaApp')
  .factory('apiCep', ['$http', 'baseUrl', function ($http, baseUrl) {

    var api = {};

    var _consultaCep = function (cep) {
      return $http({
        url: 'http://viacep.com.br/ws/' + cep + '/json',
        method: 'GET'
      }).then(function (results) {
        return results;
      });
    };

    api.consultaCep = _consultaCep;

    return api;

}]);