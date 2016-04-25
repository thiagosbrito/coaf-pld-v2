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
            value.cedentes = rs.data;
          }
        );
        apiOperacoes.getCarteiraById(value.uuidCarteira).then(
          function (rs) {
            value.carteira = rs.data;
          }
        );
        apiOperacoes.getRecebiveisByOperacao(value.uuid).then(
          function (rs) {
            value.recebiveis = rs.data;
          }
        );
      });
    };

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

          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          }

        },
      });


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
    };

    $scope.liberarOperacao = function (id) {

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
        if (isConfirm) {
          apiOperacoes.liberarOperacao(id).then(
            function (res) {
              toaster.pop('success','Operação','Operação liberada com sucesso');
            },
            function (err) {
              toaster.pop('error','Operação',err.statusText);
            }
          )
        }
      })
    }
  }
])
