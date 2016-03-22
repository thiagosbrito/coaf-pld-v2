angular.module('wbaApp')
  .controller('NovaEmpresaRepresentanteController',[
    '$scope',
    '$state',
    '$stateParams',
    function ($scope, $state, $stateParams) {
      
      $scope.addRepresentate = function () {
        $scope.representantes.push({id: null,nome: '',cpf: '',email: '',papel: ''})
      };

      $scope.representantes = [
        {
          id: null,
          nome: '',
          cpf: '',
          email: '',
          papel: ''
        }
      ];
      
    }
  ])