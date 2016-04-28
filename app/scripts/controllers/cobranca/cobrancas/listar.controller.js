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
    'uuid4',
    '$modal',
    '$log',
    function ($scope, $state, $stateParams, toaster, SweetAlert, apiCobrancas, apiOperacoes, uuid4, $modal, $log) {

      $scope.bancos = [
        {
          "uuid": uuid4.generate(),
          "numeroBanco": '001',
          "nomeBanco": 'BANCO DO BRASIL S.A'
        },
        {
          "uuid": uuid4.generate(),
          "numeroBanco": '237',
          "nomeBanco": 'BANCO BRADESCO S.A'
        },
        {
          "uuid": uuid4.generate(),
          "numeroBanco": '341',
          "nomeBanco": 'BANCO ITAÚ S.A'
        },
        {
          "uuid": uuid4.generate(),
          "numeroBanco": '033',
          "nomeBanco": 'BANCO SANTANDER S.A'
        },
        {
          "uuid": uuid4.generate(),
          "numeroBanco": '104',
          "nomeBanco": 'CAIXA ECONÔMICA FEDERAL'
        }
      ];

      $scope.getCobrancas = function () {
        apiCobrancas.getCobrancas().then(
          function (res) {
            $scope.cobrancas = res.data;
            angular.forEach($scope.cobrancas, function (value, key) {
              // TODO: após implementada a API para bancos, substituir no grid o cob.uuidBanco por cob.banco.nomeBanco
              value.banco = _.findWhere($scope.bancos, {uuid: value.uuidBanco})
            });

          },
          function (err) {
            toaster.pop('error','Cobrancas',err.statusText)
          }
        )
      };
      $scope.getCobrancas();

      $scope.deleteCobranca = function (cobranca) {
        apiCobrancas.deleteCobranca(cobranca).then(
          function (res) {
            toaster.pop('success','Cobrança','Sua cobrança foi excluída com sucesso');
          },
          function (err) {
            toaster.pop('error','Cobrança',err.statusText);
          }
        )
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
          templateUrl: 'views/wba/cobranca/cobrancas/modal-criar-cobranca.html',
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
            )

            $scope.bancos = bancos;

            apiOperacoes.getCarteiras().then(
              function (res) {
                $scope.carteiras = res.data;
              }
            )

            $scope.cancel =  function () {
              $modalInstance.dismiss('cancel');
            }

            $scope.update = function (item) {
              // console.log(item)
              $modalInstance.close($scope.cob);
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

    }
  ]);
