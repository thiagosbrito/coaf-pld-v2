'use strict';
angular.module('wbaApp')
.controller('OrganizacoesUsuariosController',[
  '$scope',
  '$state',
  '$stateParams',
  'apiOrganizacoes',
  '$modal',
  function ($scope, $state, $stateParams, apiOrganizacoes, $modal) {

    $scope.organizacaoId = $stateParams.organizacaoId;

    console.log($state, $stateParams);

    // $scope.getUsers = function () {
    //   apiOrganizacoes.getOrganizationsUsers($scope.organizacaoId).then(
    //     function (res) {
    //       $scope.users = res.data;
    //     },
    //     function (err) {
    //       console.log(err);
    //     }
    //   );
    // }
    // $scope.getUsers();

    $scope.openModal = function () {
      
      var modalInstance = $modal.open({
        templateUrl: 'views/wba/organizacoes/modal-usuarios-novo.html',
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
          $scope.users.push(item);
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
    var organizacaoId = $stateParams.organizacaoId;


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