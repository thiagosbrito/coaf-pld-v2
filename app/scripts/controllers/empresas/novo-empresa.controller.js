angular.module('wbaApp')
  .controller('NovaEmpresaController',[
    '$scope',
    '$state',
    '$stateParams',
    'apiEmpresas',
    'toaster',
    function ($scope, $state, $stateParams, apiEmpresas, toaster) {
      $scope.tipoDoc = 'cnpj';

      $scope.salvar = function (data, proceed) {
        $scope.dados = data;

        apiEmpresas.save(data).
          success( function (data, status, headers, config) {
            toaster.pop('success','Empresa','Empresa cadastrada com sucesso');
            if(proceed) {
              apiEmpresas.getAll().then(
                function (res) {
                  $scope.listToFilter = res.data;
                  $scope.item = _.findWhere($scope.listToFilter, {numeroInscricao: $scope.dados.numeroInscricao});
                  $state.go('wba.empresas.novo.endereco',{empresaId: $scope.item.id});
                }
              )
            }
          })
          .error( function (data, status, headers, config) {
            if(status == 409) {
              toaster.pop('error','Empresa','Essa empresa já se encontra cadastrada em nosso sistema');
            }
          })
        // end of request
      } // end of method
    }
  ])