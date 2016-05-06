'use strict';
angular.module('wbaApp')
  .factory('apiEmpresas', ['$http', 'baseUrl', function ($http, baseUrl) {

    var api = {};


    var _getAll = function () {
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

    // var _save = function (data) {
    //   var url = baseUrl.apiEmpresas + '/empresas';
    //   return $http.post(url, data, {headers: {'Content-Type':'application/json'}}).then(
    //     function (res) {
    //       return res
    //     }
    //   )
    // };

    var _save = function (data) {
      var url = baseUrl.apiEmpresas + '/empresas';
      return $http.post(url, data, {headers: {'Content-Type':'application/json'}}).
        success(function (data, status, headers, config) {
          return {data: data, headers: headers}
        }).
        error( function (data, status, headers, config) {
          return {data: data, headers: headers}
        })
    };

    var _update = function (data) {
      var url = baseUrl.apiEmpresas + '/empresas';
      return $http.put(url, data, {headers: {'Content-Type':'application/json'}}).then(
        function (res) {
          return res
        }
      )
    };

    var _delete = function (id) {
      var url = baseUrl.apiEmpresas + '/empresas/' + id;
      return $http.delete(url).then(
        function (res) {
          return res
        }
      )
    };

    // ENDERECOS
    var _getAddress = function (id) {
      var url = baseUrl.apiEmpresas + '/empresas/' + id + '/enderecos';
      return $http.get(url).then(
        function (res) {
          return res
        }
      )
    };
    var _getAddressById = function (idEmpresa, id) {
      var url = baseUrl.apiEmpresas + '/empresas/' + idEmpresa + '/enderecos/' + id;
      return $http.get(url).then(
        function (res) {
          return res
        }
      )
    };
    var _saveAddress = function (id, data) {
      var url = baseUrl.apiEmpresas + '/empresas/' + id + '/enderecos';
      return $http.post(url, data, {headers: {'Content-Type':'application/json'}}).then(
        function (res) {
          return res
        }
      )
    };
    var _updateAddress = function (id, data) {
      var url = baseUrl.apiEmpresas + '/empresas/' + id + '/enderecos';
      return $http.put(url, data, {headers: {'Content-Type':'application/json'}}).then(
        function (res) {
          return res
        }
      )
    };
    var _deleteAddress = function (idEmpresa, id) {
      var url = baseUrl.apiEmpresas + '/empresas/' + idEmpresa + '/enderecos/' + id;
      return $http.delete(url).then(
        function (res) {
          return res
        }
      )
    };

    // CONTATOS
    var _getContacts = function (id) {
      var url = baseUrl.apiEmpresas + '/empresas/' + id + '/contatos';
      return $http.get(url).then(
        function (res) {
          return res
        }
      )
    };
    var _getContactsById = function (idEmpresa, id) {
      var url = baseUrl.apiEmpresas + '/empresas/' + idEmpresa + '/contatos/' + id;
      return $http.get(url).then(
        function (res) {
          return res
        }
      )
    };
    var _saveContacts = function (id, data) {
      var url = baseUrl.apiEmpresas + '/empresas/' + id + '/contatos';
      return $http.post(url, data, {headers: {'Content-Type':'application/json'}}).then(
        function (res) {
          return res
        }
      )
    };
    var _updateContacts = function (id, data) {
      var url = baseUrl.apiEmpresas + '/empresas/' + id + '/contatos';
      return $http.put(url, data, {headers: {'Content-Type':'application/json'}}).then(
        function (res) {
          return res
        }
      )
    };
    var _deleteContacts = function (idEmpresa, id) {
      var url = baseUrl.apiEmpresas + '/empresas/' + idEmpresa + '/contatos/' + id;
      return $http.delete(url).then(
        function (res) {
          return res
        }
      )
    };

    // REPRESENTANTES
    var _getRepresentantes = function (id) {
      var url = baseUrl.apiEmpresas + '/empresas/' + id + '/representantes';
      return $http.get(url).then(
        function (res) {
          return res
        }
      )
    };
    var _getRepresentantesById = function (idEmpresa, id) {
      var url = baseUrl.apiEmpresas + '/empresas/' + idEmpresa + '/representantes/' + id;
      return $http.get(url).then(
        function (res) {
          return res
        }
      )
    };
    var _saveRepresentante = function (id, data) {
      var url = baseUrl.apiEmpresas + '/empresas/' + id + '/representantes';
      return $http.post(url, data, {headers: {'Content-Type':'application/json'}}).then(
        function (res) {
          return res
        }
      )
    };
    var _updateRepresentante = function (id, data) {
      var url = baseUrl.apiEmpresas + '/empresas/' + id + '/representantes';
      return $http.put(url, data, {headers: {'Content-Type':'application/json'}}).then(
        function (res) {
          return res
        }
      )
    };
    var _deleteRepresentante = function (idEmpresa, id) {
      var url = baseUrl.apiEmpresas + '/empresas/' + idEmpresa + '/representantes/' + id;
      return $http.delete(url).then(
        function (res) {
          return res
        }
      )
    };

    // TIPO REPRESENTANTE
    var _getTipoRepresentante = function () {
      var url = baseUrl.apiEmpresas + '/empresas/tiposRepresentante';
      return $http.get(url).then(
        function (res) {
          return res
        }
      )
    };
    var _getTipoRepresentanteById = function (id) {
      var url = baseUrl.apiEmpresas + '/empresas/tiposRepresentante/' + id;
      return $http.get(url).then(
        function (res) {
          return res
        }
      )
    };
    var _saveTipoRepresentante = function (data) {
      var url = baseUrl.apiEmpresas + '/empresas/tiposRepresentante';
      return $http.post(url, data, {headers: {'Content-Type':'application/json'}}).then(
        function (res) {
          return res
        }
      )
    };
    var _updateTipoRepresentante = function (data) {
      var url = baseUrl.apiEmpresas + '/empresas/tiposRepresentante';
      return $http.put(url, data, {headers: {'Content-Type':'application/json'}}).then(
        function (res) {
          return res
        }
      )
    };
    var _deleteTipoRepresentante = function (id) {
      var url = baseUrl.apiEmpresas + '/empresas/tiposRepresentante/' + id;
      return $http.delete(url).then(
        function (res) {
          return res
        }
      )
    };

    var _getCedentes = function (cnpj) {
      if(cnpj)
        var url = baseUrl.apiEmpresas + '/empresas?tipo=CEDENTE&numeroInscricao=' + cnpj;
      else
        var url = baseUrl.apiEmpresas + '/empresas?tipo=CEDENTE';
      return $http({
        url: url,
        method: 'GET'
      }).then(
        function (res) {
          return res
        }
      );
    };

    // empresas
    api.getAll      = _getAll;
    api.getCedentes = _getCedentes;
    api.getById     = _getById;
    api.save        = _save;
    api.update      = _update;
    api.delete      = _delete;

    // tipo Representantes
    api.getTipoRepresentante        = _getTipoRepresentante;
    api.getTipoRepresentanteById    = _getTipoRepresentanteById;
    api.saveTipoRepresentante       = _saveTipoRepresentante;
    api.updateTipoRepresentante     = _updateTipoRepresentante;
    api.deleteTipoRepresentante     = _deleteTipoRepresentante;

    // representantes
    api.getRepresentantes     = _getRepresentantes
    api.getRepresentantesById = _getRepresentantesById
    api.saveRepresentante     = _saveRepresentante
    api.updateRepresentante   = _updateRepresentante
    api.deleteRepresentante   = _deleteRepresentante

    // Contatos
    api.getContacts       = _getContacts;
    api.getContactsById   = _getContactsById;
    api.saveContacts      = _saveContacts;
    api.updateContacts    = _updateContacts;
    api.deleteContacts    = _deleteContacts;

    // Enderecos
    api.saveAddress     = _saveAddress;
    api.getAddress      = _getAddress;
    api.getAddressById  = _getAddressById;
    api.updateAddress   = _updateAddress;
    api.deleteAddress   = _deleteAddress;

    return api;

}]);
