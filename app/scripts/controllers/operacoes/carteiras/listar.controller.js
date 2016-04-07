'use strict';

angular.module('wbaApp')

  .controller('CarteirasListarController',[
    '$scope',
    '$state',
    '$stateParams',
    'apiOperacoes',
    'toaster',
    '$modal',
    'SweetAlert',
    function ($scope, $state, $stateParams, apiOperacoes, toaster, $modal, SweetAlert) {

      $scope.getCarteiras = function () {
        apiOperacoes.getCarteiras().then(
          function (res) {
            $scope.carteiras = res.data;
          },
          function (err) {
            toaster.pop('error','Carteiras',err.statusText);
          }
        )
      }
      $scope.getCarteiras();

      $scope.openModalCarteira = function (action, id) {
      
        var modalInstance = $modal.open({
          templateUrl: 'views/wba/operacoes/carteiras/modal-' + action + '.html',
          controller: function ($scope, $modalInstance) {

            if(action == 'edit') {
              apiOperacoes.getCarteiraById(id).then(
                function (res) {
                  $scope.carteira = res.data
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
              apiOperacoes.saveCarteira(item).then(
                function (res) {
                  toaster.pop('success','Carteira','Carteira atualizada com sucesso!')
                  $scope.getCarteiras();
                },
                function (err) {

                }
              )
            }
            else {
              apiOperacoes.saveCarteira(item).then(
                function (res) {
                  toaster.pop('success','Carteira','Carteira cadastrada com sucesso!')
                  $scope.getCarteiras();
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
            apiOperacoes.deleteCarteira(item).then(
              function(res) {
                toaster.pop('success','Carteira','Carteira excluída com sucesso!');
                $scope.getCarteiras();
              },
              function (err) {
                toaster.pop('error','Carteira','Desculpe-noe, houve um erro ao processar suas informações, por favor, tente novamente.');
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