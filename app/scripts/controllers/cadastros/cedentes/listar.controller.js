'use strict';

angular.module('wbaApp')
  .controller('CadastroCedentesListarController',[
    '$scope',
    '$state',
    '$stateParams',
    'apiCadastro',
    'toaster',
    '$filter',
    '$modal',
    function ($scope, $state, $stateParams, apiCadastro, toaster, $filter, $modal) {

      $scope.getCedentes = function () {
        apiCadastro.getCedentes().then(
          function (res) {
            $scope.customers = res.data;
            $scope.currentPage = 0;
            $scope.pageSize = 8;
            $scope.totalCustomers = $scope.customers;
            $scope.totalPages = Math.ceil($scope.customers.length / $scope.pageSize);
          },
          function (err) {
            toaster.pop('error','Cadastro - Cedentes',err.statusText);
          }
        )
      }();

      $scope.novo = function () {
        var modalInstance = $modal.open({

          templateUrl: 'views/coaf-pld/cadastros/cedentes/modal-novo.html',
          
          controller: function ($modalInstance, $scope, apiCep) {
            $scope.cedente = {};
            
            $scope.buscarCep = function (cep) {
              apiCep.consultaCep(cep).then(
                function (res) {
                  var address = res.data;
                  $scope.cedente.address = {
                    street: address.logradouro,
                    city: address.localidade,
                    state: address.uf
                  }
                }
              )
            }

            $scope.save = function (item) {
              $modalInstance.close(item)
            }

            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            }
          }
        });

        modalInstance.result.then(
          function (item) {
            item.obrigado = false;
            item.politicamenteExposto = false;
            item.servidorPublico = false;
            item.tipoEnvolvimento = 1;
            apiCadastro.addCedente(item).then(
              function (res) {
                toaster.pop('success','Cadastro Cedente','Cadastro realizado com sucesso');
              },
              function (err) {
                toaster.pop('error','Cadastro Cedente',err.statusText);
              }
            )
          }, 
          function () {
            return false
          }
        );
      }


      $scope.inputFilter = "";

      $scope.numberOfPages = function () {
          return Math.ceil($scope.customers.length / $scope.pageSize);
      };
      
      $scope.filterInputChanged = function() {
        $scope.currentPage = 0;
        $scope.customers = $filter('cnpj')($scope.totalCustomers,{'corporateIdNumber':$scope.inputFilter})
      };


    }
  ]);