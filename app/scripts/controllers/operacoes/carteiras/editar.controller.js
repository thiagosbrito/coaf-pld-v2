'use strict';

angular.module('wbaApp')

  .controller('CarteirasEditarController',[
    '$scope',
    '$state',
    '$stateParams',
    'apiOperacoes',
    'toaster',
    '$modal',
    'SweetAlert',
    function ($scope, $state, $stateParams, apiOperacoes, toaster, $modal, SweetAlert) {

      $scope.getCarteira = function () {
        apiOperacoes.getCarteiraById($stateParams.carteiraId).then(
          function (res) {
            console.log(res.data);
            $scope.carteira = res.data;
          }
        )
      }
      $scope.getCarteira();

      apiOperacoes.getTarifas().then(
        function (res) {
          $scope.tarifas = res.data;
        }
      )

      $scope.saveTarifa = function (tarifa) {
        var obj = {
          valor: tarifa.valor
        };
        var carteiraId = $stateParams.carteiraId;
        var tarifaId = tarifa.uuid;
        apiOperacoes.addTarifaToCarteira(carteiraId, tarifaId, obj).then(
          function (res) {
            $scope.getCarteira();
            toaster.pop('success','Tarifas','Tarifa associada a carteira corretamente!');
          },
          function (err) {
            toaster.pop('error','Tarifas',err.statusText);
          }
        )
      }
    }

  ])