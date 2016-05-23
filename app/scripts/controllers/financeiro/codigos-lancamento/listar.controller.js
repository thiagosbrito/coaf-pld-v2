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

            $scope.codigo = {};
            $scope.codigo.ativo = true;
            
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
            apiFinanceiro.addCodigo(item).then(
              function (res) {
                toaster.pop('success','Códigos de Lançamento','Código cadastrado com sucesso');
                $scope.getCodigos();
              },
              function (err) {
                toaster.pop('error','Códigos de Lançamento',err.statusText);
              }
            )
          }
        );
      };
      $scope.editCodigo = function (cod) {
        var modalInstance = $modal.open({
          templateUrl: 'views/wba/financeiro/codigos-lancamento/modal-edit-codigo.html',
          resolve: {
            codigo: function () {
              return cod;
            }
          },
          controller: function ($scope, $modalInstance, codigo) {
            $scope.codigo = codigo;
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
            apiFinanceiro.updateCodigo(item).then(
              function (res) {
                toaster.pop('success','Códigos de Lançamento','Código atualizado com sucesso');
                $scope.getCodigos();
              },
              function (err) {
                toaster.pop('error','Códigos',err.statusText);
              }
            )
          }
        );
      };

    }
  ]);
