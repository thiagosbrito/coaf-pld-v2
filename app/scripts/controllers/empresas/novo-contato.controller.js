angular.module('wbaApp')
  .controller('NovaEmpresaContatoController',[
    '$scope',
    '$state',
    '$stateParams',
    'toaster',
    'apiEmpresa',
    function ($scope, $state, $stateParams, toaster, apiEmpresa) {

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

      $scope.save = function (item) {
        apiEmpresa.saveContacts($stateParams.empresaId, item).then(
          function (res) {
            toaster.pop('success','Contato','Contato cadastrado com sucesso!')
          },
          function (err) {
            toaster.pop('error','Contato','Desculpe-nos, houve um erro ao processar suas informações, por favor, tente novamente.')
          }
        )
      }
    }
  ])