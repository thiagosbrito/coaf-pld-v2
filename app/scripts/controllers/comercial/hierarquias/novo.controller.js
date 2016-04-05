'use strict';
angular.module('wbaApp')
  .controller('HierarquiasNovoController',[
    '$scope',
    '$state',
    '$stateParams',
    'toaster',
    'SweetAlert',
    'apiComercial',
    function ($scope, $state, $stateParams, toaster, SweetAlert, apiComercial) {
      
      $scope.hierarquia = {
        "ativo": null,
        "hierarquia": null,
        "hierarquiaPai": null,
        "nome": null,
        "tipoHierarquia": null,
        "uuidPlataforma": null
      }

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

      $scope.addHierarquia = function (item) {
        if(angular.isArray($scope.hierarquia.hierarquiaPai)) {
          $scope.hierarquia.hierarquiaPai.push(item)
        }
        else {
          $scope.hierarquia.hierarquiaPai = [];
          $scope.hierarquia.hierarquiaPai.push(item)
        }
      }

      $scope.save = function () {
        apiComercial.saveHierarquia($scope.hierarquia).then(
          function (res) {
            toaster.pop('success','Hierarquia','Hierarquia cadastrada com sucesso!');
            $state.go('wba.comercial.hierarquias.listar');
          },
          function (err) {
            toaster.pop('error','Hierarquia',err.statusText)
          }
        )
      }

      // 
    }
  ])