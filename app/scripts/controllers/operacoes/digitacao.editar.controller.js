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

      console.log($scope.operacao);

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
            };

            $scope.rec = {};
            $scope.rec.ativo = true;
            $scope.rec.dpVencimento = false;
            $scope.rec.dpDataLimite = false;
            $scope.rec.dpEmissao = false;

            $scope.today = function() {
              $scope.dt = new Date();
            };
            $scope.today();
            $scope.clear = function () {
              $scope.dt = null;
            };
            $scope.disabled = function(date, mode) {
              return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
            };
            $scope.toggleMin = function() {
              $scope.minDate = $scope.minDate ? null : new Date();
            };
            $scope.toggleMin();
            $scope.open = function($event, instance, mode) {
              $event.preventDefault();
              $event.stopPropagation();

              instance.dpVencimento = false;
              instance.dpDataLimite = false;
              instance.dpEmissao = false;

              if(mode == 'vencimento') {
                instance.dpVencimento = true;
              };
              if(mode == 'dataLimite') {
                instance.dpDataLimite = true;
              };
              if(mode == 'emissao') {
                instance.dpEmissao = true;
              };
            };
            $scope.dateOptions = {
              formatYear: 'yy',
              startingDay: 1,
              language: 'pt-BR'
            };

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

        titulo = _.omit(titulo, 'dpEmissao');
        titulo = _.omit(titulo, 'dpVencimento');
        titulo = _.omit(titulo, 'dpDataLimite');

        if(titulo.dateLimiteDesconto) {
          titulo.dateLimiteDesconto = moment(titulo.dateLimiteDesconto).format('DD/MM/YYYY');
        }
        if(titulo.emissao) {
          titulo.emissao = moment(titulo.emissao, "DD/MM/YYYY").format('DD/MM/YYYY');
        }
        if(titulo.vencimento) {
          titulo.vencimento = moment(titulo.vencimento, "DD/MM/YYYY").format('DD/MM/YYYY');
        }

        apiOperacoes.updateRecebivel(titulo.uuid, titulo).then(
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
