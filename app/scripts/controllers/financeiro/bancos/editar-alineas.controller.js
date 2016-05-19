'use strict';
angular.module('wbaApp')
  .controller('AlineasEditarController',[
    '$scope',
    '$stateParams',
    '$state',
    'apiFinanceiro',
    '$modal',
    'SweetAlert',
    'toaster',
    function ($scope, $stateParams, $state, apiFinanceiro, $modal, SweetAlert, toaster) {
      $scope.getAlineas = function () {
        apiFinanceiro.getAlineas($stateParams.bancoId).then(
          function (res) {
            $scope.alineas = res.data;
          },
          function (err) {
            toaster.pop('error','Alineas',err.statusText);
          }
        )
      }
      $scope.getAlineas();

      $scope.addAlinea = function () {
        var modalInstance = $modal.open({
          templateUrl: 'views/wba/financeiro/bancos/modal-add-alinea.html',
          controller: function ($scope, $modalInstance, apiFinanceiro) {
            $scope.alinea = {};
            $scope.alinea.reapresentavel = true;
            apiFinanceiro.getBancos().then(
              function (res) {
                $scope.bancos = res.data
              }
            );

            $scope.save = function (item) {
              $modalInstance.close(item);
            };
            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };
          }
        });
        modalInstance.result.then(
          function (item) {
            if(item.uuidBanco){
              item.uuidBanco = item.uuidBanco.uuid
            }
            apiFinanceiro.addAlinea(item.uuidBanco, item).then(
              function (res) {
                toaster.pop('success','Alinea','Alinea cadastrada com sucesso');
                $scope.getAlineas();
              },
              function (err) {
                toaster.pop('error','Alinea',err.statusText);
              }
            )
          }
        );
      };
    }
  ]);
