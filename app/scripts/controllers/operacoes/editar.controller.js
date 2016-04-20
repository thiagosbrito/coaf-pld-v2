'use strict';

angular.module('wbaApp')
.controller('OperacoesEditarController', [
  '$scope',
  '$state',
  '$stateParams',
  'apiOperacoes',
  'apiEmpresas',
  'toaster',
  'SweetAlert',
  '$modal',
  'operacao',
  function ($scope, $state, $stateParams, apiOperacoes, apiEmpresas, toaster, SweetAlert, $modal, operacao) {

    apiEmpresas.getAll().then(
      function (res) {
        $scope.cedentes = res.data;
        $scope.cedente = _.where($scope.cedentes, {id: parseInt(operacao.uuidCedente)});
        console.log($scope.cedente, operacao.uuidCedente);
      },
      function (err) {
        toaster.pop('error','Cedentes',err.statusText);
      }
    );

    apiOperacoes.getCarteiras().then(
      function (res) {
        $scope.carteiras = res.data;
        $scope.carteiraOpe = _.where($scope.carteiras, {uuid: operacao.uuidCarteira});
      },
      function (err) {
        toaster.pop('error','Carteiras',err.statusText)
      }
    );

    // apiOperacoes.getOperacaoById($stateParams.operacaoId).then(
    //   function (res) {
    //     $scope.operacao = res.data;
    //   },
    //   function (err) {
    //     toaster.pop('error','Operação',err.statusText);
    //   }
    // );

    $scope.operacao = operacao;

    console.log($scope.operacao);



    $scope.update = function (data) {
      apiOperacoes.updateOperacao(data).then(
        function(res) {
          toaster.pop('success','Operações','Operação atualizada com sucesso');
          $state.go('wba.operacoes.listar');
        },
        function (err) {
          toaster.pop('error','Operações',err.statusText)
        }
      )
    }

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