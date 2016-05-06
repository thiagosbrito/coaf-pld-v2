'use strict';
angular.module('wbaApp')
.controller('OperacoesNovoController', [
  '$scope',
  '$state',
  '$stateParams',
  'apiOperacoes',
  'apiEmpresas',
  'toaster',
  'SweetAlert',
  '$modal',
  '$log',
  function ($scope, $state, $stateParams, apiOperacoes, apiEmpresas, toaster, SweetAlert, $modal, $log) {

    apiEmpresas.getAll().then(
      function (res) {
        $scope.cedentes = res.data;
        // $scope.cedentes = _.where($scope.cedentes, {tipo: 'CEDENTE'});
      },
      function (err) {
        toaster.pop('error','Cedentes',err.statusText);
      }
    );

    $scope.getCarteiras = function () {
      apiOperacoes.getCarteiras().then(
        function (res) {
          $scope.carteiras = res.data;
        },
        function (err) {
          toaster.pop('error','Carteiras',err.statusText)
        }
      );
    }
    $scope.getCarteiras();

    $scope.save = function (data) {
      data.uuidCedente = data.uuidCedente.id;
      apiOperacoes.saveOperacao(data).then(
        function(res) {
          toaster.pop('success','Operações','Operação salva com sucesso');
          $state.go('wba.operacoes.listar');
        },
        function (err) {
          toaster.pop('error','Operações',err.statusText)
        }
      )
    }

    $scope.openModalCarteiras = function () {
      var modalInstance = $modal.open({
          templateUrl: 'views/wba/operacoes/carteiras/modal-new.html',
          size: 'sm',
          controller: function ($scope, $modalInstance) {
            $scope.close = function () {
              $modalInstance.dismiss('cancel');
            }
            $scope.salvar = function (item) {
              $modalInstance.close(item);
            }
          },
        });

        // modal para cadastro de representante
        modalInstance.result.then(
          function (item) {
            apiOperacoes.saveCarteira(item).then(
              function (res) {
                toaster.pop('success','Carteira','Carteira cadastrada com sucesso!');
                $scope.getCarteiras();
              },
              function (err) {
                toaster.pop('error','Carteiras',err.statusText);
              }
            )
          },
          function () {
            $log.info('Modal dismissed at: ' + new Date());
          }
        );
    }

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
      startingDay: 1,
      language: 'pt-BR'
    };

  }
])
