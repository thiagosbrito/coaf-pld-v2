'use strict';
angular.module('wbaApp')
  .controller('TarifasOperacaoController',[
    '$scope',
    '$stateParams',
    'apiOperacoes',
    'SweetAlert',
    'toaster',
    function ($scope, $stateParams, apiOperacoes, SweetAlert, toaster) {

      $scope.expandTars = false;

      $scope.addTarifa = function () {
        $scope.expandTars = true;
        $scope.tarifas.push({});
      };

      $scope.getTarifasList = function () {
        apiOperacoes.getTarifas().then(
          function (res) {
            $scope.listTarifas = res.data;
          }
        )
      };

      $scope.getTarifas = function () {
        apiOperacoes.getTarifasByOperacao($stateParams.operacaoId).then(
          function (res) {
            $scope.tarifas = res.data;
            angular.forEach($scope.tarifas, function (value) {
              value.editTar = false;
            });
            $scope.getTarifasList();
          }
        )
      };

      $scope.enableEdit = function (item) {
        if(item.editTar == true) {
          item = _.omit(item, 'editTar');
          item = _.omit(item, 'uuidTipoLancamento');
          apiOperacoes.updateTarifa(item).then(
            function (res) {
              toaster.pop('success','Tarifa','Tarifa atualizada com sucesso');
              item.editTar = false;
            },
            function (err) {
              toaster.pop('error','Tarifa',err.statusText);
            }
          );
        }
        else {
          item.editTar = true;
        }

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
      $scope.clearFormTarifa = function () {
        $scope.idTarifa = null;
        $scope.tarifa = {}
      };
      $scope.adicionarTarifaOperacao = function (idTarifa, valor) {
        apiOperacoes.addTarifaToOperacao($stateParams.operacaoId, idTarifa, {valor: valor}).then(
          function (res) {
            toaster.pop('success','Tarifa','Tarifa adicionada à operação com sucesso');
            $scope.getTarifas();
            $scope.clearFormTarifa()
          },
          function (err) {
            toaster.pop('error','Tarifa',err.statusText)
          }
        )
      };

      $scope.getTarifas();
    }
  ]);
