'use strict';
angular.module('wbaApp')
  .controller('EditarDocumentoCarteiraController',[
    '$scope',
    '$state',
    '$stateParams',
    'toaster',
    '$modal',
    'apiOperacoes',
    'apiChecagem',
    'apiDocumentacao',
    function ($scope, $state, $stateParams, toaster, $modal, apiOperacoes, apiChecagem, apiDocumentacao) {

      $scope.addDocumento = function () {
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: 'views/wba/operacoes/carteiras/modal-add-documento.html',
          resolve: {
            documentos: function () {
              return apiChecagem.getDocumentosConferencia().then(
                function (res) {
                  return res.data._embedded.documentoConferencia;
                }
              )
            }
          },
          controller: function ($scope, documentos, $modalInstance, $stateParams) {

            $scope.documentos = documentos;

            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };

            $scope.save = function (documento) {
              documento.uuid = documento._links.self.href.split('/');
              documento.uuid = documento.uuid[documento.uuid.length - 1];
              $scope.docCarteira = {carteiraId: $stateParams.carteiraId, documentoId: documento.uuid};
              $modalInstance.close(documento);
            }
          }
        });

        modalInstance.result.then(
          function (doc) {
            apiChecagem.addDocumentoConferencia(doc).then(
              function (res) {
                toaster.pop('success','Documento para Conferência','Cadastro realizado com sucesso');
                $scope.getDocumentos();
              },
              function (err){
                toaster.pop('error','Documento para Conferência',err.statusText);
              }
            )
          },
          function () {
            return false
          }
        );
      };
      $scope.getDocumentosByCarteira = function (id) {
        apiChecagem.getDocumentosByCarteira(id).then(
          function (res) {
            $scope.documentos = res.data._embedded.documentoParaConferir;
          },
          function (err) {
            toaster.pop('error','Documentos para Conferir',err.statusText);
          }
        )
      };
      $scope.getDocumentosByCarteira($stateParams.carteiraId);
    }
  ]);
