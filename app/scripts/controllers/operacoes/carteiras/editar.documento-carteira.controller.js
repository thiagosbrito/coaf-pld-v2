'use strict';
angular.module('wbaApp')
  .controller('EditarDocumentoCarteiraController',[
    '$scope',
    '$state',
    '$stateParams',
    'toaster',
    '$modal',
    'apiOperacoes',
    'apiChecagem',
    function ($scope, $state, $stateParams, toaster, $modal, apiOperacoes, apiChecagem) {
      $scope.getDocumentos = function () {};
      $scope.addDocumento = function () {};
      $scope.getDocumentosByCarteira = function () {};
    }
  ]);
