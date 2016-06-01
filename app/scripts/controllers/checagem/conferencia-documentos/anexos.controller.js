'use strict';
angular.module('wbaApp')
  .controller('ConferenciaDocumentosAnexosController', [
    '$scope',
    '$state',
    '$stateParams',
    'apiChecagem',
    '$modal',
    'toaster',
    function ($scope, $state, $stateParams, apiChecagem, $modal, toaster) {

      $scope.getAnexosConferencia = function () {
        apiChecagem.getAnexosConferencia($stateParams.conferenciaId).then(
          function (res) {
            $scope.notas = res.data
          },
          function (err) {
            toaster.pop('error','Notas',err.statusText)
          }
        );
      };
      $scope.getAnexosConferencia();

      $scope.addAnexo = function () {
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: 'views/wba/checagem/conferencia-documentos/modal-add-anexos.html',
          controller: function ($scope, $modalInstance) {
            $scope.open = function($event) {
              $event.preventDefault();
              $event.stopPropagation();

              $scope.opened = true;
            };

            $scope.dateOptions = {
              formatYear: 'yy',
              startingDay: 1
            };
            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };

            $scope.save = function (anexos) {
              $modalInstance.close(anexos);
            }
          }
        });

        modalInstance.result.then(
          function (anexos) {
            $scope.anexos = anexos;
            $scope.anexos = $scope.anexos.map(function(anexo) { return anexo.text; });
            apiChecagem.addAnexoConferencia($stateParams.conferenciaId, $scope.anexos).then(
              function (res) {
                toaster.pop('success','Adicionar Anexos à Conferência','Anexo(s) adicionado(s) com sucesso');
                $scope.getAnexosConferencia();
              },
              function (err){
                toaster.pop('error','Adicionar Anexos à Conferência',err.statusText);
              }
            )
          },
          function () {
            return false
          }
        );
      };



    }
  ]);
