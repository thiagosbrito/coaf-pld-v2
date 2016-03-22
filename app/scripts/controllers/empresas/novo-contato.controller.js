angular.module('wbaApp')
  .controller('NovaEmpresaContatoController',[
    '$scope',
    '$state',
    '$stateParams',
    function ($scope, $state, $stateParams) {

      $scope.addContato = function () {
        $scope.contatos.push({id: null,departamento: '',email: '',telefone: '',fax: ''})
      };
      
      $scope.contatos = [
        {
          id: null,
          departamento: '',
          email: '',
          telefone: '',
          fax: ''
        }
      ]
    }
  ])