angular.module('wbaApp')
  .controller('ModulosPermissoesListarController',[
    '$scope',
    '$modal',
    '$state',
    '$stateParams',
    '$log',
    function ($scope, $modal, $state, $stateParams, $log) {

      $scope.modulos = [
        {
          id: 1,
          nome: 'Modulo 1',
          permissoes: [
            {
              id: 1,
              nome: 'All'
            },
            {
              id: 2,
              nome: 'Ler'
            },
            {
              id: 3,
              nome: 'Escrever'
            },
            {
              id: 4,
              nome: 'Editar'
            },
            {
              id: 5,
              nome: 'Deletar'
            }
          ]
        }
      ]

      $scope.openModal = function () {
        var modalInstance = $modal.open({
          templateUrl: 'views/wba/modulos-permissoes/modal-novo.html',
          controller: function ($scope, $modalInstance) {
            
            $scope.permissoes = [
              {
                id: 1,
                nome: 'All'
              },
              {
                id: 2,
                nome: 'Ler'
              },
              {
                id: 3,
                nome: 'Escrever'
              },
              {
                id: 4,
                nome: 'Editar'
              },
              {
                id: 5,
                nome: 'Deletar'
              }
            ];

            $scope.close = function () {
              $modalInstance.close();
            }

            $scope.salvar = function (item) {
              $modalInstance.close(item);
            }
            
          },
        });

        modalInstance.result.then(function (item) {
          $scope.modulos.push(item);
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      }

    } 
  ])