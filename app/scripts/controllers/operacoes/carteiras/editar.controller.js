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
    'carteira',
    function ($scope, $state, $stateParams, apiOperacoes, toaster, $modal, SweetAlert, carteira) {

      $scope.carteira = carteira;

      apiOperacoes.getTarifas().then(
        function (res) {
          $scope.tarifas = res.data;
        }
      );

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

      $scope.updateCarteira = function (carteira) {
        apiOperacoes.updateCarteira(carteira).then(
          function (res) {
            toaster.pop('success','Carteira','Carteira atualizada com sucesso');
          },
          function (err) {
            toaster.pop('error','Carteira',err.statusText);
          }
        )
      }
    }

  ])
