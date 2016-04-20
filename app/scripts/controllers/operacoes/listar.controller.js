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

    $scope.addRecebiveisToArray = function (operacoes) {
      angular.forEach(operacoes, function (value, key) {
        apiEmpresas.getById(value.uuidCedente).then(
          function (rs) {
            value.cedentes = rs.data
          }
        )
      })
      console.log($scope.operacoes);
    }

    $scope.getOperacoes = function () {
      apiOperacoes.getOperacoes().then(
        function (res) {
          $scope.operacoes = res.data;
          $scope.addRecebiveisToArray($scope.operacoes);
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
        size: 'lg',
        controller: function ($scope, $modalInstance) {

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

          $scope.recebiveis = [];

          $scope.addTitulo = function () {
            $scope.recebiveis.push({}); 
          }

          $scope.addRecebivel = function (data) {
            apiOperacoes.addRecebivel(item.uuid, data).then(
              function (res) {
                toaster.pop('success','Recebível','Recebível cadastrado com sucesso');
                $modalInstance.dismiss('cancel');
              },
              function (err) {

              }
            )
          }
          $scope.close = function () {
            $modalInstance.dismiss('cancel');
          }
          $scope.salvar = function (item) {
            $modalInstance.close(item);
          }
          $scope.uploadFiles = function(file, errFiles, type) {
            $scope.f = file;
            $scope.errFile = errFiles && errFiles[0];
            if (file) {
              var url;
              if(type == 'cnab') {
                url = 'http://api.erp.idtrust.com.br:9000/operacoes/v1/operacoes/' + item.uuid + '/cnab';
              }
              if(type == 'xml') {
                url = 'http://api.erp.idtrust.com.br:9000/operacoes/v1/operacoes/' + item.uuid + '/cte';
              }
              file.upload = Upload.upload({
                url: url,
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
                  file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
              });
            }   
          }
        }
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