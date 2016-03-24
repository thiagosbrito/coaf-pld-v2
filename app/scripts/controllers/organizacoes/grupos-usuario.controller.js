'use strict';
angular.module('wbaApp')
.controller('OrganizacoesUsuariosGruposController',[
  '$scope',
  '$state',
  '$stateParams',
  'apiOrganizacoes',
  '$modal',
  function ($scope, $state, $stateParams, apiOrganizacoes, $modal) {

    // console.log('Groups - User');
    $scope.organizacaoId  = $stateParams.organizacaoId;
    $scope.usuarioId      = $stateParams.usuarioId;

    $scope.grupos = [
      {
        id: 1,
        nome: 'Grupo 1'
      },
      {
        id: 2,
        nome: 'Grupo 2'
      },
      {
        id: 3,
        nome: 'Grupo 3'
      }
    ]


    $scope.openModal = function () {
      
      var modalInstance = $modal.open({
        templateUrl: 'views/wba/organizacoes/modal-grupos-novo.html',
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
          $scope.grupos.push(item);
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