'use strict';
angular.module('wbaApp')
  .controller('BancosListarController', [
    '$scope',
    '$state',
    '$stateParams',
    'toaster',
    'SweetAlert',
    'apiFinanceiro',
    '$modal',
    function ($scope, $state, $stateParams, toaster, SweetAlert, apiFinanceiro, $modal) {

      $scope.getBancos = function () {
        apiFinanceiro.getBancos().then(
          function (res) {
            $scope.bancos = res.data
          },
          function (err) {
            toaster.pop('error','Bancos',err.statusText)
          }
        )
      };
      $scope.getBancos();

      $scope.addBanco = function () {
        var modalInstance = $modal.open({
          templateUrl: 'views/wba/financeiro/bancos/modal-add-banco.html',
          controller: function ($scope, $modalInstance) {
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
            apiFinanceiro.addBanco(item).then(
              function (res) {
                toaster.pop('success','Bancos','Banco cadastrado com sucesso');
                $scope.getBancos();
              },
              function (err) {
                toaster.pop('error','Bancos',err.statusText);
              }
            )
          }
        );
      };

      $scope.editBanco = function (banco) {
        var modalInstance = $modal.open({
          templateUrl: 'views/wba/financeiro/bancos/modal-edit-banco.html',
          resolve: {
            banco: function() {
              return banco
            }
          },
          controller: function ($scope, $modalInstance, banco ) {
            $scope.banco = banco;
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
            apiFinanceiro.updateBanco(item).then(
              function (res) {
                toaster.pop('success','Bancos','Banco atualizado com sucesso');
                $scope.getBancos();
              },
              function (err) {
                toaster.pop('error','Bancos',err.statusText);
              }
            )
          }
        );
      };

      $scope.deleteBanco = function (banco) {
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
            apiFinanceiro.deleteBanco(banco).then(
              function (res) {
                SweetAlert.swal("Excluído", "Seu arquivo foi exclído com sucsso.", "success");
              }
            );
          } else {
            SweetAlert.swal("Bancos", "Seu item não foi excluído.", "error");
          }

        });

      }
    }
  ]);
