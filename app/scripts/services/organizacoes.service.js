'use strict';
angular.module('theme.core.services', [])
  .factory('apiOrganizacoes', ['$http', 'baseUrl', function ($http, baseUrl) {

    var _getList = function () {
      var url = baseUrl + '/organizacoes';
      return $http.get(url).then(function (results) {
        return results;
      });
    };

    var _save = function (data) {
      var url = baseUrl + '/organizacoes';
      return $http.post(url, data).then(function (results) {
        return results;
      });
    };

    apiOrganizacoes.save = _save;
    apiOrganizacoes.getList = _getList;
    return apiOrganizacoes;

}]);