'use strict';
angular.module('wbaApp')
  .controller('DocumentosConferenciaListarController',[
    '$scope',
    '$state',
    '$stateParams',
    '$modal',
    'SweetAlert',
    'toaster',
    'apiChecagem',
    'apiDocumentacao',
    'apiOperacoes',
    function ($scope, $state, $stateParams, $modal, SweetAlert, toaster, apiChecagem, apiDocumentacao, apiOperacoes) {


      $scope.getTemplates = function () {
        apiDocumentacao.getTemplates().then(
          function (res) {
            $scope.templates = res.data;
          }
        )
      }();
       $scope.getDocumentos = function () {
        apiChecagem.getDocumentosConferencia().then(
          function (res) {
            $scope.documentos = res.data._embedded.documentoConferencia;
            angular.forEach($scope.documentos, function (value) {
              value.uuid = value._links.self.href.split('/');
              value.uuid = value.uuid[value.uuid.length - 1];
              value.templateId = _.findWhere($scope.templates, {uuid: value.templateId});
            })
          },
          function (err) {
            toaster.pop('error','Documentos de Conferência',err.statusText);
          }
        )
      };
      $scope.getDocumentos();

      $scope.addDocumento = function () {
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: 'views/wba/checagem/documentos-conferencia/modal-add-documento.html',
          resolve: {
            templates: function () {
              return apiDocumentacao.getTemplates().then(
                function (res) {
                  return res.data;
                }
              )
            }
          },
          controller: function ($scope, templates, $modalInstance) {

            $scope.templates = templates;

            $scope.doc = {};

            $scope.setInfoToDoc = function (info) {
              $scope.doc.titulo = info.titulo;
              $scope.doc.descricao = info.descricao;
            };

            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };

            $scope.save = function (conferencia) {
              $modalInstance.close(conferencia);
            }
          }
        });

        modalInstance.result.then(
          function (doc) {
            $scope.doc = doc;
            $scope.doc.templateId = $scope.doc.templateId.uuid;
            apiChecagem.addDocumentoConferencia($scope.doc).then(
              function (res) {
                toaster.pop('success','Documento de Conferência','Cadastro realizado com sucesso');
                $scope.getDocumentos();
              },
              function (err){
                toaster.pop('error','Documento de Conferência',err.statusText);
              }
            )
          },
          function () {
            return false
          }
        );
      };
      $scope.updateDocumento = function (documento) {
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: 'views/wba/checagem/documentos-conferencia/modal-update-documento.html',
          resolve: {
            templates: function () {
              return apiDocumentacao.getTemplates().then(
                function (res) {
                  return res.data;
                }
              )
            },
            documento: function (){
              return documento;
            }
          },
          controller: function ($scope, templates, documento, $modalInstance) {

            $scope.templates = templates;
            $scope.doc = documento;
            // $scope.doc.templateId = _.findWhere($scope.templates, {uuid: $scope.doc.templateId});

            $scope.setInfoToDoc = function (info) {
              $scope.doc.titulo = info.titulo;
              $scope.doc.descricao = info.descricao;
            };

            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };

            $scope.save = function (doc) {
              $modalInstance.close(doc);
            }
          }
        });

        modalInstance.result.then(
          function (doc) {
            $scope.doc = doc;
            $scope.doc.templateId = $scope.doc.templateId.uuid;
            apiChecagem.updateDocumentoConferencia($scope.doc.uuid, $scope.doc).then(
              function (res) {
                toaster.pop('success','Documento de Conferência','Documento atualizado com sucesso');
                $scope.getDocumentos();
              },
              function (err){
                toaster.pop('error','Documento de Conferência',err.statusText);
              }
            )
          },
          function () {
            return false
          }
        );
      };
      $scope.deleteDocumento = function (id) {
        SweetAlert.swal({
            title: "Você tem certeza?",
            text: "Se você prosseguir, essa operaçao no poderá ser desfeita",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Prosseguir",
            cancelButtonText: "Cancelar",
            closeOnConfirm: false,
            closeOnCancel: false },
          function(isConfirm){
            if (isConfirm) {
              apiChecagem.deleteDocumentoConferencia(id).then(
                function (res) {
                  SweetAlert.swal("Excluído!", "Seu registro foi excluído com sucesso", "success");
                  $scope.getDocumentos();
                },
                function (err) {
                  toaster.pop('error','Documentos de Conferência',err.statusText)
                }
              )
            } else {
              SweetAlert.swal("Cancelado", "Seu item permanece intacto", "error");
            }
          });
      };

      $scope.associarCarteira = function (documento) {
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: 'views/wba/checagem/documentos-conferencia/modal-associar-carteira.html',
          resolve: {
            carteiras: function () {
              return apiOperacoes.getCarteiras().then(
                function (res) {
                  return res.data;
                }
              )
            },
            documento: function (){
              return documento;
            }
          },
          controller: function ($scope, carteiras, documento, $modalInstance) {

            $scope.carteiras = carteiras;
            $scope.doc = documento;

            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };

            $scope.save = function (carteira) {
              $scope.dataForAssociate = {
                docId: $scope.doc.uuid,
                cartId: carteira.uuid
              }
              $modalInstance.close($scope.dataForAssociate);
            }
          }
        });

        modalInstance.result.then(
          function (data) {

            apiChecagem.associarCarteira(data.docId, data.cartId).then(
              function (res) {
                toaster.pop('success','Associar Carteira','Carteira associada com sucesso');
                $scope.getDocumentos();
              },
              function (err){
                toaster.pop('error','Associar Carteira',err.statusText);
              }
            )
          },
          function () {
            return false
          }
        );
      }

    }
  ]
);
