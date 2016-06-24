angular.module('wbaApp')
  .controller('NovaEmpresaController',[
    '$scope',
    '$state',
    '$stateParams',
    'apiEmpresas',
    'toaster',
    function ($scope, $state, $stateParams, apiEmpresas, toaster) {
      $scope.tipoDoc = 'cnpj';
      $scope.empresa = {};
      $scope.empresa.inscricaoEstadual  = null;
      $scope.empresa.numeroInscricao    = null;

      $scope.salvar = function (data, proceed) {
        $scope.dados = data;
        if (data.cpf) {
          data.numeroInscricao = data.cpf;
          data = _.omit(data,'cpf');
        }
        if (data.cnpj) {
          data.numeroInscricao = data.cnpj;
          data = _.omit(data,'cnpj');
        }
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
            else {
              toaster.pop('error','Empresa',err.statusText); 
            }
          })
        // end of request
      } // end of method
    }
  ])