'use strict';

angular.module('wbaApp')

.controller('OperacoesListarController',[
  '$scope',
  '$state',
  '$stateParams',
  'apiOperacoes',
  'toaster',
  '$modal',
  'SweetAlert',
  '$log',
  'Upload',
  'apiEmpresas',
  function ($scope, $state, $stateParams, apiOperacoes, toaster, $modal, SweetAlert, $log, Upload, apiEmpresas) {

    $scope.config = {
      autoHideScrollbar: true,
      theme: 'minimal',
      scrollButtons: {
        enable: false
      },
      advanced:{
        updateOnContentResize: true
      },
      setHeight: 200,
      scrollInertia: 0,
      axis: 'y'
    };

    $scope.addRecebiveisToArray = function (operacoes) {
      angular.forEach(operacoes, function (value, key) {
        apiEmpresas.getById(value.idCedente).then(
          function (rs) {
            value.open = false;
            value.cedentes = rs.data;
          }
        );
        apiOperacoes.getCarteiraById(value.idCarteira).then(
          function (rs) {
            value.carteira = rs.data;
          }
        );
        apiOperacoes.getRecebiveisByOperacao(value.uuid).then(
          function (rs) {
            value.recebiveis = rs.data;
          }
        );
      });
    };

    $scope.getOperacoes = function () {
      apiOperacoes.getOperacoes().then(
        function (res) {
          $scope.operacoes = res.data;
          $scope.addRecebiveisToArray($scope.operacoes);
          console.log($scope.operacoes);
        }
      )
    }

    $scope.getOperacoes();

    $scope.openModalTarifas = function (idOperacao) {
      var modalInstance = $modal.open({
        templateUrl: 'views/wba/operacoes/modal-tarifas.html',
        controller: function ($scope, $modalInstance, apiOperacoes) {

          apiOperacoes.getTarifas().then(
            function (res) {
              $scope.tarifas = res.data;
            },
            function (err) {
              console.log(err)
            }
            )

          $scope.salvar = function (item) {
            $modalInstance.close(item);
          }

          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          }

        },
      });


      modalInstance.result.then(
        function (item) {
          apiOperacoes.addTarifaToOperacao(idOperacao, item.uuid, {valor: item.valor}).then(
            function (res) {
              toaster.pop('success','Adicionar tarifa à operação','Tarifa adionada com sucesso')
            },
            function(err) {
              toaster.pop('error','Adicionar tarifa à operação',err.statusText)
            }
            )
        }
        );
    };

    $scope.liberarOperacao = function (id) {

      SweetAlert.swal({
        title: "Você tem certeza?",
        text: "Se prosseguir essa operação não poderá ser desfeita",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Prosseguir",
        closeOnConfirm: true
      },
      function(isConfirm){
        if (isConfirm) {
          apiOperacoes.liberarOperacao(id).then(
            function (res) {
              toaster.pop('success','Operação','Operação liberada com sucesso');
            },
            function (err) {
              toaster.pop('error','Operação',err.statusText);
            }
          )
        }
      })
    }

    $scope.novaOperacao = function () {
      var modalInstance = $modal.open({
        templateUrl: 'views/wba/operacoes/modal-nova-operacao.html',
        resolve: {
          carteiras: function () {
            return apiOperacoes.getCarteiras().then(
              function (res) {
                return res.data;
              }
            )
          },
          cedentes: function () {
            return apiEmpresas.getCedentes().then(
              function (res) {
                return res.data;
              }
            )
          },
          workflow: function () {
            return apiOperacoes.getWorkflows().then(
              function (res) {
                return res.data
              }
            )
          }
        },
        controller: function ($scope, $modalInstance, carteiras, cedentes, workflow) {
          $scope.workflows = workflow;
          $scope.carteiras = carteiras;
          $scope.cedentes = cedentes;
          $scope.save = function (item) {
            $modalInstance.close(item);
          };

          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };

        }
      });


      modalInstance.result.then(
        function (item) {
          item.idCedente = item.idCedente.id;
          apiOperacoes.saveOperacao(item).then(
            function (res) {
              console.log(res);
              toaster.pop('success','Operações','Operação criada com sucesso');
              $scope.getOperacoes();
            },
            function (err) {
              toaster.pop('error','Operações',err.statusText);
            }
          )
        }
      );
    }

    $scope.openImportacao = function (item) {
      var modalInstance = $modal.open({
        templateUrl: 'views/wba/operacoes/modal-importacao.html',
        size: 'lg',
        resolve: {
          operacao: function (){
            return item
          }
        },
        controller: function ($scope, $modalInstance, Upload, $timeout, operacao, apiOperacoes) {
          $scope.salvar = function (item) {
            $modalInstance.close(item);
          };

          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };

          $scope.addRecebivel = function (item) {
            apiOperacoes.addRecebivel(operacao.uuid, item).then(
              function (res) {
                console.log(res)
              },
              function (err) {
                console.log(err)
              }
            )
          }

          $scope.uploadFiles = function(file, errFiles, type) {
            $scope.f = file;
            $scope.errFile = errFiles && errFiles[0];
            var url = 'http://api.erp.idtrust.com.br:9000/operacoes/v1/operacoes/' + item.uuid + '/' + type;
            if (file) {
              file.upload = Upload.upload({
                url: url,
                data: {file: file}
              });

              file.upload.then(function (response) {
                $timeout(function () {
                  // file.result = response.data;
                  toaster.pop('success','Importação de CNAB','Upload de arquivo efetuado')
                });
              }, function (response) {
                if (response.status > 0)
                  toaster.pop('error','Importação de CNAB','Upload de arquivo não efetuado')
              }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
              });
            }
          }

        }
      });


      modalInstance.result.then(
        function (item) {
          apiOperacoes.saveOperacao(item).then(
            function (res) {
              console.log(res);
            },
            function (err) {
              console.log(err);
            }
          )
        }
      );
    };

    $scope.update = function (data) {
      data.idCedente = $scope.selectedCedente.id;
      data.idCarteira = $scope.selectedCarteira.uuid;
      apiOperacoes.updateOperacao(data).then(
        function(res) {
          toaster.pop('success','Operações','Operação atualizada com sucesso');
          $state.go('wba.operacoes.listar');
        },
        function (err) {
          toaster.pop('error','Operações',err.statusText)
        }
      )
    }
  }
])
