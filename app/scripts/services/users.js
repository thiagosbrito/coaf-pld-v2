'use strict';
angular.module('wbaApp')
  .factory('apiUsers', ['$http', 'baseUrl', function ($http, baseUrl) {

    var api = {};

    var _getUsers = function (userId) {
    	return $http({
    		url: baseUrl.apiUrl + '/users/' + userId,
    		method: 'GET'
    	}).then( function (results){
			return results
        })
    };
    
    api.getUsers = _getUsers;
    
    return api;

  }]);
