angular.module('wbaApp')
  .controller('GruposListarController',[
    '$scope',
    '$modal',
    function ($scope, $modal) {


      $scope.grupos = [
        {
          id: 1,
          nome: 'Teste 1'
        },
        {
          id: 2,
          nome: 'Teste 2'
        },
        {
          id: 3,
          nome: 'Teste 3'
        },
        {
          id: 4,
          nome: 'Teste 4'
        },
        {
          id: 5,
          nome: 'Teste 5'
        }
      ];
      $scope.$on('newGroup', function (group) {
        console.log(group);
      })

      $scope.openModal = function () {
        var modalInstance = $modal.open({
          templateUrl: 'views/wba/grupos/modal-novo.html',
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
          $scope.grupos.push({id: $scope.grupos.length+1, nome: item.nome});
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      }


    }

  ])