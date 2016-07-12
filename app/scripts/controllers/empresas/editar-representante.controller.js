angular.module('wbaApp')
  .controller('EditarEmpresaRepresentanteController',[
    '$scope',
    '$state',
    '$stateParams',
    'apiEmpresas',
    'toaster',
    '$modal',
    '$log',
    'SweetAlert',
    function ($scope, $state, $stateParams, apiEmpresas, toaster, $modal, $log, SweetAlert) {
      
      $scope.empresaId = $stateParams.empresaId;
      //  Get all reps for one company
      $scope.getRepresentantes = function () {
        apiEmpresas.getRepresentantes($stateParams.empresaId).then(
          function (res) {
            $scope.representantes = res.data;
          },
          function (err) {
            toaster.pop('error','Representantes',err.statusText);
          }
        );
      };
      $scope.getRepresentantes();

      $scope.getTiposRepresentantes = function () {
        apiEmpresas.getTipoRepresentante().then(
          function (res) {
            $scope.tiposReps = res.data;
          }
        )
      }
      $scope.getTiposRepresentantes();

      $scope.delete = function (rep) {
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
            apiEmpresas.deleteRepresentante($stateParams.empresaId, rep.id).then(
              function (res) {
                toaster.pop('success','Representantes','Representante excluído com sucesso!');
                $scope.getRepresentantes();
              },
              function (err) {
                toaster.pop('error','Representantes',err.statusText)
              }
            )
          }
        });
      }

      $scope.openModal = function (obj, action) {
      
        var modalInstance = $modal.open({
          templateUrl: 'views/wba/empresas/modal-' + action + '-representantes.html',
          resolve: {
            representante: function () {
              return obj
            }
          },
          controller: function ($scope, $modalInstance, representante) { 
            
            $scope.rep = representante;


            $scope.getTiposRepresentantes = function () {
              apiEmpresas.getTipoRepresentante().then(
                function (res) {
                  $scope.tiposReps = res.data;
                  $scope.rep.uuidTipoRepresentante = _.findWhere($scope.tiposReps, {id: parseInt($scope.rep.uuidTipoRepresentante)})
                }
              )
            }
            $scope.getTiposRepresentantes();


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
                  }
                }
                
                
              })
              childModal.result.then(
                function (item) {
                  apiEmpresas.saveTipoRepresentante(item).then(
                    function (res) {
                      toaster.pop('success','Tipo de Representante','Tipo de Representante cadastrado com sucesso!');
                      $scope.getTiposRepresentantes();
                    },
                    function (err) {
                      toaster.pop('error','Tipo de Representante',err.statusText);
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
              var papel = _.findWhere($scope.tiposReps, {id: item.uuidTipoRepresentante});
              item.papel = papel.nome;
              item.uuidTipoRepresentante = item.uuidTipoRepresentante.id;
              apiEmpresas.saveRepresentante($scope.empresaId, item).then(
                function (res) {
                  toaster.pop('success','Representante','Representante cadastrado com sucesso!');
                  $scope.getRepresentantes();
                },
                function (err) {

                }
              )
            }
            if (action === 'edit') {
              var papel = _.findWhere($scope.tiposReps, {id: item.uuidTipoRepresentante});
              item.papel = papel.nome;
              item.uuidTipoRepresentante = item.uuidTipoRepresentante.id;
              apiEmpresas.updateRepresentante($scope.empresaId, item).then(
                function (res) {
                  toaster.pop('success','Representante','Representante atualizado com sucesso!');
                  $scope.getRepresentantes();
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