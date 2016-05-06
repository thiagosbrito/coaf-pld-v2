'use strict';
angular.module('wbaApp')
  .controller('TarifasOperacaoController',[
    '$scope',
    '$stateParams',
    'apiOperacoes',
    function ($scope, $stateParams, apiOperacoes) {



      $scope.getTarifas = function () {
        apiOperacoes.getTarifasByOperacao($stateParams.operacaoId).then(
          function (res) {
            $scope.tarifas = res.data;
          }
        )
      };

      
      $scope.getTarifas();
    }
  ]);
