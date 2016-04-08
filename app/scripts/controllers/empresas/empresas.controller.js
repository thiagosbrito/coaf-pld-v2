angular.module('wbaApp')
  .controller('EmpresasListarController',[
    '$scope',
    '$state',
    '$stateParams',
    'apiEmpresas',
    'SweetAlert',
    'toaster',
    function ($scope, $state, $stateParams, apiEmpresas, SweetAlert, toaster) {
      
      apiEmpresas.getAll().then(
        function (res) {
          $scope.empresas = res.data;
        },
        function (err) {
          console.log(err);
        }
      )

      $scope.inactive = function (item) {
        SweetAlert.swal({
           title: "Você tem certeza?",
           text: "Se prosseguir essa operação não poderá ser desfeita",
           type: "warning",
           showCancelButton: true,
           confirmButtonColor: "#DD6B55",
           confirmButtonText: "Prosseguir",
           closeOnConfirm: true
        }, 
        function(isConfirm){ 
           if(isConfirm) {
            item.ativo = false;
            apiEmpresas.update(item).then(
              function(res) {
                toaster.pop('success','Empresa','Empresa inativada com sucesso!')
              },
              function (err) {
                toaster.pop('error','Empresa','Desculpe-noe, houve um erro ao processar suas informações, por favor, tente novamente.');
              }
            )
           }
           else {
            return false
           }
        });
      }
      
    }
  ])