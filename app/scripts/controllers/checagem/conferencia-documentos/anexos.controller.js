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

      function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          var slice = byteCharacters.slice(offset, offset + sliceSize);

          var byteNumbers = new Array(slice.length);
          for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }

          var byteArray = new Uint8Array(byteNumbers);

          byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
      }

      $scope.getAnexosConferencia = function () {
        apiChecagem.getAnexosConferencia($stateParams.conferenciaId).then(
          function (res) {
            $scope.anexo = res.data;
            $scope.pdfUrl = b64toBlob($scope.anexo, 'application/pdf');
            $scope.pdfUrl = URL.createObjectURL($scope.pdfUrl);

          },
          function (err) {
            toaster.pop('error','Anexos',err.statusText)
          }
        );
      };
      $scope.getAnexosConferencia();

      // PDF settings
      $scope.scroll = 0;
      $scope.loading = 'loading';
      $scope.getNavStyle = function(scroll) {
        if(scroll > 100) return 'pdf-controls fixed';
        else return 'pdf-controls';
      };
      $scope.onError = function(error) {
        console.log(error);
      };
      $scope.onLoad = function() {
        $scope.loading = '';
      };
      $scope.onProgress = function(progress) {
        $scope.progress = progress.loaded / progress.total;
      };
      // END OF PDF settings


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
          function (anexo) {
            console.log(anexo.pdf);
            apiChecagem.addAnexoConferencia($stateParams.conferenciaId, anexo.pdf).then(
              function (res) {
                toaster.pop('success','Adicionar Anexos à Conferência','Anexo(s) adicionado(s) com sucesso');
                $scope.getAnexosConferencia();
              },
              function (err){
                console.log(err);
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
