'use strict';

angular.module('wbaApp')
  .controller('DigitacaoOperacaoController',[
    '$scope',
    '$state',
    '$stateParams',
    'operacao',
    'SweetAlert',
    'apiOperacoes',
    '$modal',
    '$log',
    'toaster',
    function ($scope, $state, $stateParams, operacao, SweetAlert, apiOperacoes, $modal, $log, toaster) {

      $scope.operacao = operacao;

      $scope.openModalImportacao = function () {
        var modalInstance = $modal.open({
          templateUrl: 'views/wba/operacoes/modal-importacao.html',
          size: 'lg',
          resolve: {
            operacaoId: function () {
              return $stateParams.operacaoId
            }
          },
          controller: function ($scope, $modalInstance, Upload, $timeout, operacaoId, apiOperacoes) {

            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };

            $scope.addRecebivel = function (item) {
              apiOperacoes.addRecebivel(operacaoId, item).then(
                function (res) {
                  console.log(res)
                },
                function (err) {
                  console.log(err)
                }
              )
            }

            $scope.uploadFiles = function (file, errFiles, type) {
              $scope.f = file;
              $scope.errFile = errFiles && errFiles[0];
              var url = 'http://api.erp.idtrust.com.br:9000/operacoes/v1/operacoes/' + operacaoId + '/' + type;
              if (file) {
                file.upload = Upload.upload({
                  url: url,
                  data: {file: file}
                });

                file.upload.then(function (response) {
                  $timeout(function () {
                    // file.result = response.data;
                    toaster.pop('success', 'Importação de CNAB', 'Upload de arquivo efetuado')
                  });
                }, function (response) {
                  if (response.status > 0)
                    toaster.pop('error', 'Importação de CNAB', 'Upload de arquivo não efetuado')
                }, function (evt) {
                  file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
              }
            }

          }
        });
      };

      $scope.updateTitulo = function (titulo) {
        apiOperacoes.updateRecebivel($stateParams.operacaoId, titulo).then(
          function (res) {
            toaster.pop('success','Título','Título atualizado com sucesso');
          },
          function (err) {
            toaster.pop('error','Títulos',err.statusText);
          }
        )
      };

      // $scope.changeTitStatus = function (item) {
      //   SweetAlert.swal({
      //     title: "Você tem certeza?",
      //     text: "Para confirmar clique em Prosseguir",
      //     type: "warning",
      //     showCancelButton: true,
      //     confirmButtonColor: "#DD6B55",
      //     confirmButtonText: "Prosseguir",
      //     closeOnConfirm: true
      //   },
      //   function(isConfirm){
      //     if (isConfirm) {
      //       apiOperacoes.updateOperacao(item).then(
      //         function (res) {
      //           toaster.pop('success','Operações','Operação alterada com sucesso!');
      //         },
      //         function (err) {
      //           toaster.pop('error','Operações',err.statusText);
      //         }
      //       )
      //     }
      //   });
      // }

    }

  ])
  .controller('digitacaoPopoverController',[
    '$scope',
    function ($scope) {
      $scope.editarTitulo = function (item) {
        console.log(item);
      }
    }
  ])
