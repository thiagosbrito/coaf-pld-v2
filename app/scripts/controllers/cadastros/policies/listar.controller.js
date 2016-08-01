'use strict';

angular.module('wbaApp')
  .controller('CadastroPoliciesListarController',[
    '$scope',
    '$state',
    '$stateParams',
    'apiCadastro',
    'toaster',
    '$filter',
    '$modal',
    'SweetAlert',
    'Session',
    'apiPolicies',
    function ($scope, $state, $stateParams, apiCadastro, toaster, $filter, $modal, SweetAlert, Session, apiPolicies) {

      $scope.user = Session.getUser();

      $scope.getPolicies = function () {
        apiCadastro.getPolicies().then(
          function (res) {
            $scope.policies = res.data;
            $scope.currentPage = 0;
            $scope.pageSize = 8;
            $scope.totalPolicies = $scope.policies;
            $scope.totalPages = Math.ceil($scope.policies.length / $scope.pageSize);
          },
          function (err) {
            toaster.pop('error','Cadastro - Questões e Classificação de Risco',err.statusText);
          }
        )
      };
      $scope.getPolicies();

      $scope.delete = function (id) {
        SweetAlert.swal({
          title: "Você tem certeza?",
          text: "Se você prosseguir, essa operaçao no poderá ser desfeita",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Prosseguir",
          cancelButtonText: "Cancelar",
          closeOnConfirm: false,
          closeOnCancel: false },
        function(isConfirm){
          if (isConfirm) {
            apiCadastro.deletePolicy(id).then(
              function (res) {
                SweetAlert.swal("Excluído!", "Seu registro foi excluído com sucesso", "success");
                $scope.getPolicies();
              },
              function (err) {
                toaster.pop('error','Questões e Classificação de Risco',err.statusText)
              }
            )
          } else {
            SweetAlert.swal("Cancelado", "Seu item permanece intacto", "error");
          }
        });
      }

      // $scope.novo = function () {
      //   var modalInstance = $modal.open({
      //     size: 'lg',
      //     templateUrl: 'views/coaf-pld/cadastros/policies/modal-novo.html',
      //     controller: function ($modalInstance, $scope, policies, itemsOperacao, items) {
            
      //     },
      //     resolve: {
            
      //     }
      //   });

      //   modalInstance.result.then(
      //     function (item) {
      //       console.log(item);
      //     }, 
      //     function () {
      //       return false
      //     }
      //   );
      // }

      $scope.editar = function (item) {
        $state.go('coafPld.cadastro.policies.editar',{policyId: item});
      }


      $scope.inputFilter = "";

      $scope.numberOfPages = function () {
          return Math.ceil($scope.policies.length / $scope.pageSize);
      };
      
      $scope.filterInputChanged = function() {
        $scope.currentPage = 0;
        $scope.policies = $filter('cnpj')($scope.totalPolicies,{'corporateIdNumber':$scope.inputFilter})
      };


    }
  ]);