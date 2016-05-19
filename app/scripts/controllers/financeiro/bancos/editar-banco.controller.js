'use strict';
angular.module('wbaApp')
  .controller('BancoEditarController',[
    '$scope',
    '$state',
    '$stateParams',
    'toaster',
    'apiFinanceiro',
    function ($scope, $state, $stateParams, toaster, apiFinanceiro) {

      apiFinanceiro.getBancoById($stateParams.bancoId).then(
        function (res) {
          $scope.banco = res.data
        },
        function (err) {
          toaster.pop('error','Bancos',err.statusText)
        }
      );

      $scope.update = function (banco) {
        apiFinanceiro.updateBanco(banco).then(
          function (res) {
            toaster.pop('success','Bancos','Banco atualizado com sucesso');
            $scope.getBancos();
          },
          function (err) {
            toaster.pop('error','Bancos',err.statusText);
          }
        )
      };

    }
  ]);
