'use strict';

angular.module('wbaApp')

  .controller('TarifasListarController',[
    '$scope',
    '$state',
    '$stateParams',
    'apiOperacoes',
    'toaster',
    '$modal',
    'SweetAlert',
    '$log',
    function ($scope, $state, $stateParams, apiOperacoes, toaster, $modal, SweetAlert, $log) {

      $scope.getTipos = function () {
        apiOperacoes.getTipoLancamentos().then(
          function (res) {
            $scope.tipos = res.data
          },
          function (err) {
            toaster.pop('error','Tipos de Lançamentos',err.statusText)
          }
        )
      }();

      $scope.getTarifas = function () {
        apiOperacoes.getTarifas().then(
          function (res) {
            $scope.tarifas = res.data;
            angular.forEach($scope.tarifas, function (value){
              if(value.uuidTipoLancamento) {
                value.uuidTipoLancamento = _.findWhere($scope.tipos,{uuid: value.uuidTipoLancamento})
              }
            });
          },
          function (err) {
            toaster.pop('error','Tarifas',err.statusText);
          }
        )
      }
      $scope.getTarifas();

      $scope.openModalTarifa = function (action, id) {

        var modalInstance = $modal.open({
          templateUrl: 'views/wba/operacoes/tarifas/modal-' + action + '.html',
          controller: function ($scope, $modalInstance, apiOperacoes) {

            apiOperacoes.getTipoLancamentos().then(
              function (res) {
                $scope.tipos = res.data;
              },
              function (err) {
                toaster.pop('error','Tipos de Lançamentos',err.statusText)
              }
            );

            if(action == 'edit') {
              apiOperacoes.getTarifaById(id).then(
                function (res) {
                  $scope.tarifa = res.data
                  $scope.tarifa.uuidTipoLancamento = _.findWhere($scope.tipos,{uuid: $scope.tarifa.uuidTipoLancamento});
                }
              )
            }

            $scope.close = function () {
              $modalInstance.dismiss('cancel');
            }

            $scope.salvar = function (item) {
              $modalInstance.close(item);
            }
          },
        });

        // modal para cadastro de representante
        modalInstance.result.then(
          function (item) {
            if(item.uuidTipoLancamento) {
              item.uuidTipoLancamento = item.uuidTipoLancamento.uuid;
            };
            if(id) {
              apiOperacoes.updateTarifa(item).then(
                function (res) {
                  toaster.pop('success','Tarifa','Tarifa atualizada com sucesso!');
                  $scope.getTarifas();
                },
                function (err) {
                  toaster.pop('error','Tarifas',err.statusText)
                }
              )
            }
            else {
              apiOperacoes.saveTarifa(item).then(
                function (res) {
                  toaster.pop('success','Tarifa','Tarifa cadastrada com sucesso!');
                  $scope.getTarifas();
                },
                function (err) {
                  toaster.pop('error','Tarifas',err.statusText)
                }
              )
            }
          },
          function () {
            $log.info('Modal dismissed at: ' + new Date());
          }
        );
      }

      $scope.delete = function (item) {

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
            apiOperacoes.deleteTarifa(item).then(
              function(res) {
                toaster.pop('success','Tarifa','Tarifa excluída com sucesso!');
                $scope.getTarifas();
              },
              function (err) {
                toaster.pop('error','Tarifa','Desculpe-noe, houve um erro ao processar suas informações, por favor, tente novamente.');
              }
            )
           }
           else {
            return false
           }
        });

      }
    }

  ])
