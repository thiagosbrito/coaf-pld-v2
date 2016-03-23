angular.module('wbaApp')
  .controller('EditarEmpresaRepresentanteController',[
    '$scope',
    '$state',
    '$stateParams',
    'apiEmpresas',
    'toaster',
    function ($scope, $state, $stateParams, apiEmpresas, toaster) {
      
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


    }
  ])