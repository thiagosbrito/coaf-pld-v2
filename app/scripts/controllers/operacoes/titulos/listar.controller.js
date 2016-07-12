'use strict';

angular.module('wbaApp')

  .controller('OperacoesTitulosListarController',[
    'apiOperacoes',
    '$state',
    '$stateParams',
    '$scope',
    'toaster',
    'SweetAlert',
    '$modal',
    function (apiOperacoes, $state, $stateParams, $scope, toaster, SweetAlert, $modal) {

      $scope.getRecebiveis = function () {
        apiOperacoes.getRecebiveis().then(
          function (res) {
            $scope.titulos = res.data;
            angular.forEach($scope.titulos, function (titulo) {
              titulo.infoOpened = false;
            });
          },
          function (err) {
            toaster.pop('error','Titulos',err.statusText);
          }
        )
      };
      $scope.getRecebiveis();

      $scope.showSacadoInfo = function (titulo) {
        var modalInstance = $modal.open({
          templateUrl: 'views/wba/operacoes/titulos/modal-sacado.html',
          resolve: {
            titulo: function () {
              return titulo;
            }
          },
          controller: function ($scope, titulo, $modalInstance) {
            $scope.titulo = titulo;

            $scope.close = function () {
              $modalInstance.dismiss('cancel');
            }
          }
        });

        modalInstance.result.then(
          function (selectedItem) {
            $scope.selected = selectedItem;
          },
          function () {
            console.log('Modal dismissed at: ' + new Date());
          }
        );
      }


      $scope.enviarConfirmacao = function (titulo) {
        console.log(titulo);
      }

    }
  ]);