angular.module('wbaApp')
  .controller('EditarEmpresaController',[
    '$scope',
    '$state',
    '$stateParams',
    'empresa',
    'apiEmpresas',
    'toaster',
    function ($scope, $state, $stateParams, empresa, apiEmpresas, toaster) {
      
      $scope.empresa = empresa;

      if($scope.empresa.numeroInscricao) {
        if($scope.empresa.numeroInscricao.length < 14) {
          $scope.tipoDoc = 'cpf'
        }
        else {
          $scope.tipoDoc = 'cnpj'
        }
      }

      $scope.update = function (data, proceed) {
        apiEmpresas.save(data).then(
          function (res) {
            toaster.pop('success','Empresas','Cadastro de empresa atualizado com sucesso!!')
            if (proceed) {
              $state.go('wba.empresas.editar.endereco',{empresaId: $stateParams.empresaId});
            }
          },
          function (err) {
            toaster.pop('error','Empresas',err.statusText);
          }
        )
      }

    }
  ])


