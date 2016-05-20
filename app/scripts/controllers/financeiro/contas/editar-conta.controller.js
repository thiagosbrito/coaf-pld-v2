'use strict';
angular.module('wbaApp')
  .controller('ContasEditarController',[
    '$scope',
    '$state',
    '$stateParams',
    'toaster',
    'apiFinanceiro',
    function ($scope, $state, $stateParams, toaster, apiFinanceiro) {

      apiFinanceiro.getContaById($stateParams.contaId).then(
        function (res) {
          $scope.conta = res.data
        },
        function (err) {
          toaster.pop('error','Contas',err.statusText)
        }
      );

      $scope.update = function (conta) {
        apiFinanceiro.updateConta(conta).then(
          function (res) {
            toaster.pop('success','Contas','Conta atualizada com sucesso');
            $scope.getContas();
          },
          function (err) {
            toaster.pop('error','Conta',err.statusText);
          }
        )
      };

    }
  ]);
