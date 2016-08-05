'use strict';

angular.module('wbaApp')
  .factory('apiPolicies',[
    '$http',
    'baseUrl',
    function ($http, baseUrl) {

      var api = {};

      var _getPolicies = function () {
        return $http({
          url: baseUrl.apiUrl + '/policies',
          method: 'GET'
        }).then(
          function (results) {
            return results
          }
        )
      };

      var _getPoliciesByCustomerId = function (customerId) {
        return $http({
          url: baseUrl.apiUrl + '/policies/' + customerId,
          method: 'GET'
        }).then(
          function (results) {
            return results
          }
        )
      };

      var _getPoliciesBySearchType = function (type) {
        return $http({
          url: baseUrl.apiUrl + '/policies/byType/' + type,
          method: 'GET'
        }).then(
          function (results) {
            return results
          }
        )
      };

      var _getPolicyById = function (id) {
        return $http({
          url: baseUrl.apiUrl + '/policies/' + id,
          method: 'GET'
        }).then(
          function (results) {
            return results;
          }
        )
      };

      var _savePolicy = function (data) {
        return $http({
          url: baseUrl.apiUrl + '/policies',
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
      };
      var _updatePolicy = function (id, data) {
        return $http({
          url: baseUrl.apiUrl + '/policies/' + id,
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
      };


      api.getPolicies               = _getPolicies;
      api.getPoliciesByCustomerId   = _getPoliciesByCustomerId;
      api.getPoliciesBySearchType   = _getPoliciesBySearchType;
      api.getPolicyById             = _getPolicyById;
      api.savePolicy                = _savePolicy; 
      api.updatePolicy              = _updatePolicy; 
      return api;

    }
  ]);