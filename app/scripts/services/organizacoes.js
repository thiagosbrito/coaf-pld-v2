'use strict';
angular.module('wbaApp')
  .factory('apiOrganizacoes', ['$http', 'baseUrl', function ($http, baseUrl) {

    var api = {};

    var _saveOrganization = function (data) {
      return $http({
        url: baseUrl.apiUrl + '/organizacoes',
        data: data,
        method: 'POST',
        headers: [
          {'Content-Type':'application/json'}
        ]
      }).then(function (results) {
        return results;
      });
    };

    var _getOrganizations = function () {
      return $http({
        url: baseUrl.apiUrl + '/organizacoes',
        method: 'GET'
      }).then(function (results) {
        return results;
      });
    };

    var _getOrganizationsModules = function () {
      return $http({
        url: baseUrl.apiUrl + '/organizacoes/moduloPermissoes',
        method: 'GET'
      }).then(function (results) {
        return results;
      });
    }

    var _getOrganizationsUsers = function (organizationId) {
      return $http({
        url: baseUrl.apiUrl + '/organizacoes/' + organizationId + '/usuarios',
        method: 'GET'
      }).then(function (results) {
        return results;
      });
    }

    var _saveOrganizationsUsers = function (organizationId, data) {
      return $http({
        url: baseUrl.apiUrl + '/organizacoes/' + organizationId + '/usuarios',
        method: 'POST',
        data: data
      }).then(function (results) {
        return results;
      });
    }

    var _getOrganizationsUsersGroups = function (organizationId, userId) {
      return $http({
        url: baseUrl.apiUrl + '/organizacoes/' + organizationId + '/usuarios/' + userId + '/grupos',
        method: 'GET'
      }).then(function (results) {
        return results;
      });
    }

    var _getOrganizationsUsersRoles = function (organizationId, userId) {
      return $http({
        url: baseUrl.apiUrl + '/organizacoes/' + organizationId + '/usuarios/' + userId + '/roles',
        method: 'GET'
      }).then(function (results) {
        return results;
      });
    }

    var _putOrganizationsUsersRoles = function (organizationId, userId, clientId) {
      return $http({
        url: baseUrl.apiUrl + '/organizacoes/' + organizationId + '/usuarios/' + userId + '/roles/' + clientId,
        method: 'PUT'
      }).then(function (results) {
        return results;
      });
    }


    api.saveOrganization              = _saveOrganization;
    api.getOrganizations              = _getOrganizations;
    api.getOrganizationsUsers         = _getOrganizationsUsers;
    api.saveOrganizationsUsers        = _saveOrganizationsUsers;
    api.getOrganizationsUsersGroups   = _getOrganizationsUsersGroups;
    api.getOrganizationsUsersRoles    = _getOrganizationsUsersRoles;
    api.putOrganizationsUsersRoles    = _putOrganizationsUsersRoles;
    
    return api;

}]);