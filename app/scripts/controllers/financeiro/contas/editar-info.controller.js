'use strict';
angular.module('wbaApp')
  .controller('ContasInfoEditarController',[
    '$scope',
    "$state",
    '$stateParams',
    '$modal',
    'SweetAlert',
    'toaster',
    'apiFinanciero',
    function ($scope, $state, $stateParams, $modal, SweetAlert, toaster, apiFinanceiro) {

      $scope.getContas = function () {
        apiFinanceiro.getContas().then(
          function (res) {
            $scope.contas = res.data
          },
          function (err) {
            toaster.pop('error','Contas',err.statusText)
          }
        )
      };
      $scope.getContas();
      $scope.getInfos = function () {
        apiFinanceiro.getInstrucoes($stateParams.bancoId).then(
          function (res) {
            $scope.instrucoes = res.data;
            angular.forEach($scope.instrucoes, function (value){
              value.uuidBanco = _.findWhere($scope.bancos, {uuid: value.uuidBanco});
            })
          },
          function (err) {
            toaster.pop('error','Instruções',err.statusText);
          }
        )
      };
      $scope.getInfos();
      $scope.addInfo = function () {
        var modalInstance = $modal.open({
          templateUrl: 'views/wba/financeiro/bancos/modal-add-instrucao.html',
          resolve: {
            bancos: function () {
              return $scope.bancos
            }
          },
          controller: function ($scope, $modalInstance, bancos, $stateParams) {
            $scope.bancos = bancos;
            $scope.instrucao = {};
            $scope.instrucao.uuidBanco = _.findWhere(bancos, {uuid: $stateParams.bancoId});
            $scope.save = function (item) {
              $modalInstance.close(item);
            };
            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };
          }
        });
        modalInstance.result.then(
          function (item) {
            if(item.uuidBanco){
              item.uuidBanco = item.uuidBanco.uuid
            }
            apiFinanceiro.addInstrucoes(item.uuidBanco, item).then(
              function (res) {
                toaster.pop('success','Instrução de Cobrança','Instrução de Cobrança cadastrada com sucesso');
                $scope.getInstrucoes();
              },
              function (err) {
                toaster.pop('error','Instrução de Cobrança',err.statusText);
              }
            )
          }
        );
      };
      $scope.editInfo = function (instrucao) {
        var modalInstance = $modal.open({
          templateUrl: 'views/wba/financeiro/bancos/modal-edit-instrucao.html',
          resolve: {
            bancos: function () {
              return $scope.bancos
            },
            instrucao: function () {
              return instrucao
            }
          },
          controller: function ($scope, $modalInstance, bancos, instrucao) {
            $scope.bancos = bancos;
            $scope.instrucao = instrucao;
            $scope.instrucao.uuidBanco = _.findWhere(bancos, {uuid: $stateParams.bancoId});
            $scope.update = function (item) {
              $modalInstance.close(item);
            };
            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };
          }
        });
        modalInstance.result.then(
          function (item) {
            if(item.uuidBanco){
              item.uuidBanco = item.uuidBanco.uuid
            }
            apiFinanceiro.updateInstrucoes(item.uuidBanco, item).then(
              function (res) {
                toaster.pop('success','Instrução de Cobrança','Instrução de Cobrança atualizada com sucesso');
                $scope.getInstrucoes();
              },
              function (err) {
                toaster.pop('error','Instrução de Cobrança',err.statusText);
              }
            )
          }
        );
      };

    }
  ]);
