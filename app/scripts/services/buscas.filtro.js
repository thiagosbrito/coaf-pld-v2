'use strict';
angular.module('wbaApp')
  .factory('buscasFiltro', [
    function () {

      var api = {};
      api.data = null;

      api.storeData = function (data) {
        api.data = data
      };

      return api;

  }]);
