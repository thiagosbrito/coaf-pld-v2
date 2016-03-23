angular.module('wbaApp')
  .controller('EmpresasListarController',[
    '$scope',
    '$state',
    '$stateParams',
    'apiEmpresas',
    function ($scope, $state, $stateParams, apiEmpresas) {
      
      apiEmpresas.getAll().then(
        function (res) {
          $scope.empresas = res.data;
        },
        function (err) {
          console.log(err);
        }
      )
      
    }
  ])