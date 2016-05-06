'use strict';
angular.module('wbaApp')
  .controller('AnaliseOperacaoController',[
    '$scope',
    '$stateParams',
    'apiOperacoes',
    function ($scope, $stateParams, apiOperacoes) {

      $scope.calcularLancamentos = function() {
        apiOperacoes.calcularLancamentos($stateParams.operacaoId).then(
          function (res) {
            if (res) {
              console.log(res);
            }
          },
          function (err) {
            console.log(err);
          }
        ).then(
          apiOperacoes.getLancamentosByOperacao($stateParams.operacaoId).then(
            function (res) {
              $scope.lancamentos = res.data;
            }
          )
        )
      };

      $scope.calcularLancamentos();
      
    }
  ]);
