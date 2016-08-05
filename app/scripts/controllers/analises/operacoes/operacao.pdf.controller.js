'use strict';

angular.module('wbaApp')
  .controller('PDFViewerOperacaoController',[
    '$scope',
    '$stateParams',
    '$state',
    'toaster',
    'Session',
    'apiAnalizes',
    '$window',
    function ($scope, $stateParams, $state, toaster, Session, apiAnalizes, $window) {

      $scope.getPdf = function () {
        apiAnalizes.printAuthorization($stateParams.analiseId).then(
          function (res) {
            $scope.pdfUrl = res.data;
            // var url = $window.URL || $window.webkitURL;
            var url = $window.URL || $window.webkitURL;
            $scope.pdfUrl = url.createObjectURL($scope.file);
          },
          function (err) {
            toaster.pop('error','Imprimir Autorização de Relacionamento',err.status + ': ' + err.message);
          }
        )
      }();

    }]);