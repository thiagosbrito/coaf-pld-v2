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
        apiEmpresas.save(data).then(
          function (res) {
            toaster.pop('success','Empresas','Cadastro de empresa realizado com sucesso!!')
            if (proceed) {
              $state.go('wba.empresas.novo.endereco',{empresaId: res.data.id});
            }
          },
          function (err) {
            toaster.pop('error','Empresas','Ops, bad server, no cookies for ya! :(')
          }
        )
      }
      // end of salvar

      
    }
  ])