'use strict';
angular.module('wbaApp')
  .controller('TarifasOperacaoController',[
    '$scope',
    '$stateParams',
    'apiOperacoes',
    'SweetAlert',
    'toaster',
    function ($scope, $stateParams, apiOperacoes, SweetAlert, toaster) {



      $scope.getTarifas = function () {
        apiOperacoes.getTarifasByOperacao($stateParams.operacaoId).then(
          function (res) {
            $scope.tarifas = res.data;
          }
        )
      };

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



      $scope.deleteTarifa = function (id) {
        SweetAlert.swal({
            title: "Você tem certeza?",
            text: "Se prosseguir essa operação não poderá ser desfeita",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Prosseguir",
            closeOnConfirm: true
          },
          function(isConfirm){
            if(isConfirm) {
              apiOperacoes.deleteTarifaToOperacao($stateParams.operacaoId, id).then(
                function(res) {
                  toaster.pop('success','Tarifa','Tarifa excluída com sucesso!');
                  $scope.getTarifas();
                  $scope.calcularLancamentos();
                },
                function (err) {
                  toaster.pop('error','Tarifa',err.statusText);
                }
              )
            }
            else {
              return false
            }
          });
      };

      $scope.getTarifas();
    }
  ]);
