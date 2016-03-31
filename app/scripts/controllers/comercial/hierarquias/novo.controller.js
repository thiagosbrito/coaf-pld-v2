'use strict';
angular.module('wbaApp')
  .controller('PlataformasNovoController',[
    '$scope',
    '$state',
    '$stateParams',
    'toaster',
    'SweetAlert',
    'apiComercial',
    function ($scope, $state, $stateParams, toaster, SweetAlert, apiComercial) {
      
      $scope.plataforma = {};

      $scope.save = function () {
        apiComercial.savePlataforma($scope.plataforma).then(
          function (res) {
            toaster.pop('success','Plataforma','Plataforma cadastrada com sucesso!');
            $state.go('wba.comercial.plataformas.listar');
          },
          function (err) {
            toaster.pop('error','Plataforma',err.statusText)
          }
        )
      }

    }
  ])