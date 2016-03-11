'use strict';
angular.module('wbaApp')
.controller('OrganizacoesUsuariosGruposController',[
  '$scope',
  '$state',
  '$stateParams',
  'apiOrganizacoes',
  function ($scope, $state, $stateParams, apiOrganizacoes) {

    // console.log('Groups - User');
    $scope.organizacaoId  = $stateParams.organizacaoId;
    $scope.usuarioId      = $stateParams.usuarioId;

    // apiOrganizacoes.getOrganizationsUsers(organizacaoId).then(
    //   function (res) {
    //     $scope.user = res.data;
    //   },
    //   function (err) {
    //     console.log(err);
    //   }
    // );

  }
])