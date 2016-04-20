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
  '$log',
  'Upload',
  'apiEmpresas',
  function ($scope, $state, $stateParams, apiOperacoes, toaster, $modal, SweetAlert, $log, Upload, apiEmpresas) {

    $scope.addRecebiveisToArray = function (operacoes) {
      angular.forEach(operacoes, function (value, key) {
        apiEmpresas.getById(value.uuidCedente).then(
          function (rs) {
            value.open = false;
            value.cedentes = rs.data
            value.recebiveis = [];
            value.recebiveis.push({"ativo": true,"dateLimiteDesconto": "2016-04-20T19:02:16.983Z","emissao": "2016-04-20T19:02:16.983Z","nossoNumero": "string","numero": "string","percentualDesconto": 0,"uuid": "string","valor": 0,"valorLiquido": 0,"vencimento": "2016-04-20T19:02:16.983Z"});
          }
        )
      })
    }

    $scope.getOperacoes = function () {
      apiOperacoes.getOperacoes().then(
        function (res) {
          $scope.operacoes = res.data;
          $scope.addRecebiveisToArray($scope.operacoes);
        }
      )
    }
    
    $scope.getOperacoes();

    $scope.openModalTarifas = function (idOperacao) {
      var modalInstance = $modal.open({
        templateUrl: 'views/wba/operacoes/modal-tarifas.html',
        controller: function ($scope, $modalInstance, apiOperacoes) {

          apiOperacoes.getTarifas().then(
            function (res) {
              $scope.tarifas = res.data;
            },
            function (err) {
              console.log(err)
            }
          )
          
          $scope.salvar = function (item) {
            $modalInstance.close(item);
          }

        },
      });

      // modal para cadastro de representante
      modalInstance.result.then(
        function (item) {
          apiOperacoes.addTarifaToOperacao(idOperacao, item.uuid, {valor: item.valor}).then(
            function (res) {
              toaster.pop('success','Adicionar tarifa à operação','Tarifa adionada com sucesso')
            },
            function(err) {
              toaster.pop('error','Adicionar tarifa à operação',err.statusText)
            }
          )
        }
      );
    }

  }
])