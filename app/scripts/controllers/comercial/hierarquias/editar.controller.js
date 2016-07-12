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

      apiComercial.getHierarquiasById($stateParams.hierarquiaId).then(
        function (res) {
          $scope.hierarquia = res.data;
        },
        function (err) {
          toaster.pop('error','Hierarquia',err.statusText)
        }
      );

      apiComercial.getHierarquias().then(
        function (res) {
          $scope.hierarquias = res.data;
        },
        function (err) {
          toaster.pop('error','Hierarquia',err.statusText)
        }
      );

      apiComercial.getPlataformas().then(
        function (res) {
          $scope.plataformas = res.data;
        },
        function (err) {
          toaster.pop('error','Plataformas',err.statusText)
        }
      );
      
      $scope.update = function () {
        if($scope.hierarquia.uuidPlataforma) {
          $scope.hierarquia.uuidPlataforma = $scope.hierarquia.uuidPlataforma.uuid;
        };
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