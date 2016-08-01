'use strict';

angular.module('wbaApp')
  .controller('ManualController',[
    '$scope',
    '$state',
    'toaster',
    'SweetAlert',
    'apiManual',
    function ($scope, $state, toaster,SweetAlert, apiManual) {
      $scope.doDownloadPrevencao = function () {
        
        apiManual.CheckManualPrevencao().then(
          function(res) {
            console.log(res);
          }, 
          function(err) {
            toaster.pop('error','Download Manual',err.status + ": "+ err.message);
          }
        ).then(
          function () {
            apiManual.GetManualPrevencao().then(
              function (res) {
                console.log(res.data);
              },
              function (err) {
                toaster.pop('error','Download Manual',err.status + ": "+ err.message);
              }
            )
          }
        )
      }();
    }
  ])