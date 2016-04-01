'use strict';
angular.module('wbaApp')
  .controller('HierarquiasEditarController',[
    '$scope',
    '$state',
    '$stateParams',
    'toaster',
    'SweetAlert',
    'apiComercial',
    function ($scope, $state, $stateParams, toaster, SweetAlert, apiComercial) {

      $scope.hierarquia = {};

      apiComercial.getHierarquias().then(
        function (res) {
          $scope.hierarquia = res.data
        },
        function (err) {
          toaster.pop('error','Hierarquia',err.statusText);
        }
      );
      
      $scope.update = function () {
        // console.log($scope.hierarquia);
        apiComercial.updateHierarquia($scope.hierarquia).then(
          function (res) {
            toaster.pop('success','Hierarquia','Hierarquia atualizada com sucesso!');
            $state.go('wba.comercial.hierarquias.listar');
          },
          function (err) {
            toaster.pop('error','Hierarquia',err.statusText)
          }
        )
      };
    }
  ])