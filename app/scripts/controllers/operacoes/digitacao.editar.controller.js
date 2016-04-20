'use strict';

angular.module('wbaApp')
  .controller('DigitacaoOperacaoController',[
    '$scope',
    '$state',
    '$stateParams',
    'operacao',
    function ($scope, $state, $stateParams, operacao) {

      $scope.operacao = operacao;

    }

  ]);