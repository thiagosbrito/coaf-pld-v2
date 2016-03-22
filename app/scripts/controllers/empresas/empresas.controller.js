angular.module('wbaApp')
  .controller('EmpresasListarController',[
    '$scope',
    '$state',
    '$stateParams',
    'apiEmpresas',
    function ($scope, $state, $stateParams, apiEmpresas) {
      
      apiEmpresas.getAll().then(
        function (res) {
          console.log(res);
        },
        function (err) {
          console.log(err);
        }
      )
      
    }
  ])