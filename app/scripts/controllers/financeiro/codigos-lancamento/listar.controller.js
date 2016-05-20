'use strict';
angular.module('wbaApp')
  .controller('CodigosListarController',[
    '$scope',
    '$state',
    '$stateParams',
    'toaster',
    'SweetAlert',
    '$modal',
    'apiFinanceiro',
    function ($scope, $state, $stateParams, toaster, SweetAlert, $modal, apiFinanceiro) {

      $scope.getCodigos = function () {
        apiFinanceiro.getCodigos().then(
          function (res) {
            $scope.codigos = res.data;
          },
          function (err) {
            toaster.pop('err','Códigos de Lançamento',err.statusText)
          }
        )
      }
      $scope.getCodigos();

      $scope.addCodigo = function () {
        var modalInstance = $modal.open({
          templateUrl: 'views/wba/financeiro/codigos-lancamento/modal-add-codigo.html',
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
                toaster.pop('success','Códigos de Lançamento','Código cadastrado com sucesso');
                $scope.getBancos();
              },
              function (err) {
                toaster.pop('error','Códigos de Lançamento',err.statusText);
              }
            )
          }
        );
      };
      $scope.editCodigo = function () {
        var modalInstance = $modal.open({
          templateUrl: 'views/wba/financeiro/bancos/modal-edit-banco.html',
          controller: function ($scope, $modalInstance) {
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
            apiFinanceiro.addBanco(item).then(
              function (res) {
                toaster.pop('success','Códigos de Lançamento','Código atualizado com sucesso');
                $scope.getBancos();
              },
              function (err) {
                toaster.pop('error','Bancos',err.statusText);
              }
            )
          }
        );
      };

    }
  ]);
