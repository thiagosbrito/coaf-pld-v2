'use strict';
angular.module('wbaApp')
  .controller('HierarquiasNovoController',[
    '$scope',
    '$state',
    '$stateParams',
    'toaster',
    'SweetAlert',
    'apiComercial',
    function ($scope, $state, $stateParams, toaster, SweetAlert, apiComercial) {
      
      $scope.hierarquia = {};

      $scope.hierarquias = [
        {
          "ativo": true,
          "hierarquia": [
            {}
          ],
          "hierarquiaPai": {},
          "nome": "Walter Padelski",
          "tipoHierarquia": "CEO",
          "uuid": 0,
          "uuidCedente": 0,
          "uuidPlataforma": 0,
          "uuidUsuario": 0
        },
        {
          "ativo": true,
          "hierarquia": [
            {}
          ],
          "hierarquiaPai": {},
          "nome": "Diogo Martins",
          "tipoHierarquia": "Diretor de TI",
          "uuid": 1,
          "uuidCedente": 0,
          "uuidPlataforma": 0,
          "uuidUsuario": 0
        },
        {
          "ativo": true,
          "hierarquia": [
            {}
          ],
          "hierarquiaPai": {},
          "nome": "Thiago Brito",
          "tipoHierarquia": "Desenvolvedor Front-End",
          "uuid": 2,
          "uuidCedente": 0,
          "uuidPlataforma": 0,
          "uuidUsuario": 0
        }
      ];

      $scope.save = function () {
        // console.log($scope.hierarquia);
        apiComercial.saveHierarquia($scope.hierarquia).then(
          function (res) {
            toaster.pop('success','Hierarquia','Hierarquia cadastrada com sucesso!');
            $state.go('wba.comercial.hierarquias.listar');
          },
          function (err) {
            toaster.pop('error','Hierarquia',err.statusText)
          }
        )
      }

    }
  ])