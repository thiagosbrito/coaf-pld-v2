angular.module('wbaApp')
  .controller('EditarEmpresaContatoController',[
    '$scope',
    '$state',
    '$stateParams',
    'apiEmpresas',
    'toaster',
    '$modal',
    'SweetAlert',
    '$log',
    function ($scope, $state, $stateParams, apiEmpresas, toaster, $modal, SweetAlert, $log) {
      
      $scope.getContatos = function () {
        apiEmpresas.getContacts($stateParams.empresaId).then(
          function (res) {
            $scope.contatos = res.data;
          },
          function (err) {
            console.log(err)
          }
        )
      }
      $scope.getContatos();


      $scope.delete = function (id) {
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
          if (isConfirm) {
            apiEmpresas.deleteContacts($stateParams.empresaId, id).then(
              function (res) {
                toaster.pop('success','Contatos','Contato excluído com sucesso!');
                $scope.getContatos();
              },
              function (err) {
                toaster.pop('error','Contatos','Desculpe, algum erro ocorreu, favor, verifique as informações e tente novamente!')
              }
            )
          }
        });
      }

      $scope.openModal = function (action, id) {
      
        var modalInstance = $modal.open({
          templateUrl: 'views/wba/empresas/modal-' + action + '-contatos.html',
          controller: function ($scope, $modalInstance) {

            if(id) {
              apiEmpresas.getContactsById($stateParams.empresaId, id).then(
                function (res) {
                  $scope.contato = res.data
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
            if (action === 'new') {
              apiEmpresas.saveContacts($scope.empresaId, item).then(
                function (res) {
                  toaster.pop('success','Contato','Contato cadastrado com sucesso!')
                  $scope.getContatos();
                },
                function (err) {

                }
              )
            }
            if (action === 'edit') {
              apiEmpresas.updateContacts($scope.empresaId, item).then(
                function (res) {
                  toaster.pop('success','Contato','Contato atualizado com sucesso!')
                  $scope.getContatos();
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
    }
  ])