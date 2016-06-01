'use strict';

angular.module('wbaApp')
  .controller('ConferenciaDocumentosPesquisarController',[
    '$scope',
    '$state',
    '$stateParams',
    'apiChecagem',
    'apiOperacoes',
    'toaster',
    'SweetAlert',
    '$modal',
    function ($scope, $state, $stateParams, apiChecagem, apiOperacoes, toaster, SweetAlert, $modal) {

      // definitions for date
      $scope.today = function() {
        $scope.dt = new Date();
      };
      $scope.today();

      $scope.clear = function () {
        $scope.dt = null;
      };

      // Disable weekend selection
      $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
      };

      $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
      };
      $scope.toggleMin();

      $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
      };

      $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
      };

      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = $scope.formats[0];

      // end of definitions

      apiOperacoes.getOperacoes().then(
        function (res) {
          $scope.operacoes = res.data;
        },
        function (err) {
          toaster.pop('error','Operaçoes',err.statusText)
        }
      );
      $scope.getConferenciasByData = function (data) {
        data = moment(data).format('YYYY-MM-DD');
        apiChecagem.findConferenciasByData(data).then(
          function (res) {
            $scope.conferencias = res.data._embedded.conferencia;
            angular.forEach($scope.conferencias, function (value){
              value.uuid = value._links.self.href.split('/');
              value.uuid = value.uuid[value.uuid.length - 1];
              apiOperacoes.getOperacaoById(value.uuidOperacao).then(
                function (res) {
                  value.operacao = res.data
                }
              )
            })
          },
          function (err) {
            toaster.pop('error','Conferência de Documentos',err.statusText)
          }
        )
      };
      $scope.getConferenciasByData(moment().format('YYYY-MM-DD'));
      $scope.filtroOperacao = null;
      $scope.getConferenciasByOperacao = function ($item, $model, $label) {

        apiChecagem.findConferenciasByOperacao($item.uuid).then(
          function (res) {
            $scope.conferencias = res.data._embedded.conferencia;
            angular.forEach($scope.conferencias, function (value){
              value.uuid = value._links.self.href.split('/');
              value.uuid = value.uuid[value.uuid.length - 1];
              apiOperacoes.getOperacaoById(value.uuidOperacao).then(
                function (res) {
                  value.operacao = res.data
                }
              )
            });
          },
          function (err) {
            toaster.pop('error','Conferência de Documentos', err.statusText)
          }
        )
      };
      $scope.addConferencia = function () {

        var modalInstance = $modal.open({
          animation: true,
          templateUrl: 'views/wba/checagem/conferencia-documentos/modal-add-conferencia.html',
          resolve: {
            operacoes: function () {
              return $scope.operacoes
            }
          },
          controller: function ($scope, operacoes, $modalInstance) {
            $scope.operacoes = operacoes;
            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };

            $scope.save = function (conferencia) {
              $modalInstance.close(conferencia);
            }
          }
        });

        modalInstance.result.then(
          function (conferencia) {
            $scope.conferencia = conferencia;
            $scope.conferencia.uuidOperacao = $scope.conferencia.uuidOperacao.uuid;
            apiChecagem.addConferencia($scope.conferencia).then(
              function (res) {
                toaster.pop('success','Conferência de Documentos','Cadastro realizado com sucesso');
                $scope.getConferenciasByData(moment().format('YYYY-MM-DD'));
              },
              function (err){
                toaster.pop('error','Conferência de Documentos',err.statusText);
              }
            )
          },
          function () {
            return false
          }
        );
      };
      $scope.addNota = function (conferencia) {

        var modalInstance = $modal.open({
          animation: true,
          templateUrl: 'views/wba/checagem/conferencia-documentos/modal-add-nota.html',
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
            apiChecagem.addNotaConferencia(conferencia.uuid, $scope.nota).then(
              function (res) {
                toaster.pop('success','Adicionar Nota à Conferência','Nota adicionada com sucesso');
              },
              function (err){
                toaster.pop('error','Adicionar Nota à Conferência',err.statusText);
              }
            )
          },
          function () {
            return false
          }
        );
      };
      $scope.agendarConferencia =  function (id) {
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: 'views/wba/checagem/conferencia-documentos/modal-agendar-conferencia.html',
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

            $scope.save = function (agendamento) {
              $modalInstance.close(agendamento);
            }
          }
        });

        modalInstance.result.then(
          function (agendamento) {
            agendamento = moment(agendamento).format('YYYY-MM-DD');
            apiChecagem.agendarConferencia(id, {dataAgendamento: agendamento}).then(
              function (res) {
                toaster.pop('success','Agendar Conferencia','Data de agendamento cadastrada com sucesso');
              },
              function (err){
                toaster.pop('error','Agendar Conferencia',err.statusText);
              }
            )
          },
          function () {
            return false
          }
        );

      };
      $scope.confirmarConferencia =  function (id) {
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: 'views/wba/checagem/conferencia-documentos/modal-confirmar-conferencia.html',
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

            $scope.save = function (entrega) {
              $modalInstance.close(entrega);
            }
          }
        });

        modalInstance.result.then(
          function (entrega) {
            entrega = moment(entrega).format('YYYY-MM-DD');
            apiChecagem.confirmarConferencia(id, {dataEntrega: entrega}).then(
              function (res) {
                toaster.pop('success','Confirmar Conferencia','Data de entrega cadastrada com sucesso');
              },
              function (err){
                toaster.pop('error','Confirmar Conferencia',err.statusText);
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