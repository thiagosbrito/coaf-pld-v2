angular.module('wbaApp')
  .controller('NovaEmpresaRepresentanteController',[
    '$scope',
    '$state',
    '$stateParams',
    'toaster',
    '$log',
    '$modal',
    'apiEmpresas',
    function ($scope, $state, $stateParams, toaster, $log, $modal, apiEmpresas) {
      
      $scope.addRepresentate = function () {
        $scope.representantes.push({id: null,nome: '',cpf: '',email: '',papel: ''})
      };

      $scope.save = function (proceed) {
        apiEmpresas.saveRepresentante($stateParams.empresaId, $scope.representante).then(
          function (res) {
            toaster.pop('success','Representante','Representante cadastrado com sucesso!')
          },
          function (err) {
            toaster.pop('error','Representante','Desculpe-nos, houve um erro ao processar suas informações, por favor, tente novamente.');
          }
        )
      }

      $scope.representantes = [
        {
          id: null,
          nome: '',
          cpf: '',
          email: '',
          papel: ''
        }
      ];

      apiEmpresas.getTipoRepresentante().then(
        function (res) {
          $scope.tiposReps = res.data;
        },
        function (err) {
          console.log(err);
        }
      )

      $scope.openModal = function () {
      
        var modalInstance = $modal.open({
          templateUrl: 'views/wba/empresas/modal-tipo-representantes.html',
          controller: function ($scope, $modalInstance) {
            
            $scope.close = function () {
              $modalInstance.close();
            }

            $scope.salvar = function (item) {
              $modalInstance.close(item);
            }
          },
        });

        modalInstance.result.then(
          function (item) {
            console.log(item);
            // $scope.grupos.push(item);
            apiEmpresas.saveTipoRepresentante(item).then(
              function (res) {
                toaster.pop('success','Tipo de Representante','Item cadastrado com sucesso')
              },
              function (err) {
                toaster.pop('error','Tipo de Representante',err.statusText)
              }
            );
          },
          function () {
            $log.info('Modal dismissed at: ' + new Date());
          }
        );
      }
      
    }
  ])