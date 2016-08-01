'use strict';

angular.module('wbaApp')

  .factory('apiBuyingEntity',[
    'baseUrl',
    '$http',
    function(baseUrl, $http){
        
      var api = {};

      var _getBuyingEntities = function () {
        return $http({
          url: baseUrl.apiUrl + '/buyingEntities',
          method: 'GET'
        }).then(
          function (results) {
            return results
          }
        )
      };

      var _getBuyingEntityById = function (id) {
        return $http({
          url: baseUrl.apiUrl + '/buyingEntities/' + id,
          method: 'GET'
        }).then(
          function (results) {
            return results
          }
        )
      }

      api.getBuyingEntities   = _getBuyingEntities;
      api.getBuyingEntityById = _getBuyingEntityById;

      return api;
    }
  ])