'use strict';
angular.module('wbaApp')
  .controller('ContasEditarController',[
    '$scope',
    '$state',
    '$stateParams',
    'toaster',
    'apiFinanceiro',
    function ($scope, $state, $stateParams, toaster, apiFinanceiro) {

      // definitions for date
      $scope.today = function() {
        $scope.dt = new Date();
      };
      $scope.today();
      $scope.clear = function () {
        $scope.dt = null;
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
        startingDay: 1
      };
      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = $scope.formats[0];
      // end of definitions

      $scope.openInfoBox = false;
      $scope.transacao = {};
      $scope.transacao.lancamentos = [];

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
            $scope.lancamentos = res.data;
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

      $scope.lancamento = {};

      $scope.addLancamentoToTransacao = function (lancamento) {
        lancamento.createdAt = new Date();
        lancamento.createdAt = moment(lancamento.createdAt).toISOString();
        lancamento.uuidConta = $stateParams.contaId;
        $scope.transacao.lancamentos.push(lancamento);
        $scope.lancamento = {};
      };

      $scope.addTransacao = function (transacao) {
        transacao.createdAt = new Date();
        transacao.dataContabil = moment(transacao.dataContabil).toISOString()
        transacao.createdAt = moment(transacao.createdAt).toISOString();
        apiFinanceiro.addTransacao(transacao).then(
          function (res) {
            toaster.pop('success','Transações','Transação cadastrada com sucesso');
          },
          function (err) {
            toaster.pop('error','Transações',err.statusText);
          }
        )
      };

    }
  ]);
