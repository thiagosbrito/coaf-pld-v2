angular.module('wbaApp')
  .controller('EditarEmpresaRepresentanteController',[
    '$scope',
    '$state',
    '$stateParams',
    'apiEmpresas',
    'toaster',
    '$modal',
    '$log',
    function ($scope, $state, $stateParams, apiEmpresas, toaster, $modal, $log) {
      
      $scope.empresaId = $stateParams.empresaId;
      //  Get all reps for one company
      apiEmpresas.getRepresentantes($stateParams.empresaId).then(
        function (res) {
          $scope.representantes = res.data;
        },
        function (err) {
          toaster.pop('error','Representantes',err.statustext);
        }
      );

      $scope.getTiposRepresentantes = function () {
        apiEmpresas.getTipoRepresentante().then(
          function (res) {
            $scope.tiposReps = res.data;
          }
        )
      }
      $scope.getTiposRepresentantes();

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

      $scope.openModal = function (action) {
      
        var modalInstance = $modal.open({
          templateUrl: 'views/wba/empresas/modal-' + action + '-representantes.html',
          controller: function ($scope, $modalInstance) { 
            

            $scope.getTiposRepresentantes = function () {
              apiEmpresas.getTipoRepresentante().then(
                function (res) {
                  $scope.tiposReps = res.data;
                }
              )
            }
            $scope.getTiposRepresentantes()


            $scope.close = function () {
              $modalInstance.dismiss('cancel');
            }

            $scope.salvar = function (item) {
              $modalInstance.close(item);
            }

            // Modal para cadastro de tipo de representante
            $scope.openModal = function () {
              var childModal = $modal.open({
                templateUrl: 'views/wba/empresas/modal-tipo-representantes.html',
                controller: function ($scope, $modalInstance) {
                  $scope.cancel = $modalInstance.dismiss('cancel');
                  $scope.salvar =  function (item) {
                    $modalInstance.close(item);
                    $scope.getTiposRepresentantes();
                  }
                }
                
                
              })
              childModal.result.then(
                function (item) {
                  apiEmpresas.saveTipoRepresentante(item).then(
                    function (res) {
                      toaster.pop('success','Tipo de Representante','Tipo de Representante cadastrado com sucesso!')
                    },
                    function (err) {
                      toaster.pop('error','Tipo de Representante','Desculpe, algum erro ocorreu, favor, verifique as informações e tente novamente!')
                    }
                  )
                }
              )
            }
          },
        });

        // modal para cadastro de representante
        modalInstance.result.then(
          function (item) {
            if (action === 'new') {
              apiEmpresas.saveRepresentante($scope.empresaId, item).then(
                function (res) {
                  toaster.pop('success','Representante','Representante cadastrado com sucesso!')
                },
                function (err) {

                }
              )
            }
            if (action === 'edit') {
              apiEmpresas.updateRepresentante($scope.empresaId, item).then(
                function (res) {
                  toaster.pop('success','Representante','Representante atualizado com sucesso!')
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