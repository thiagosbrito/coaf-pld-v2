angular.module('wbaApp')
  .controller('NovaEmpresaController',[
    '$scope',
    '$state',
    '$stateParams',
    'apiCep',
    function ($scope, $state, $stateParams, apiCep) {
      $scope.tipoDoc = 'cnpj';
    }
  ])