'use strict';

angular.module('wbaApp')
  .controller('OrganizacoesUsuariosNovoController',[
    '$scope',
    '$state',
    'apiComercial',
    function ($scope, $state, apiComercial) {

      $scope.roles = [
        {
          id: 1,
          nome: 'Role 1'
        },
        {
          id: 2,
          nome: 'Role 2'
        },
        {
          id: 3,
          nome: 'Role 3'
        }
      ];

      apiComercial.getHierarquias().then(
        function (res) {
          console.log(res.data);
          $scope.hierarquias = res.data;
        }
      );

      $scope.grupos = [
        {
          id: 1,
          nome: 'Grupo 1'
        },
        {
          id: 2,
          nome: 'Grupo 2'
        },
        {
          id: 3,
          nome: 'Grupo 3'
        }
      ]

    }
  ])
  .filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      var keys = Object.keys(props);
        
      items.forEach(function(item) {
        var itemMatches = false;

        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  };
});