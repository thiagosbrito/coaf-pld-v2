'use strict';
angular.module('wbaApp')
.controller('OrganizacoesUsuariosNovoController',[
  '$scope',
  '$state',
  '$stateParams',
  'apiOrganizacoes',
  function ($scope, $state, $stateParams, apiOrganizacoes) {

    
    // var organizacaoId = $stateParams.organizacaoId;

    // apiOrganizacoes.saveOrganizationsUsers($scope.user).then(
    //   function (res) {
    //     $scope.user = res.data;
    //   },
    //   function (err) {
    //     console.log(err);
    //   }
    // );

  }
])