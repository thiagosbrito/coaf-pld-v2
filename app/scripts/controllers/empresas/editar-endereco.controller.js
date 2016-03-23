angular.module('wbaApp')
  .controller('EditarEmpresaEnderecoController',[
    '$scope',
    '$state',
    '$stateParams',
    'apiEmpresas',
    function ($scope, $state, $stateParams, apiEmpresas) {
      
      apiEmpresas.getAddress($stateParams.empresaId).then(
        function (res) {
          $scope.enderecos = res.data
        },
        function (err) {
          console.log(err);
        }
      ) 
    }
  ])