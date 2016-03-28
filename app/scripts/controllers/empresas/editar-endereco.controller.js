angular.module('wbaApp')
  .controller('EditarEmpresaEnderecoController',[
    '$scope',
    '$state',
    '$stateParams',
    'apiEmpresas',
    '$modal',
    '$log',
    'toaster',
    'SweetAlert',
    function ($scope, $state, $stateParams, apiEmpresas, $modal, $log, toaster, SweetAlert) {
      
      $scope.getAddresses = function () {
        apiEmpresas.getAddress($stateParams.empresaId).then(
          function (res) {
            $scope.enderecos = res.data
          },
          function (err) {
            console.log(err);
          }
        ) 
      }
      $scope.getAddresses();

      $scope.delete = function () {
        SweetAlert.swal({
           title: "Você tem certeza?",
           text: "Se prosseguir essa operação não poderá ser desfeita",
           type: "warning",
           showCancelButton: true,
           confirmButtonColor: "#DD6B55",
           confirmButtonText: "Prosseguir",
           closeOnConfirm: true
        }, 
        function(){ 
           SweetAlert.swal("Booyah!");
        });
      }

      $scope.openModal = function (action, id) {
      
        var modalInstance = $modal.open({
          templateUrl: 'views/wba/empresas/modal-' + action + '-endereco.html',
          controller: function ($scope, $modalInstance, apiEmpresas, apiCep, $stateParams, toaster) {
            if (action === 'new') {
              $scope.endereco = {logradouro: '',numero: '',complemento: '',bairro: '',cep: '',cidade: '',uf: ''};
            }
            if(id) {
              apiEmpresas.getAddressById($stateParams.empresaId, id).then(
                function (res) {
                  $scope.endereco = res.data
                }
              )
            }
            $scope.consultaCep = function (cep, index) {
              apiCep.consultaCep(cep).then(
                function (res) {
                  $scope.address = true;
                  $scope.endereco.logradouro  = res.data.logradouro;
                  $scope.endereco.bairro      = res.data.bairro;
                  $scope.endereco.cidade      = res.data.localidade;
                  $scope.endereco.uf          = res.data.uf;
                },
                function (err) {
                  console.log(err)
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

        modalInstance.result.then(
          function (item) {
            if(action === 'new') {
              apiEmpresas.saveAddress($stateParams.empresaId, item).then(
                function (res) {
                  toaster.pop('success','Endereço','Endereço cadastrado com sucesso!');
                  $scope.endereco = {};
                  $scope.getAddresses();
                },
                function (err) {
                  toaster.pop('error','Endereço','Ops')
                }
              )
            }
            if(action === 'edit') {
              apiEmpresas.updateAddress($stateParams.empresaId, item).then(
                function (res) {
                  toaster.pop('success','Endereço','Endereço atualizado com sucesso!');
                  $scope.endereco = {};
                  $scope.getAddresses();
                },
                function (err) {
                  toaster.pop('error','Endereço','Ops')
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