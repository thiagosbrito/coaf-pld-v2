angular
  .module('theme.core.organization_controller',['theme.core.services'])
  .controller('OrganizacoesListarController', [
    '$scope',
    '$timeout',
    '$http',
    'baseUrl',
    function ($scope, $timeout, $http, baseUrl) {
      
      $scope.getOrgs = function () {
        $http.get(baseUrl.apiUrl + '/organizacoes').then(
          function (res) {
            console.log(res);
          }
        )
      }

      $scope.getOrgs();
    }
  ]);

      