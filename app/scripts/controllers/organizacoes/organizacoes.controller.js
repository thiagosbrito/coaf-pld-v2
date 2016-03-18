angular
  .module('wbaApp')
  .controller('OrganizacoesListarController', [
    '$scope',
    '$timeout',
    '$http',
    'baseUrl',
    'apiOrganizacoes',
    '$modal',
    function ($scope, $timeout, $http, baseUrl, apiOrganizacoes, $modal) {

      $scope.totalItems = 64;
      $scope.currentPage = 4;
       
      $scope.maxSize = 5;
      $scope.bigTotalItems = 175;
      $scope.bigCurrentPage = 1;

      $scope.orgs = [];
      
      $scope.getOrganizations = function () {
        apiOrganizacoes.getOrganizations().then(
          function (res) {
            $scope.orgs = res.data;
          },
          function (err) {}
        )
      }
      $scope.getOrganizations();
      // $scope.getOrgs = function () {
      //   // $http.get(baseUrl.apiUrl + '/organizacoes').then(
      //   //   function (res) {
      //   //     console.log(res);
      //   //   }
      //   // )
      // }

      // $scope.getOrgs();

      $scope.openModal = function () {
        
        var modalInstance = $modal.open({
          templateUrl: 'views/wba/organizacoes/modal-organizacoes-novo.html',
          controller: function ($scope, $modalInstance) {
            $scope.close = function () {
              $modalInstance.close();
            }
            $scope.salvar = function (item) {
              $modalInstance.close(item);
            }
          },
        });

        modalInstance.result.then(
          function (item) {
            console.log(item);
            apiOrganizacoes.saveOrganization(item).then(
              function (res) {
                $scope.getOrganizations();
              },
              function (err) {
                console.log(err)
              }
            )
          },
          function () {
            $log.info('Modal dismissed at: ' + new Date());
          }
        );
      }
    }
  ]);

      