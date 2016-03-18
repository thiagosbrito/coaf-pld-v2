'use strict';
angular.module('wbaApp')
.controller('OrganizacoesUsuariosRolesController',[
  '$scope',
  '$state',
  '$stateParams',
  'apiOrganizacoes',
  '$modal',
  '$log',
  function ($scope, $state, $stateParams, apiOrganizacoes, $modal, $log) {

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
    $scope.roles = [
      {
        id: 1,
        nome: 'Adminstrador'
      },
      {
        id: 2,
        nome: 'Gestor'
      },
      {
        id: 3,
        nome: 'Usuário'
      }
    ]

    $scope.openModal = function () {
      
      var modalInstance = $modal.open({
        templateUrl: 'views/wba/organizacoes/modal-roles-novo.html',
        controller: function ($scope, $modalInstance) {
          $scope.close = function () {
            $modalInstance.close();
          }
          $scope.salvar = function (item) {
            $modalInstance.close(item);
          }
        },
      });

      modalInstance.result.then(
        function (item) {
          console.log(item);
          $scope.roles.push(item);
          // apiOrganizacoes.saveOrganizationsUsers(item).then(
          //   function (res) {
          //     $scope.user = res.data;
          //   },
          //   function (err) {
          //     console.log(err);
          //   }
          // );
        },
        function () {
          $log.info('Modal dismissed at: ' + new Date());
        }
      );
    }

  }
])