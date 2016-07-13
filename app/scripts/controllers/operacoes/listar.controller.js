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


    $scope.getCedentes = function () {
      apiEmpresas.getEmpresaByType('CEDENTE').then(
        function (res) {
          $scope.ceds = res.data;
        },
        function (err) {
          toaster.pop('success','Cedentes',err.statusText);
        }
      )
    }();

    $scope.openBegin = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.beginOpen = true;
    };

    $scope.openEnd = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.endOpen = true;
    };

    $scope.filtro = {
      dataInicial: new Date(),
      dataFinal: new Date(),
      page: 0,
      qtd: 10
    };

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
    $scope.getWorkflows = function () {
      apiOperacoes.getWorkflows().then(
        function (res) {
          $scope.workflows = res.data;
          console.log($scope.workflows);
        }
      )
    }();

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

    $scope.getOperacoes = function (filter) {
      if ($scope.cedente) {
        filter.uuidCedente = $scope.cedente.id;
      }
      filter.dataInicial  = moment(filter.dataInicial).format('YYYY-MM-DD');
      filter.dataFinal    = moment(filter.dataFinal).format('YYYY-MM-DD');
      apiOperacoes.getOperacoes(filter).then(
        function (res) {
          $scope.operacoes = res.data;
          var lengthFilter = $scope.filtro;
          lengthFilter = _.omit(lengthFilter, 'qtd');
          lengthFilter = _.omit(lengthFilter, 'page');
          console.log(lengthFilter);
          apiOperacoes.getOperacoes(lengthFilter).then(
            function (res) {
              $scope.totalItens = res.data.length;
              console.log($scope.totalItens);
            }
          );
          $scope.addRecebiveisToArray($scope.operacoes);
        }
      )
    }

    $scope.getOperacoes($scope.filtro);

    $scope.pageChanged = function () {
      $scope.filtro.page = $scope.page - 1;
      $scope.getOperacoes($scope.filtro);
    }

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

    $scope.liberarOperacao = function (item) {

      SweetAlert.swal({
        title: "Você tem certeza?",
        text: "Se prosseguir essa operação não poderá ser desfeita!",
        html: true,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Prosseguir",
        closeOnConfirm: true
      },
      function(isConfirm){
        if (isConfirm) {
          apiOperacoes.liberarOperacao({uuidOperacao: item.uuid, uuidWorkflow: item.workflowDeploymentSelecionado}).then(
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
            return apiEmpresas.getEmpresaByType('CEDENTE').then(
              function (res) {
                return res.data;
              }
            )
          },
          workflow: function () {
            return $scope.workflows;
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
