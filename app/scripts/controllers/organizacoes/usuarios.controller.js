'use strict';
angular.module('wbaApp')
.controller('OrganizacoesUsuariosController',[
  '$scope',
  '$state',
  '$stateParams',
  'apiOrganizacoes',
  function ($scope, $state, $stateParams, apiOrganizacoes) {

    $scope.organizacaoId = $stateParams.organizacaoId;

    console.log($state, $stateParams);

    // apiOrganizacoes.getOrganizationsUsers($scope.organizacaoId).then(
    //   function (res) {
    //     $scope.users = res.data;
    //   },
    //   function (err) {
    //     console.log(err);
    //   }
    // );

    $scope.users = [
      {
        id: 1,
        usuario: 'thiagobrito',
        nome: 'Thiago Santos de Brito',
        email: 'thiago83brito@hotmail.com'
      },
      {
        id: 2,
        usuario: 'sophiebrito',
        nome: 'Sophie Barbosa Corallo de Brito',
        email: 'sophiebrito@gmail.com'
      }
    ]

  }
])