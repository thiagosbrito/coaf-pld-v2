'use strict';

angular.module('wbaApp')

  .factory('apiChart', [
    'baseUrl',
    '$http', 
    function(baseUrl, $http){
      var api = {};

      var _getChartData = function (opt) {
        return $http({
          url: baseUrl.apiUrl + '/analyzes/pie/chart??endDay='+opt.endDay+'&endMonth='+opt.endMonth+'&endYear='+opt.endYear+'&startDay='+opt.startDay+'&startMonth='+opt.startMonth+'&startYear='+opt.startYear+'&type='+opt.type,
          method: 'GET'
        }).then(
          function (results) {
            return results
          }
        )
      };

      api.getChartData = _getChartData;

      return api;
    }
  ])