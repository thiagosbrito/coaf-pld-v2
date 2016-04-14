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
  function ($scope, $state, $stateParams, apiOperacoes, toaster, $modal, SweetAlert, $log) {

    $scope.getOperacoes = function () {
      apiOperacoes.getOperacoes().then(
        function (res) {
          $scope.operacoes = res.data;
        },
        function (err) {
          toaster.pop('error','Operações', err.statusText);
        }
      )
    }
    $scope.getOperacoes();

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

    $scope.openModalImportar = function (item) {
        
      var modalInstance = $modal.open({
        templateUrl: 'views/wba/operacoes/modal-importacao.html',
        controller: function ($scope, $modalInstance) {
          $scope.close = function () {
            $modalInstance.close();
          }
          $scope.salvar = function (item) {
            $modalInstance.close(item);
          }

          $scope.uploadFiles = function(files, errFiles) {
            $scope.files = files;
            $scope.errFiles = errFiles;
            angular.forEach(files, function(file) {
              file.upload = Upload.upload({
                url: 'http:api.erp.idtrust.com.br:9000/operacoes/v1/operacoes/' + item.uuid + '/cnab',
                data: {cnab: file},
                headers: {
                  'Content-Type':'application/octet-stream'
                }
              });

              file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
              }, function (response) {
                if (response.status > 0)
                  $scope.errorMsg = response.status + ': ' + response.data;
              }, function (evt) {
                  file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
              });
            });
          }
        },
      });

      modalInstance.result.then(
        function (item) {
          console.log(item);
          apiOrganizacoes.saveOrganization(item).then(
            function (res) {
              $scope.getOrganizations();
            },
            function (err) {
              console.log(err)
            }
          )
        },
        function () {
          $log.info('Modal dismissed at: ' + new Date());
        }
      );
    }

  }
])