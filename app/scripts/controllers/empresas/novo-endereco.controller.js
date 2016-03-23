angular.module('wbaApp')
  .controller('NovaEmpresaEnderecoController',[
    '$scope',
    '$state',
    '$stateParams',
    'apiCep',
    'apiEmpresas',
    'toaster',
    function ($scope, $state, $stateParams, apiCep, apiEmpresas, toaster) {
      $scope.tipoDoc = 'cnpj';

      $scope.showTipo = function (item) {
        console.log(item);
      }

      $scope.endereco = {logradouro: '',numero: '',complemento: '',bairro: '',cep: '',cidade: '',uf: ''};


      $scope.save = function () {
        apiEmpresas.saveAddress($stateParams.empresaId, $scope.endereco).then(
          function (res) {
            toaster.pop('success','Endereço','Item cadastrado');
            $scope.endereco = {};
          },
          function (err) {
            toaster.pop('error','Endereço','Ops')
          }
        )
      }

      $scope.addAddress = function () {
        $scope.enderecos.push({logradouro: '',numero: '',complemento: '',bairro: '',cep: '',cidade: '',uf: ''});
      }
      $scope.consultaCep = function (cep, index) {
        apiCep.consultaCep(cep).then(
          function (res) {
            $scope.address = true;
            $scope.endereco.logradouro  = res.data.logradouro;
            $scope.endereco.bairro      = res.data.bairro;
            $scope.endereco.cidade      = res.data.localidade;
            $scope.endereco.uf          = res.data.uf;
          },
          function (err) {
            console.log(err)
          }
        )
      }
    }
  ])