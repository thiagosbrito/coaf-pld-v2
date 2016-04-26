'use strict';

angular.module('wbaApp')
.controller('BoletosPasso1Controller',[
  '$scope',
  '$state',
  '$stateParams',
  '$rootScope',
  function ($scope,$state,$stateParams, $rootScope) {

    $scope.bancos = [
      {
        banco: {
          codigoBanco: '001',
          nomeBanco: 'BANCO DO BRASIL S.A'
        },
        active: false,
        possuiConta: null,
        logoUrl: 'assets/img/logo-bancos/bb.jpg'
      },
      {
        banco: {
          codigoBanco: '237',
          nomeBanco: 'BANCO BRADESCO S.A'
        },
        active: false,
        possuiConta: null,
        logoUrl: 'assets/img/logo-bancos/bradesco.png'
      },
      {
        banco: {
          codigoBanco: '341',
          nomeBanco: 'BANCO ITAÚ S.A'
        },
        active: false,
        possuiConta: null,
        logoUrl: 'assets/img/logo-bancos/itau.png'
      },
      {
        banco: {
          codigoBanco: '033',
          nomeBanco: 'BANCO SANTANDER S.A'
        },
        active: false,
        possuiConta: null,
        logoUrl: 'assets/img/logo-bancos/santander.png'
      },
      {
        banco: {
          codigoBanco: '104',
          nomeBanco: 'CAIXA ECONÔMICA FEDERAL'
        },
        active: false,
        possuiConta: null,
        logoUrl: 'assets/img/logo-bancos/caixa.gif'
      }
    ];

    $scope.selectBanco = function (banco) {
      angular.forEach($scope.bancos, function (value, key) {
        value.active = false;
      });
      banco.active = true;
    }

    $scope.changeSelectedBanco = function (value) {
      $scope.selectedBanco = _.where($scope.bancos, {active: true});
      $scope.selectedBanco = $scope.selectedBanco[0];
      $scope.selectedBanco.active = value;
    }

    $scope.proceed = function () {
      $rootScope.selectedBanco = $scope.selectedBanco;
      $state.go('wba.cobranca.boletos.passos.passo-2')
    }

  }
]);
