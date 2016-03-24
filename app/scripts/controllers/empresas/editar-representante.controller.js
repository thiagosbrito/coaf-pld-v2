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
            // $scope.grupos.push(item);
            // apiEmpresas.saveTipoRepresentante(item).then(
            //   function (res) {
            //     toaster.pop('success','Tipo de Representante','Item cadastrado com sucesso')
            //   },
            //   function (err) {
            //     toaster.pop('error','Tipo de Representante',err.statusText)
            //   }
            // );
          },
          function () {
            $log.info('Modal dismissed at: ' + new Date());
          }
        );
      }


    }
  ])