'use strict';
angular.module('wbaApp')
  .factory('apiAnalizes', ['$http', 'baseUrl', function ($http, baseUrl) {

    var api = {};

    // CPONFERENCIA DE DOCUMENTOS API
    var _getAnalizes = function (filter) {
    	if (filter.startDate == null) {
    		filter.startDate = moment().format('DD-MM-YYYY');
    	}
    	if (filter.endDate == null) {
    		filter.endDate = moment().format('DD-MM-YYYY');
    	}
    	return $http({
    		url: baseUrl.apiUrl + '/analyzes?count='+filter.count+'&endDate='+filter.endDate+'&inputCpfCnpjFilter='+filter.inputCpfCnpjFilter+'&inputNomeFilter='+filter.inputNomeFilter+'&inputNumeroOperacaoFilter='+filter.inputNumeroOperacaoFilter+'&maxResults='+filter.maxResults+'&startDate='+filter.startDate+'&startResult='+filter.startResult+'&status='+filter.status+'&type='+filter.type,
    		method: 'GET'
    	}).then( function (results){
			return results
        })
    };

    var _getAnalizeBydId = function (id) {
        return $http({
            url: baseUrl.apiUrl + '/analyzes/' + id,
            method: 'GET'
        }).then(
            function (results) {
                return results
            }
        )
    };

    var _save = function (data) {
        return $http({
            url: baseUrl.apiUrl + '/analyzes',
            method: 'POST',
            data: data,
            headers: {
                'Content-Type':'application/json'
            }
        }).then(
            function (results){
                return results
            }
        )
    }

    var _update = function (id, data) {
        return $http({
            url: baseUrl.apiUrl + '/analyzes/' + id,
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
    }

    var _execute = function (id, data) {
        return $http({
            url: baseUrl.apiUrl + '/analyzes/' + id + '/doFinish',
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
    }

    var _printAuthorization = function (id) {
        return $http({
            url: baseUrl.apiUrl + '/analyzes/' + id + '/commitmentToRelationshipReport',
            method: 'GET'
        }).then(
            function (results) {
                return results
            }
        )
    };
    

    api.getAnalizes               = _getAnalizes;
    api.getAnalizeById            = _getAnalizeBydId;
    api.save                      = _save;
    api.execute                   = _execute;
    api.update                    = _update;
    api.printAuthorization        = _printAuthorization;
    
    return api;

  }]);
