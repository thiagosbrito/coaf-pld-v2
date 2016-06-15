'use strict';

angular.module('wbaApp')
  .controller('EditarTarifasCarteiraController', [
    '$scope',
    '$stateParams',
    '$state',
    'apiOperacoes',
    'toaster',
    '$modal',
    function ($scope, $stateParams, $state, apiOperacoes, toaster, $modal) {

      $scope.getTarfifas = function () {
        apiOperacoes.getTarifasByCarteira($stateParams.carteiraId).then(
          function (res) {
            $scope.tarifas = res.data
          },
          function (err) {
            toaster.pop('error','Tarifas',err.statusText);
          }
        )
      };
      $scope.getTarfifas();


      $scope.addTarifa = function () {
        var modalInstance = $modal.open({
          templateUrl: 'views/wba/operacoes/carteiras/modal-tarifas.html',
          controller: function ($scope, $modalInstance, apiOperacoes) {

            $scope.getTarifas = function () {
              apiOperacoes.getTarifas().then(
                function (res) {
                  $scope.tarifas = res.data;
                }
              )
            };
            $scope.getTarifas();

            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };
            $scope.saveTarifa = function (item) {
              $modalInstance.close(item);
            };
          }
        });

        modalInstance.result.then(
          function (tarifa) {
            apiOperacoes.addTarifaToCarteira($stateParams.carteiraId, tarifa.uuid, {valor: tarifa.valor}).then(
              function (res) {
                toaster.pop('success','Tarifa','Tarifa adicionada à carteira');
                $scope.getTarfifas();
              },
              function (err) {
                toaster.pop('error','Tarifas',err.statusText);
              }
            )
          },
          function () {

          }
        )
      };


    }
  ]);
