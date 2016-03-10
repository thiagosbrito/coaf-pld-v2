angular
  .module('theme.core.neworganization_controller',['theme.core.services'])
  .controller('OrganizacoesNovoController', [
    '$scope',
    '$timeout',
    '$http',
    'baseUrl',
    function ($scope, $timeout, $http, baseUrl) {

      $scope.organizacao = {};
      
      $http.defaults.useXDomain = true;

      $scope.save = function () {
        console.log($scope.organizacao);
        $http({
          url: baseUrl.apiUrl + '/organizacoes',
          data: $scope.organizacao,
          method: 'POST',
          headers: [
            {'Content-Type': 'application/json'}
          ]
        }).then(
          function (res) {
            console.log(res);
          }
        )
      }

    }
  ]);

      