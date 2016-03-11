angular
  .module('wbaApp')
  .controller('OrganizacoesNovoController', [
    '$scope',
    '$timeout',
    '$http',
    'baseUrl',
    '$state',
    'apiOrganizacoes',
    function ($scope, $timeout, $http, baseUrl, $state, apiOrganizacoes) {

      $scope.organizacao = {};
      
      $http.defaults.useXDomain = true;

      $scope.save = function () {
        apiOrganizacoes.saveOrganization($scope.organizacao).then(
          function (res) {
            $scope.organizacao = res.data;
            $state.go('wba.organizacoes.listar');
          },
          function (err) {
            console.log(err)
          }
        )
      };

    }
  ]);

      