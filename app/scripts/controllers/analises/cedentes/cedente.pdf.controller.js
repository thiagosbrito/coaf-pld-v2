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

      var url = $window.URL || $window.webkitURL;

      $scope.getPdf = function () {
        apiAnalizes.printAuthorization($stateParams.analiseId).then(
          function (res) {
            $scope.file = res.data;
            $scope.file = btoa(unescape(encodeURIComponent($scope.file)))
            $scope.file = new Blob([$scope.file],{tyoe: 'application/pdf'});
            $scope.pdfUrl = url.createObjectURL($scope.file);
          },
          function (err) {
            toaster.pop('error','Imprimir Autorização de Relacionamento',err.status + ': ' + err.message);
          }
        )
      }();

    }]);