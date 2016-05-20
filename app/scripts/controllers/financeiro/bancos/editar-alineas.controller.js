'use strict';
angular.module('wbaApp')
  .controller('AlineasEditarController',[
    '$scope',
    '$stateParams',
    '$state',
    'apiFinanceiro',
    '$modal',
    'SweetAlert',
    'toaster',
    function ($scope, $stateParams, $state, apiFinanceiro, $modal, SweetAlert, toaster) {
      $scope.getAlineas = function () {
        apiFinanceiro.getAlineas($stateParams.bancoId).then(
          function (res) {
            $scope.alineas = res.data;
          },
          function (err) {
            toaster.pop('error','Alineas',err.statusText);
          }
        )
      }
      $scope.getAlineas();
      $scope.getBancos = function () {
        apiFinanceiro.getBancos().then(
          function (res) {
            $scope.bancos = res.data
          }
        );
      }();

      $scope.addAlinea = function () {
        var modalInstance = $modal.open({
          templateUrl: 'views/wba/financeiro/bancos/modal-add-alinea.html',
          resolve: {
            bancos: function () {
              return $scope.bancos
            }
          },
          controller: function ($scope, $modalInstance, apiFinanceiro, bancos) {
            $scope.bancos = bancos;
            $scope.alinea = {};
            $scope.alinea.reapresentavel = true;
            $scope.alinea.uuidBanco = _.findWhere(bancos,{uuid: $stateParams.bancoId});
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
            apiFinanceiro.addAlinea(item.uuidBanco, item).then(
              function (res) {
                toaster.pop('success','Alinea','Alinea cadastrada com sucesso');
                $scope.getAlineas();
              },
              function (err) {
                toaster.pop('error','Alinea',err.statusText);
              }
            )
          }
        );
      };

      $scope.deleteAlinea = function (alinea) {
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
              alinea.uuidBanco = alinea.uuidBanco.uuid;
              apiFinanceiro.deleteAlinea(alinea).then(
                function (res) {
                  SweetAlert.swal("Excluído", "Seu registro foi excluído com sucesso.", "success");
                }
              );
            } else {
              SweetAlert.swal("Alineas", "Seu item não foi excluído.", "error");
            }

          });
      }
    }
  ]);
