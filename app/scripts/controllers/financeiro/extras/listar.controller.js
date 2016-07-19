'use strict';
angular.module('wbaApp')
  .controller('ExtrasListarController',[
    '$scope',
    '$state',
    '$stateParams',
    'apiFinanceiro',
    'toaster',
    function ($scope, $state, $stateParams, apiFinanceiro, toaster) {

      $scope.getLancamentos = function () {
        apiFinanceiro.getAllLancamentos().then(
          function (res) {
            $scope.lancamentos = res.data;
            angular.forEach($scope.lancamentos, function (v) {
              apiFinanceiro.getContaById(v.uuidConta).then(
                function (res) {
                  v.uuidConta = res.data;
                }
              )
            });
          },
          function (err) {
            toaster.pop('error','Efetivar Lançamentos',err.statusText)
          }
        )
      }();

      $scope.efetivarLancamento = function (id) {
        var dataContabil = moment().format('YYYY-MM-DD');
        apiFinanceiro.efetivarLancamento(id, dataContabil).then(
          function (res) {
            toaster.pop('success','Efetivar Lançamento','Lançamento efetivado com sucesso');
          },
          function (err) {
            toaster.pop('error','Efetivar Lançamento',err.statusText);
          }
        )
      };
    }
  ]);
