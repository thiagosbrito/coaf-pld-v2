'use strict';

angular.module('wbaApp')
.controller('OperacoesEditarController', [
  '$scope',
  '$state',
  '$stateParams',
  'apiOperacoes',
  'apiEmpresas',
  'toaster',
  'SweetAlert',
  '$modal',
  'operacao',
  'Upload',
  '$timeout',
  function ($scope, $state, $stateParams, apiOperacoes, apiEmpresas, toaster, SweetAlert, $modal, operacao, Upload, $timeout) {

    apiEmpresas.getAll().then(
      function (res) {
        $scope.cedentes = res.data;
        $scope.selectedCedente = _.where($scope.cedentes, {id: parseInt(operacao.uuidCedente)});
        $scope.selectedCedente = $scope.selectedCedente[0];
      },
      function (err) {
        toaster.pop('error','Cedentes',err.statusText);
      }
      );

    apiOperacoes.getCarteiras().then(
      function (res) {
        $scope.carteiras = res.data;
        $scope.selectedCarteira = _.where($scope.carteiras, {uuid: operacao.uuidCarteira});
        $scope.selectedCarteira = $scope.selectedCarteira[0];
      },
      function (err) {
        toaster.pop('error','Carteiras',err.statusText)
      }
    );

    $scope.getRecebiveisByOperacao = function () {
      apiOperacoes.getRecebiveisByOperacao($stateParams.operacaoId).then(
        function (res) {
          $scope.recebiveis = res.data;
          angular.forEach($scope.recebiveis, function (value, key) {
            value.dpVencimento  = false;
            value.dpEmissao     = false;
            value.dpDataLimite  = false;
          })
        },
        function (err) {
          toaster.pop('error','Recebiveis',err.statusText);
        }
      )
    }
    $scope.getRecebiveisByOperacao();

    // apiOperacoes.getOperacaoById($stateParams.operacaoId).then(
    //   function (res) {
    //     $scope.operacao = res.data;
    //   },
    //   function (err) {
    //     toaster.pop('error','Operação',err.statusText);
    //   }
    // );

    $scope.operacao = operacao;

    $scope.update = function (data) {
      data.uuidCedente = $scope.selectedCedente.id;
      data.uuidCarteira = $scope.selectedCarteira.uuid;
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

    $scope.uploadFiles = function(file, errFiles, type) {
      $scope.f = file;
      $scope.errFile = errFiles && errFiles[0];
      var url = 'http://api.erp.idtrust.com.br:9000/operacoes/v1/operacoes/' + $stateParams.operacaoId + '/' + type;
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

    $scope.addTitulo = function () {

      if (!$scope.recebiveis) {
        $scope.recebiveis = [{}];
      }
      else {
        $scope.recebiveis.push({});
      }
    }

    $scope.saveTitulo = function (titulo) {
      apiOperacoes.addRecebivel($stateParams.operacaoId, titulo).then(
        function (res) {
          toaster.pop('success','Recebível','Item adicionado a operação');
        },
        function (err) {
          toaster.pop('error','Recebível',err.statusText);
        }
      )
    }

  }
])
