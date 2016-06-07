'use strict';

angular.module('wbaApp')
  .controller('ConfirmacaoTitulosListarController', [
    '$scope',
    '$state',
    '$stateParams',
    'apiChecagem',
    'toaster',
    '$modal',
    'SweetAlert',
    'apiEmpresas',
    'apiOperacoes',
    function ($scope, $state, $stateParams, apiChecagem, toaster, $modal, SweetAlert, apiEmpresas, apiOperacoes) {
      $scope.getTitulosBySacado = function () {
        apiChecagem.getTitulosBySacado().then(
          function (res) {
            $scope.confTitulos = res.data;
            angular.forEach($scope.confTitulos, function (value) {
              apiEmpresas.getById(value.sacado).then(
                function (res) {
                  value.sacado = res.data;
                  value.collapse = true;
                }
              );
              angular.forEach(value.titulos, function (v){
                apiOperacoes.getCarteiraById(v.titulo.uuidCarteira).then(
                  function (res) {
                    v.titulo.uuidCarteira = res.data;
                  }
                );
                apiOperacoes.getRecebivelById(v.titulo.uuidDuplicata).then(
                  function (res) {
                    v.titulo.uuidDuplicata = res.data;
                  }
                );
                apiChecagem.getNotasByTitulosConfirmacao(v.titulo.uuid).then(
                  function (res) {
                    v.titulo.notas = res.data
                  }
                )
              })
            });
            console.log($scope.confTitulos);
          },
          function (err) {
            toaster.pop('error','Confirmação de Títulos',err.statsText)
          }
        )
      };
      $scope.getTitulosBySacado();

      $scope.addNota = function (tit) {
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: 'views/wba/checagem/confirmacao-titulos/modal-add-nota.html',
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

            $scope.save = function (nota) {
              $modalInstance.close(nota);
            }
          }
        });

        modalInstance.result.then(
          function (nota) {
            $scope.nota = nota;
            $scope.nota.dataOcorrencia = moment($scope.nota.dataOcorrencia).format();
            apiChecagem.addNotaConfirmacao(tit.titulo.uuid, $scope.nota).then(
              function (res) {
                toaster.pop('success','Adicionar Nota à Confirmação de Título','Nota adicionada com sucesso');
                $scope.getTitulosBySacado();
              },
              function (err){
                toaster.pop('error','Adicionar Nota à Confirmação de Título',err.statusText);
              }
            )
          },
          function () {
            return false
          }
        );
      };
      $scope.agendar = function (tit) {
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: 'views/wba/checagem/confirmacao-titulos/modal-agendar-confirmacao.html',
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

            $scope.save = function (nota) {
              $modalInstance.close(nota);
            }
          }
        });

        modalInstance.result.then(
          function (dataAgendamento) {
            apiChecagem.agendarConfirmacao(tit.titulo.uuid, {dataAgendamento: dataAgendamento}).then(
              function (res) {
                toaster.pop('success','Agendar Confirmação de Título','Confirmaçao agendada com sucesso');
                $scope.getTitulosBySacado();
              },
              function (err){
                toaster.pop('error','Agendar Confirmação de Título',err.statusText);
              }
            )
          },
          function () {
            return false
          }
        );
      };
      $scope.confirmar = function (tit){
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: 'views/wba/checagem/confirmacao-titulos/modal-confirmacao.html',
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

            $scope.save = function (confirmacao) {
              $modalInstance.close(confirmacao);
            }
          }
        });

        modalInstance.result.then(
          function (confirmacao) {
            apiChecagem.confirmarConfirmacao(tit.titulo.uuid, confirmacao).then(
              function (res) {
                toaster.pop('success','Confirmação de Título','Confirmação realizada com sucesso');
                $scope.getTitulosBySacado();
              },
              function (err){
                toaster.pop('error','Confirmação de Título',err.statusText);
              }
            )
          },
          function () {
            return false
          }
        );
      };
      $scope.readNotas = function (notas) {
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: 'views/wba/checagem/confirmacao-titulos/modal-ler-notas.html',
          resolve: {
            notas: function () {
              return notas
            }
          },
          controller: function ($scope, $modalInstance, notas) {
            $scope.notas = notas;
            angular.forEach($scope.notas, function (value){
              value.dataOcorrencia = moment(value.dataOcorrencia).format('DD/MM/YYYY');
            });
            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };


          }
        });
      }
    }
  ]);
