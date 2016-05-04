'use strict';
angular.module('wbaApp')
  .controller('HierarquiasListarController',[
    '$scope',
    '$state',
    '$stateParams',
    'toaster',
    'SweetAlert',
    'apiComercial',
    'hierarquias',
    '$modal',
    '$log',
    function ($scope, $state, $stateParams, toaster, SweetAlert, apiComercial, hierarquias, $modal, $log) {

      $scope.hierarquias = hierarquias;

      var tree;
      $scope.data = [];

      if(hierarquias) {
        hierarquias = _.sortBy(hierarquias, 'uuid');
        angular.forEach(hierarquias, function (item) {
          if(item.hierarquiaPai) {
            var idPai = item.hierarquiaPai.uuid;
            item.parentId = idPai;
            item.parentNome = item.hierarquiaPai.nome;
          }
          else {
            item.parentId = null;
            item.parentNome = null;
          }

          var i = _.omit(item, 'hierarquiaPai');
          $scope.data.push(i);

        });

        $scope.tree_data = getTree($scope.data, 'uuid', 'parentId');
      }

      $scope.my_tree = tree = {};

      $scope.expanding_property = "nome";

      $scope.definition_cols = [

        {
          field: "tipoHierarquia",
          displayName: "tipo de hierarquia",
          sortable : true,
          sortingType : "string"
        },
        {
          field: "parentNome",
          displayName: "hierarquia pai",
          sortable: true,
          sortingType: "string"
        },
        {
          field: "ativo",
          displayName: "ativo",
          cellTemplate: '<i class="fa" ng-class="{\'fa-check green\':{{row.branch[col.field]}}, \'fa-times red\': {{!row.branch[col.field]}}}"></i>',
          cellTemplateScope: {
            click: function(data) {         // this works too: $scope.someMethod;
              console.log(data);
            }
          }
        }
      ];
      $scope.my_tree_handler = function (branch) {
        $state.go('wba.comercial.hierarquias.editar',{hierarquiaId: branch.uuid});
      }

      function getTree(data, primaryIdName, parentIdName) {
        if (!data || data.length == 0 || !primaryIdName || !parentIdName)
          return [];

        var tree = [],
          rootIds = [],
          item = data[0],
          primaryKey = item[primaryIdName],
          treeObjs = {},
          parentId,
          parent,
          len = data.length,
          i = 0;

        while (i < len) {
          item = data[i++];
          primaryKey = item[primaryIdName];
          treeObjs[primaryKey] = item;
          parentId = item[parentIdName];

          if (parentId) {
            parent = treeObjs[parentId];

            if (parent.children) {
              parent.children.push(item);
            } else {
              parent.children = [item];
            }
          } else {
            rootIds.push(primaryKey);
          }
        }

        for (var i = 0; i < rootIds.length; i++) {
          tree.push(treeObjs[rootIds[i]]);
        };

        return tree;
      }

      $scope.newHierarchy = function () {
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: 'views/wba/comercial/hierarquias/nova-hierarquia.html',
          size: 'lg',
          resolve: {
            plataformas: function (apiComercial) {
              return apiComercial.getPlataformas().then(
                function (res) {
                  return res.data;
                }
              )
            },
            hierarquias: function () {
              return $scope.hierarquias;
            }
          },
          controller: function ($scope, $modalInstance, plataformas, $state, hierarquias) {
            $scope.hierarquias = hierarquias;
            $scope.plataformas = plataformas;
            $scope.close = function () {
              $modalInstance.dismiss('cancel');
            }

            $scope.save = function (item) {
              $modalInstance.close(item);
            }
          }
        });

        // modal para cadastro de representante
        modalInstance.result.then(
          function (item) {
            apiComercial.saveHierarquia(item).then(
              function (res) {
                toaster.pop('success','Hierarquia','Hierarquia salva com sucesso');
                $state.go($state.current, {}, {reload: true});
              },
              function (err) {
                toaster.pop('error','Hierarquia',err.statusText);
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
