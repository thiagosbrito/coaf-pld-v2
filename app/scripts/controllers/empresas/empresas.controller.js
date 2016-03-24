angular.module('wbaApp')
  .controller('EmpresasListarController',[
    '$scope',
    '$state',
    '$stateParams',
    'apiEmpresas',
    'SweetAlert',
    function ($scope, $state, $stateParams, apiEmpresas, SweetAlert) {
      
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