'use strict';
angular.module('wbaApp')
  .controller('ContasEditarController',[
    '$scope',
    '$state',
    '$stateParams',
    'toaster',
    'apiFinanceiro',
    function ($scope, $state, $stateParams, toaster, apiFinanceiro) {
      $scope.openInfoBox = false;

      $scope.addInfo = function () {
        $scope.openInfoBox = true;
        $scope.info = {};
        $scope.info.ativo = true;
      };

      $scope.getInfo = function () {
        $scope.openInfoBox = true;
        apiFinanceiro.getInfo($stateParams.contaId).then(
          function (res) {
            $scope.info = res.data;
            if($scope.info == ""){
              $scope.info = {};
            }
            else {
              $scope.info = $scope.info[0];
            }
          },
          function (err) {
            toaster.pop('error','Informações Bancárias',err.statusText)
          }
        )
      }();
      $scope.getBancos = function (){
        apiFinanceiro.getBancos().then(
          function (res) {
            $scope.bancos = res.data;
          },
          function (err) {
            toaster.pop('errors','Bancos',err.statusText);
          }
        )
      }();

      $scope.getLancamentos = function (){
        apiFinanceiro.getLancamentosConta($stateParams.contaId).then(
          function (res) {
            $scope.lancamentos = res.data
          },
          function (err) {
            toaster.pop('error','Lançamentos',err.statusText);
          }
        )
      };

      apiFinanceiro.getContaById($stateParams.contaId).then(
        function (res) {
          $scope.conta = res.data
          $scope.conta.uuidBanco = _.findWhere($scope.bancos, {uuid: $scope.conta.uuidBanco});
          $scope.getLancamentos();
        },
        function (err) {
          toaster.pop('error','Contas',err.statusText)
        }
      );

      $scope.update = function (conta, info) {
        apiFinanceiro.updateConta(conta).then(
          function (res) {
            toaster.pop('success','Contas','Conta atualizada com sucesso');
          },
          function (err) {
            toaster.pop('error','Conta',err.statusText);
          }
        )
        if(info.uuid) {
          info.uuidConta = $stateParams.contaId;
          apiFinanceiro.updateInfo($stateParams.contaId, info).then(
            function (res) {
              toaster.pop('sucess','Informações Bancárias','Dados atualizados com sucesso');
            },
            function (err) {
              toaster.pop('error','Informações Bancárias',err.statusText);
            }
          )
        }
        else {
          info.uuidConta = $stateParams.contaId;
          apiFinanceiro.addInfo($stateParams.contaId, info).then(
            function (res) {
              toaster.pop('sucess','Informações Bancárias','Dados salvos com sucesso');
            },
            function (err) {
              toaster.pop('error','Informações Bancárias',err.statusText);
            }
          )
        }
      };

    }
  ]);
