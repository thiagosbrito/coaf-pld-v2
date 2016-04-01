'use strict';
angular.module('wbaApp')
  .controller('HierarquiasListarController',[
    '$scope',
    '$state',
    '$stateParams',
    'toaster',
    'SweetAlert',
    'apiComercial',
    function ($scope, $state, $stateParams, toaster, SweetAlert, apiComercial) {
      
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
          "hierarquiaPai": {
            
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
          "hierarquiaPai": {
            "ativo": true,
            "hierarquia": [
              {}
            ],
            "hierarquiaPai": {
              
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
            "nome": "Diogo Martins",
            "tipoHierarquia": "Diretor de TI",
            "uuid": 1,
            "uuidCedente": 0,
            "uuidPlataforma": 0,
            "uuidUsuario": 0
          },
          "nome": "Thiago Brito",
          "tipoHierarquia": "Desenvolvedor Front-End",
          "uuid": 2,
          "uuidCedente": 0,
          "uuidPlataforma": 0,
          "uuidUsuario": 0
        }
      ];


      // apiComercial.getHierarquias().then(
      //   function (res) {
      //     $scope.hierarquias = res.data;
      //   },
      //   function (err) {
      //     toaster.pop('error','Hierarquias',err.statusText)
      //   }
      // )
    }
  ])