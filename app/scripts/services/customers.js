'use strict';
angular.module('wbaApp')
  .factory('apiCustomers', ['$http', 'baseUrl', function ($http, baseUrl) {

    var api = {};

    var _getCustomers = function (filter) {
    	return $http({
    		url: baseUrl.apiUrl + '/customers',
    		method: 'GET'
    	}).then( function (results){
			return results
        })
    };
    
    api.getCustomers               = _getCustomers;
    
    return api;

  }]);
