'use strict';

angular.module('wbaApp')
  .controller('PDFViewerCedenteController',[
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
            $scope.file = res.data;
            $scope.file = new Blob([$scope.file],{tyoe: 'application/pdf'});
            var url = $window.URL || $window.webkitURL;
            $scope.pdfUrl = url.createObjectURL($scope.file);
          },
          function (err) {
            toaster.pop('error','Imprimir Autorização de Relacionamento',err.status + ': ' + err.message);
          }
        )
      }();

    }]);