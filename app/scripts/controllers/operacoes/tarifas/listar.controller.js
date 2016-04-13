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

      $scope.getTarifas = function () {
        apiOperacoes.getTarifas().then(
          function (res) {
            $scope.tarifas = res.data;
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
          controller: function ($scope, $modalInstance) {

            if(action == 'edit') {
              apiOperacoes.getTarifaById(id).then(
                function (res) {
                  $scope.tarifa = res.data
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
            if(id) {
              apiOperacoes.saveTarifa(item).then(
                function (res) {
                  toaster.pop('success','Tarifa','Tarifa atualizada com sucesso!')
                  $scope.getTarifas();
                },
                function (err) {

                }
              )
            }
            else {
              apiOperacoes.saveTarifa(item).then(
                function (res) {
                  toaster.pop('success','Tarifa','Tarifa cadastrada com sucesso!')
                  $scope.getTarifas();
                },
                function (err) {

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