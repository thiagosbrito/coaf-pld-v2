'use strict';
angular.module('wbaApp')
  .controller('ContasListarController',[
    '$scope',
    "$state",
    '$stateParams',
    '$modal',
    'SweetAlert',
    'toaster',
    'apiFinanceiro',
    function ($scope, $state, $stateParams, $modal, SweetAlert, toaster, apiFinanceiro) {

      $scope.getBancos = function () {
        apiFinanceiro.getBancos().then(
          function (res) {
            $scope.bancos = res.data
          },
          function (err) {
            toaster.pop('error','Bancos',err.statusText);
          }
        )
      }();
      $scope.getContas = function () {
        apiFinanceiro.getContas().then(
          function (res) {
            $scope.contas = res.data
            angular.forEach($scope.contas, function (value){
              value.uuidBanco = _.findWhere($scope.bancos, {uuid: value.uuidBanco});
            })
          },
          function (err) {
            toaster.pop('error','Contas',err.statusText)
          }
        )
      };
      $scope.getContas();
      $scope.addConta = function () {
        var modalInstance = $modal.open({
          templateUrl: 'views/wba/financeiro/contas/modal-add-conta.html',
          controller: function ($scope, $modalInstance, apiFinanceiro, toaster) {
            $scope.conta = {};
            $scope.conta.ativo = true;
            apiFinanceiro.getBancos().then(
              function (res) {
                $scope.bancos = res.data
              },
              function (err) {
                toaster.pop('error','Contas',err.statusText)
              }
            );

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
            if(item.uuidBanco) {
              item.uuidBanco = item.uuidBanco.uuid;
            }
            apiFinanceiro.addConta(item).then(
              function (res) {
                toaster.pop('success','Contas','Conta cadastrada com sucesso');
                $scope.getContas();
              },
              function (err) {
                toaster.pop('error','Contas',err.statusText);
              }
            )
          }
        );
      };
      $scope.editConta = function (conta) {
        var modalInstance = $modal.open({
          templateUrl: 'views/wba/financeiro/contas/modal-edit-conta.html',
          resolve: {
            conta: function() {
              return conta
            }
          },
          controller: function ($scope, $modalInstance, conta) {
            $scope.conta = conta;
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
            apiFinanceiro.updateConta(item).then(
              function (res) {
                toaster.pop('success','Contas','Conta atualizada com sucesso');
                $scope.getContas();
              },
              function (err) {
                toaster.pop('error','Contas',err.statusText);
              }
            )
          }
        );
      };
      $scope.deleteConta = function (conta) {
        SweetAlert.swal({
          title: "Você tem certeza?",
          text: "Se prosseguir essa operação não poderá ser desfeita",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Prosseguir",
          cancelButtonText: "Cancelar",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm) {
          if (isConfirm) {
            apiFinanceiro.deleteConta(conta).then(
              function (res) {
                SweetAlert.swal("Excluído", "Seu item foi excluído com sucsso.", "success");
                $scope.getContas();
              }
            );
          } else {
            SweetAlert.swal("Contas", "Seu item não foi excluído.", "error");
          }

        });

      }

    }
  ]);
