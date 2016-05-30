'use strict';

angular.module('wbaApp')
  .controller('TiposLancamentoListarController',[
    '$scope',
    '$state',
    '$stateParams',
    'toaster',
    'SweetAlert',
    '$modal',
    'apiOperacoes',
    function ($scope, $state, $stateParams, toaster, SweetAlert, $modal, apiOperacoes) {

      $scope.getTipos = function () {
        apiOperacoes.getTipoLancamentos().then(
          function (res) {
            $scope.tipos = res.data
          },
          function (err) {
            toaster.pop('error','Tipos de Lançamentos',err.statusText);
          }
        )
      };
      $scope.getTipos();

      $scope.addTipo = function () {
        var modalInstance = $modal.open({
          templateUrl: 'views/wba/operacoes/tipo-lancamentos/modal-add-tipo.html',
          controller: function ($scope, $modalInstance) {
            $scope.close = function () {
              $modalInstance.dismiss('cancel');
            };
            $scope.save = function (item) {
              $modalInstance.close(item);
            }
          }
        });
        modalInstance.result.then(
          function (item) {
            apiOperacoes.addTipoLancamento(item).then(
              function (res) {
                toaster.pop('success','Tipos de Lançamentos','Seu item foi cadastrado com sucesso');
                $scope.getTipos();
              },
              function (err) {
                toaster.pop('error','Tipos de Lançamentos',err.statusText);
              }
            )
          }
        );
      }

      $scope.editTipo = function (item) {
        var modalInstance = $modal.open({
          templateUrl: 'views/wba/operacoes/tipo-lancamentos/modal-edit-tipo.html',
          resolve: {
            tipo: function () {
              return item
            }
          },
          controller: function ($scope, $modalInstance, tipo) {
            $scope.tipo = tipo;

            $scope.close = function () {
              $modalInstance.dismiss('cancel');
            };
            $scope.update = function (item) {
              $modalInstance.close(item);
            }
          }
        });
        modalInstance.result.then(
          function (item) {
            apiOperacoes.updateTipoLancamento(item).then(
              function (res) {
                toaster.pop('success','Tipos de Lançamentos','Seu item foi atualizado com sucesso');
                $scope.getTipos();
              },
              function (err) {
                toaster.pop('error','Tipos de Lançamentos',err.statusText);
              }
            )
          }
        );
      };

      $scope.deleteTipo = function (item) {

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
            if(isConfirm) {
              apiOperacoes.deleteTipoLancamento(item).then(
                function(res) {
                  toaster.pop('success','Tipo Lançamento','Tipo de Lançamento excluído com sucesso!');
                  $scope.getTipos();
                },
                function (err) {
                  toaster.pop('error','Tipo ançamento','Desculpe-noe, houve um erro ao processar suas informações, por favor, tente novamente.');
                }
              )
            }
            else {
              return false
            }
          });

      }
    }
  ]);
