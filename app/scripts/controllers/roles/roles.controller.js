angular.module('wbaApp')
  .controller('RolesListarController',[
    '$scope',
    '$modal',
    function ($scope, $modal) {


      $scope.roles = [
        {
          id: 1,
          nome: 'Administrador'
        },
        {
          id: 2,
          nome: 'Usuário'
        }
      ];

      $scope.openModal = function () {
        var modalInstance = $modal.open({
          templateUrl: 'views/wba/roles/modal-novo-roles.html',
          controller: function ($scope, $modalInstance) {
            $scope.close = function () {
              $modalInstance.close();
            }
            $scope.salvar = function (item) {
              $modalInstance.close(item);
            }
          },
        });

        modalInstance.result.then(function (item) {
          $scope.roles.push({id: $scope.roles.length+1, nome: item.nome});
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      }


    }

  ])