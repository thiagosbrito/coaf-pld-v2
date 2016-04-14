'use strict';

angular.module('wbaApp')

.controller('OperacoesListarController',[
  '$scope',
  '$state',
  '$stateParams',
  'apiOperacoes',
  'toaster',
  '$modal',
  'SweetAlert',
  function ($scope, $state, $stateParams, apiOperacoes, toaster, $modal, SweetAlert) {

    $scope.getOperacoes = function () {
      apiOperacoes.getOperacoes().then(
        function (res) {
          $scope.operacoes = res.data;
          $scope.operacoes[0].recebiveis = [
            {
              "ativo": true,
              "dateLimiteDesconto": "2016-04-14T17:04:28.964Z",
              "emissao": "2016-04-14T17:04:28.964Z",
              "nossoNumero": "string",
              "numero": "string",
              "percentualDesconto": 0,
              "uuid": "string",
              "valor": 0,
              "valorLiquido": 0,
              "vencimento": "2016-04-14T17:04:28.964Z"
            }
          ]
        },
        function (err) {
          toaster.pop('error','Operações', err.statusText);
        }
      )
    }
    $scope.getOperacoes();

    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      language: 'pt-BR'
    };

  }
])