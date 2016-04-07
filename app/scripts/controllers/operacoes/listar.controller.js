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
        },
        function (err) {
          toaster.pop('error','Operações', err.statusText);
        }
      )
    }
    $scope.getOperacoes();

  }
])