'use strict';
angular.module('wbaApp')
  .controller('PlataformasListarController',[
    '$scope',
    '$state',
    '$stateParams',
    'toaster',
    'SweetAlert',
    'apiComercial',
    function ($scope, $state, $stateParams, toaster, SweetAlert, apiComercial) {
      
      $scope.plataformas = [];

      apiComercial.getPlataformas().then(
        function (res) {
          $scope.plataformas = res.data;
        },
        function (err) {
          toaster.pop('error','Plataformas',err.statusText)
        }
      )
    }
  ])