'use strict';
angular.module('wbaApp')
  .controller('PlataformasEditarController',[
    '$scope',
    '$state',
    '$stateParams',
    'toaster',
    'SweetAlert',
    'apiComercial',
    function ($scope, $state, $stateParams, toaster, SweetAlert, apiComercial) {

        apiComercial.getPlataformasById($stateParams.plataformaId).then(
            function (res) {
                $scope.plataforma = res.data
            },
            function (err) {
                toaster.pop('error','Plataforma', err.statusText)
            }
        )

        $scope.update = function () {
            apiComercial.updatePlataforma($scope.plataforma).then(
                function (res) {
                    toaster.pop('success','Plataforma','Plataforma atualizada com sucesso');
                },
                function (err) {
                    toaster.pop('error','Plataforma',err.statusText)
                }
            )
        }
    }
  ])