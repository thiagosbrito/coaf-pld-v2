angular
  .module('wbaApp')
  .controller('OrganizacoesListarController', [
    '$scope',
    '$timeout',
    '$http',
    'baseUrl',
    'apiOrganizacoes',
    function ($scope, $timeout, $http, baseUrl, apiOrganizacoes) {
      
      apiOrganizacoes.getOrganizations().then(
        function (res) {
          $scope.orgs = res.data;
        },
        function (err) {}
      )
      // $scope.getOrgs = function () {
      //   // $http.get(baseUrl.apiUrl + '/organizacoes').then(
      //   //   function (res) {
      //   //     console.log(res);
      //   //   }
      //   // )
      // }

      // $scope.getOrgs();
    }
  ]);

      