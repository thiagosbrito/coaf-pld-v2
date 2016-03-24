angular.module('wbaApp')
  .controller('EditarEmpresaContatoController',[
    '$scope',
    '$state',
    '$stateParams',
    'apiEmpresas',
    'toaster',
    function ($scope, $state, $stateParams, apiEmpresas, toaster) {
      $scope.getContatos = function () {
        apiEmpresas.getContacts($stateParams.empresaId).then(
          function (res) {
            $scope.contatos = res.data;
          },
          function (err) {
            console.log(err)
          }
        )
      }
      $scope.getContatos(); 

      $scope.delete = function () {
        SweetAlert.swal({
           title: "Você tem certeza?",
           text: "Se prosseguir essa operação não poderá ser desfeita",
           type: "warning",
           showCancelButton: true,
           confirmButtonColor: "#DD6B55",
           confirmButtonText: "Prosseguir",
           closeOnConfirm: true
        }, 
        function(){ 
           SweetAlert.swal("Booyah!");
        });
      }
    }
  ])