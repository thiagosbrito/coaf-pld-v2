'use strict';
angular.module('wbaApp')
  .controller('HierarquiasListarController',[
    '$scope',
    '$state',
    '$stateParams',
    'toaster',
    'SweetAlert',
    'apiComercial',
    function ($scope, $state, $stateParams, toaster, SweetAlert, apiComercial) {
      
      apiComercial.getHierarquias().then(
        function (res) {
          $scope.hierarquias = res.data;
        },
        function (err) {
          toaster.pop('error','Hierarquias',err.statusText)
        }
      );
      
    }
  ])