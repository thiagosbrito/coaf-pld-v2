'use strict';
angular.module('wbaApp')
  .controller('CadastroCriterioListarController',[
    '$scope',
    '$state',
    '$stateParams',
    'apiCadastro',
    '$modal',
    'toaster',
    'SweetAlert',
    function ($scope, $state, $stateParams, apiCadastro, $modal, toaster, SweetAlert) {

      $scope.getRiskCriteria = function () {
        apiCadastro.getRiskCriteria().then(
          function (res) {
            $scope.riskCriteria = res.data;
          },
          function (err) {
            toaster.pop('error','Usuários',err.statusText);
          }
        )
      };

      $scope.getRiskCriteria();


      $scope.novo = function () {
        var modalInstance = $modal.open({

          templateUrl: 'views/coaf-pld/cadastros/criterio/modal-novo.html',
          size: 'lg',
          controller: function ($modalInstance, $scope, apiCep) {
            $scope.riskCriteria = {};

            $scope.policies = [
              'CUSTOMER_ANALYSIS',
              'OPERATION_ANALYSIS'
            ];
            $scope.save = function (item) {
              $modalInstance.close(item)
            }

            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            }
          }
        });

        modalInstance.result.then(
          function (item) {
            
            apiCadastro.addRiskCriteria(item).then(
              function (res) {
                toaster.pop('success','Cadastro Critério de Risco','Cadastro realizado com sucesso');
                $scope.getRiskCriteria();
              },
              function (err) {
                toaster.pop('error','Cadastro Critério de Risco',err.statusText);
              }
            )
          }, 
          function () {
            return false
          }
        );
      }

      $scope.editar = function (id) {
        var modalInstance = $modal.open({

          templateUrl: 'views/coaf-pld/cadastros/criterio/modal-editar.html',
          size: 'lg',
          controller: function ($modalInstance, $scope, riskCriteria) {
            $scope.riskCriteria = riskCriteria;

            $scope.policies = [
              'CUSTOMER_ANALYSIS',
              'OPERATION_ANALYSIS'
            ];
            $scope.save = function (item) {
              $modalInstance.close(item)
            }

            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            }
          },
          resolve: {
            riskCriteria:  function () {
              return apiCadastro.getRiskCriteriaById(id).then(
                function (rc) {
                  return rc.data;
                }
              )
            }
          }
        });

        modalInstance.result.then(
          function (item) {
            
            apiCadastro.updateRiskCriteria(item).then(
              function (res) {
                toaster.pop('success','Cadastro Critério de Risco','Cadastro atualizado com sucesso');
                $scope.getRiskCriteria();
              },
              function (err) {
                toaster.pop('error','Cadastro Critério de Risco',err.statusText);
              }
            )
          }, 
          function () {
            return false
          }
        );
      }

      $scope.delete = function (id) {
        SweetAlert.swal({
          title: "Você tem certeza?",
          text: "Se você prosseguir, essa operaçao no poderá ser desfeita",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Prosseguir",
          cancelButtonText: "Cancelar",
          closeOnConfirm: false,
          closeOnCancel: false },
        function(isConfirm){
          if (isConfirm) {
            apiCadastro.deleteRiskCriteria(id).then(
              function (res) {
                SweetAlert.swal("Excluído!", "Seu registro foi excluído com sucesso", "success");
                $scope.getCedentes();
              },
              function (err) {
                toaster.pop('error','Critério de Risco',err.status + ": " + err.message);
              }
            )
          } else {
            SweetAlert.swal("Cancelado", "Seu item permanece intacto", "error");
          }
        });
      }


    }
  ]);