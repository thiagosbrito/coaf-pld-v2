angular.module('wbaApp')
  .controller('NovaEmpresaEnderecoController',[
    '$scope',
    '$state',
    '$stateParams',
    'apiCep',
    function ($scope, $state, $stateParams, apiCep) {
      $scope.tipoDoc = 'cnpj';

      $scope.showTipo = function (item) {
        console.log(item);
      }

      $scope.enderecos = [
        {
          logradouro: '',
          numero: '',
          complemento: '',
          bairro: '',
          cep: '',
          cidade: '',
          uf: ''
        }
      ]

      $scope.addAddress = function () {
        $scope.enderecos.push({logradouro: '',numero: '',complemento: '',bairro: '',cep: '',cidade: '',uf: ''});
      }
      $scope.consultaCep = function (cep, index) {
        apiCep.consultaCep(cep).then(
          function (res) {
            $scope.address = true;
            $scope.enderecos[index].logradouro  = res.data.logradouro;
            $scope.enderecos[index].bairro      = res.data.bairro;
            $scope.enderecos[index].cidade      = res.data.localidade;
            $scope.enderecos[index].uf          = res.data.uf;
          },
          function (err) {
            console.log(err)
          }
        )
      }
    }
  ])