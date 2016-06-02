'use strict';
angular.module('wbaApp')
  .controller('CentroCustoListarController',[
    '$scope',
    '$state',
    '$stateParams',
    'apiFinanceiro',
    '$modal',
    'toaster',
    'SweetAlert',
    function ($scope, $state, $stateParams, apiFinanceiro, $modal, toaster, SweetAlert) {


      $scope.getCentroCusto = function () {
        apiFinanceiro.getCentroCusto().then(
          function (res) {
            $scope.centrosCusto = res.data
          },
          function (err) {
            toaster.pop('error','Centro de Custo',err.statusText)
          }
        )
      };
      $scope.getCentroCusto();

      $scope.addCentroCusto = function () {
        var modalInstance = $modal.open({
          templateUrl: 'views/wba/financeiro/centro-custo/modal-add-centro-custo.html',
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
            apiFinanceiro.addCentroCusto(item).then(
              function (res) {
                toaster.pop('success','Centro de Custo','Centro de Custo cadastrado com sucesso');
                $scope.getCentroCusto();
              },
              function (err) {
                toaster.pop('error','Centro de Custo',err.statusText);
              }
            )
          }
        );
      };
      $scope.updateCentroCusto = function (centroCusto) {
        var modalInstance = $modal.open({
          templateUrl: 'views/wba/financeiro/centro-custo/modal-update-centro-custo.html',
          resolve: {
            centroCusto: function () {
              return centroCusto
            }
          },
          controller: function ($scope, $modalInstance, centroCusto) {
            $scope.centroCusto = centroCusto;
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
            apiFinanceiro.updateCentroCusto(item).then(
              function (res) {
                toaster.pop('success','Centro de Custo','Centro de Custo atualizado com sucesso');
                $scope.getCentroCusto();
              },
              function (err) {
                toaster.pop('error','Centro de Custo',err.statusText);
              }
            )
          }
        );
      };
      $scope.deleteCentroCusto = function  (centroCusto) {
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
              apiFinanceiro.deleteCentroCusto(centroCusto).then(
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
