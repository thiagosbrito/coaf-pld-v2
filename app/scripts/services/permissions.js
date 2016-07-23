'use strict';
angular.module('wbaApp')
  .factory('apiPermissions', ['$http', 'baseUrl', function ($http, baseUrl) {

    var api = {};

    var _getPermissions = function () {
    	return $http({
    		url: baseUrl.apiUrl + '/permissions',
    		method: 'GET'
    	}).then(
			function (results) {
				return results
			}
    	)
    }
    
    var _getAllPermissions = function () {
    	return $http({
    		url: baseUrl.apiUrl + '/permissions/allPermissions',
    		method: 'GET'
    	}).then(
			function (results) {
				return results
			}
    	)
    }

    api.getPermissions = _getPermissions;
    api.getAllPermissions = _getAllPermissions;
    
    return api;

  }]);
