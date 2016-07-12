'use strict';
angular.module('wbaApp')
  .controller('CobrancasListarController',[
    '$scope',
    '$state',
    '$stateParams',
    'toaster',
    'SweetAlert',
    'apiCobrancas',
    'apiOperacoes',
    'apiFinanceiro',
    '$modal',
    '$log',
    'Upload',
    function ($scope, $state, $stateParams, toaster, SweetAlert, apiCobrancas, apiOperacoes, apiFinanceiro, $modal, $log, Upload) {


      $scope.getBancos = function () {
        apiFinanceiro.getBancos().then(
          function (res) {
            $scope.bancos = res.data;
          },
          function (err) {
            toaster.pop('error','Bancos',err.statusText);
          }
        )
      }();

      $scope.getCarteiras = function () {
        apiOperacoes.getCarteiras().then(
          function (res) {
            $scope.carteiras = res.data;
          },
          function (err) {
            toaster.pop('error','Carteiras',err.statusText);
          }
        )
      }();
      

      $scope.downloadCnab = function (id) {
        apiCobrancas.getCnab(id).then(
          function (res) {
            toaster.pop('success','Gerar Cnab','Seu arquivo foi gerado com sucesso')
          },
          function (err) {
            console.log(err)
          }
        )
      };

      $scope.getCobrancas = function () {
        apiCobrancas.getCobrancas().then(
          function (res) {
            $scope.cobrancas = res.data;
            angular.forEach($scope.cobrancas, function (value, key) {
              value.banco = _.findWhere($scope.bancos, {uuid: value.uuidBanco})
              value.carteira = _.findWhere($scope.carteiras, {uuid: value.uuidCarteira})
            });
            console.log($scope.cobrancas);
          },
          function (err) {
            toaster.pop('error','Cobrancas',err.statusText)
          }
        )
      };
      $scope.getCobrancas();

      $scope.deleteCobranca = function (cobranca) {

        SweetAlert.swal({
          title: "Excluir Cobrança",
          text: "Você tem certeza? Essa operação não pode ser desfeita",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          cancelButtonText: "Não",
          confirmButtonText: "Sim, eu desejo continuar",
          showLoaderOnConfirm: true,
          timer: 3000,
          closeOnConfirm: false
        },function (isConfirm) {
          if(isConfirm) {
            apiCobrancas.deleteCobranca(cobranca).then(
              function (res) {
                swal("Excluir cobrança", "Sua cobrança foi excluída!", "success")
                toaster.pop('success','Cobrança','Sua cobrança foi excluída com sucesso');
              },
              function (err) {
                toaster.pop('error','Cobrança',err.statusText);
              }
            )
          }
          else {
            swal("Excluir Cobrança","Seu item permanece intacto","error")
          }
        });

      };

      $scope.novaCobranca = function () {
        var modalInstance = $modal.open({
          templateUrl: 'views/wba/cobranca/cobrancas/modal-criar-cobranca.html',
          resolve: {
            bancos: function () {
              return $scope.bancos;
            }
          },
          controller: function ($scope, $modalInstance, bancos, apiCobrancas, apiOperacoes) {
            $scope.bancos = bancos;

            apiOperacoes.getCarteiras().then(
              function (res) {
                $scope.carteiras = res.data;
              }
            )

            $scope.cancel =  function () {
              $modalInstance.dismiss('cancel');
            }

            $scope.save = function (item) {
              // console.log(item)
              $modalInstance.close($scope.cob);
            }
          }
        });

        modalInstance.result.then(
          function (item) {
            apiCobrancas.saveCobranca(item).then(
              function (res) {
                toaster.pop('success','Cobranças','Cobrança cadastrada com sucesso.');
                $scope.getCobrancas();
              },
              function (err) {
                toaster.pop('error','Cobranças',err.statusText);
              }
            )
          }
        );
      };

      $scope.selectedCobs = [];

      $scope.allSelected = false;

      $scope.changeSingle = function (id, status) {
        if (!status) {
          $scope.allSelected = false;
          $scope.selectedCobs = _.without($scope.selectedCobs, id);
        }
        else {
          $scope.selectedCobs.push(id);
          if($scope.selectedCobs.length == $scope.cobrancas.length) {
            $scope.allSelected = true;
          }
        }
      };
      $scope.selectAllCobs = function (value) {
        if (value == true) {
          $scope.showGenerateButton = true;
          angular.forEach($scope.cobrancas, function (value, key)  {
            value.selected = true;
            if(value.selected) {
              $scope.selectedCobs.push(value.uuid)
            }
          })

        }
        else {
          $scope.showGenerateButton = false;
          angular.forEach($scope.cobrancas, function (value, key)  {
            value.selected = false;
          });
          $scope.selectedCobs = [];
        }
      };

      $scope.generateGroupedCobs = function () {
        apiCobrancas.geraCobranca($scope.selectedCobs).then(
          function (res) {
            toaster.pop('success','Gerar Cobrança','Cobrancas geradas com sucesso.');
          },
          function (err) {
            toaster.pop('error','Gerar Cobrança',err.statusText);
          }
        )
      };

      $scope.gerarCobranca = function (id) {

        SweetAlert.swal({
          title: "Gerar cobrança",
          text: "Você pode gerar mais de uma cobrança ao mesmo tempo",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          cancelButtonText: "Sim, desejo gerar mais de uma cobrança",
          confirmButtonText: "Não obrigado, vou gerar somente uma cobrança",
          showLoaderOnConfirm: true,
          closeOnConfirm: false
        },function (isConfirm) {
          if(isConfirm) {
            var idsCob = [];
            idsCob.push(id);
            apiCobrancas.geraCobranca(idsCob).then(
              function(res) {
                swal("Gerar cobrança", "Sua cobrança foi gerada!", "success")
              },
              function (err) {
                swal("Gerar cobrança", err.statusText, "error")
              }
            )
          }
          else {
            $scope.multCobs = true;
          }
        });

      };

      $scope.editarCobranca = function (id) {
        var modalInstance = $modal.open({
          templateUrl: 'views/wba/cobranca/cobrancas/modal-editar-cobranca.html',
          resolve: {
            idCobranca: function (){
              return id
            },
            bancos: function () {
              return $scope.bancos;
            }
          },
          controller: function ($scope, $modalInstance, bancos, apiCobrancas, apiOperacoes, idCobranca) {

            apiCobrancas.getCobrancasById(idCobranca).then(
              function (res) {
                $scope.cob = res.data;
              }
            );

            $scope.bancos = bancos;

            apiOperacoes.getCarteiras().then(
              function (res) {
                $scope.carteiras = res.data;
              }
            );

            $scope.cancel =  function () {
              $modalInstance.dismiss('cancel');
            };

            $scope.close = function (item) {
              $modalInstance.close(item);
            }
          }
        });

        modalInstance.result.then(
          function (item) {
            apiCobrancas.updateCobranca(item).then(
              function (res) {
                toaster.pop('success','Cobranças','Cobrança atualizada com sucesso.');
                $scope.getCobrancas();
              },
              function (err) {
                toaster.pop('error','Cobranças',err.statusText);
              }
            )
          }
        );
      };

      $scope.sendRetorno = function (id) {

        var modalInstance = $modal.open({
          templateUrl: 'views/wba/cobranca/cobrancas/modal-registros.html',
          resolve: {
            idCobranca: function (){
              return id
            }
          },
          controller: function ($scope, $modalInstance, apiCobrancas, apiOperacoes, idCobranca, Upload) {

            apiCobrancas.getRegistros(idCobranca).then(
              function (res) {
                $scope.registros = res.data;
              }
            );

            $scope.cancel =  function () {
              $modalInstance.dismiss('cancel');
            };

            $scope.uploadFiles = function(files, errFiles) {
              $scope.files = files;
              $scope.errFiles = errFiles;
              angular.forEach(files, function(file) {
                file.upload = Upload.upload({
                  url: 'http://api.erp.idtrust.com.br:9000/cobrancas/v1/cobrancas/' + idCobranca + '/registros/retorno',
                  data: {file: file}
                });

                file.upload.then(function (response) {
                  $timeout(function () {
                    file.result = response.data;
                  });
                }, function (response) {
                  if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                  file.progress = Math.min(100, parseInt(100.0 *
                    evt.loaded / evt.total));
                });
              });
            }

          }
        });

        modalInstance.result.then(
          function (item) {
            apiCobrancas.updateCobranca(item).then(
              function (res) {
                toaster.pop('success','Cobranças','Cobrança atualizada com sucesso.');
                $scope.getCobrancas();
              },
              function (err) {
                toaster.pop('error','Cobranças',err.statusText);
              }
            )
          }
        );

      }
    }
  ]);
