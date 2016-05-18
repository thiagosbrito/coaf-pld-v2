'use strict';

angular.module('wbaApp')
  .controller('EditarTemplatesCarteiraController', [
    '$scope',
    '$state',
    '$stateParams',
    'apiDocumentacao',
    'apiOperacoes',
    'toaster',
    function ($scope, $state, $stateParams, apiDocumentacao, apiOperacoes, toaster) {

      $scope.getCarteiras = function () {
        apiOperacoes.getCarteiras().then(
          function (res) {
            $scope.carteiras = res.data;
          }
        )
      }();


      $scope.getTemplatesCarteira = function () {
        apiDocumentacao.getTemplateByCarteira($stateParams.carteiraId).then(
          function (res) {
            $scope.templates = res.data;
            angular.forEach($scope.templates, function (value) {
              value.uuidCarteira = _.findWhere($scope.carteiras, {uuid: value.uuidCarteira});

            })
          },
          function (err) {
            toaster.pop('error','Templates por Carteira',err.statusText);
          }
        )
      };
      $scope.getTemplatesCarteira();


    }
  ]);
