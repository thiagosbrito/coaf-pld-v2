'use strict';
angular.module('wbaApp')
  .controller('PlataformasListarController',[
    '$scope',
    '$state',
    '$stateParams',
    'toaster',
    'SweetAlert',
    'apiComercial',
    'apiEmpresas',
    '$TreeDnDConvert',
    '$modal',
    '$log',
    function ($scope, $state, $stateParams, toaster, SweetAlert, apiComercial, apiEmpresas, $TreeDnDConvert, $modal, $log) {

      $scope.plataformas = [];
      $scope.tree_data = [];

      $scope.getHierarquiasIntoPlatform = function (platform) {
        platform.hierarquias = [];
        apiComercial.getHierarquiaByPlatformId(platform.uuid).then(
          function (res) {
            if(res) {
              platform.hierarquias.push(res.data);
              platform.tree = [];

              var checkChildren = function (item) {
                  if(item.hierarquias) {
                    angular.forEach(item.hierarquias, function (value) {
                      value.hierarquiaPai = parseInt(value.hierarquiaPai);
                      platform.tree.push(value);
                      if(value.hierarquias) {
                        checkChildren(value);
                      }
                      else {
                        return false
                      }
                    })
                  }
              };

              angular.forEach(platform.hierarquias, function (v){
                platform.tree.push(v);
                angular.forEach(v.hierarquias, function(h) {
                  // checkChildren(h);
                  h.hierarquiaPai = parseInt(h.hierarquiaPai);
                  platform.tree.push(h);
                  angular.forEach(h.hierarquias, function (c) {
                    c.hierarquiaPai = parseInt(c.hierarquiaPai);
                    platform.tree.push(c);

                  })
                });
              });
              platform.tree = $TreeDnDConvert.line2tree(platform.tree, 'uuid', 'hierarquiaPai');
              return platform
            }
          }
        )
      };
      $scope.getPlataformas = function () {
        apiComercial.getPlataformas().then(
          function (res) {
            $scope.plataformas = res.data;
            angular.forEach($scope.plataformas, function (val, key){
              $scope.getHierarquiasIntoPlatform(val);
            });
          },
          function (err) {
            toaster.pop('error','Plataformas',err.statusText)
          }
        );
      };
      $scope.getPlataformas();


      $scope.editPlatform = function (platform) {
        var modalInstance = $modal.open({
          templateUrl: 'views/wba/comercial/plataformas/modal-editar-plataforma.html',
          size: 'lg',
          resolve: {
            plataforma: function (){
              return platform
            },
            cedentes: function () {
              return apiEmpresas.getEmpresaByType('CEDENTE').then(
                function (res) {
                  return res.data
                }
              )
            }
          },
          controller: function ($scope, $modalInstance, Upload, $timeout, plataforma, cedentes) {

            $scope.$callbacks = {
              // function accept called when item Drapping move-over target
              accept:      function (scopeDrag, scopeTarget, align) {
                return true;
              },

              beforeDrag:  function (scopeDrag) {
                return true;
              },
              dropped:     function (info, accepted) {
                console.log(info);
                return false;
              },
              dragStart:   function (event) {},
              dragMove:    function (event) {},
              dragStop:    function (event, skiped) {

              },
              beforeDrop:  function (event) {
                return true;
              },
              calsIndent:  function (level) {
                if (level - 1 < 1) {
                  return $scope.indent_plus + ($scope.indent_unit ? $scope.indent_unit : 'px');
                } else {
                  return ($scope.indent * (level - 1)) + $scope.indent_plus + ($scope.indent_unit ? $scope.indent_unit : 'px');
                }
              },
              dragEnabled: function () {
                return $scope.dragEnabled;
              }
            };

            $scope.treatData = function (data) {
              data.hrqs = [];
              angular.forEach(data.hierarquias, function (p){
                data.hrqs.push(p);
                if(p.hierarquias) {
                  angular.forEach(p.hierarquias, function(h) {
                    data.hrqs.push(h);
                    if(h.hierarquias) {
                      angular.forEach(h.hierarquias, function (c){
                        data.hrqs.push(c)
                      });
                    }
                  });
                }
              });
              console.log(data);
              return data;
            };
            $scope.cedentes = cedentes;
            $scope.plataforma = plataforma;
            $scope.tree_data = plataforma.tree;
            $scope.treatData(plataforma);
            var tree;
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
                field: "ativo",
                displayName: "ativo",
                cellTemplate: "<i class='fa {{node.ativo | ativo}}'></i>",
                cellTemplateScope: {
                  click: function(data) {         // this works too: $scope.someMethod;
                    console.log(data);
                  }
                }
              }
            ];

            $scope.save = function (item) {
              $modalInstance.close(item);
            };

            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };

            $scope.my_tree_handler = function (branch) {
              $state.go('wba.comercial.hierarquias.editar',{hierarquiaId: branch.uuid});
            }
          }
        });
        modalInstance.result.then(
          function (item) {
            apiComercial.saveHierarquia(item).then(
              function (res) {
                toaster.pop('success','Hierarquias','Hierarquia cadastrada com sucesso');
                $scope.getPlataformas();
              },
              function (err) {
                toaster.pop('error','Hierarquias',err.statusText);
              }
            )
          }
        );
      };

      $scope.items = [];
      $scope.removeProperties = function (item) {
        item = _.omit(item, '__dept__');
        item = _.omit(item, '__expanded__');
        item = _.omit(item, '__hashKey__');
        item = _.omit(item, '__icon__');
        item = _.omit(item, '__index__');
        item = _.omit(item, '__index_real__');
        item = _.omit(item, '__level__');
        item = _.omit(item, '__parent__');
        item = _.omit(item, '__parent_real__');
        item = _.omit(item, '__uid__');
        item = _.omit(item, '__visible__');

        return item;
      };
      $scope.treatReturnDataFromModal = function (data) {
        angular.forEach(data, function(value, key) {
          value = $scope.removeProperties(value);
          angular.forEach(value.__children__, function (v, k){
            v = $scope.removeProperties(v);
            $scope.items.push(v);
            angular.forEach(v.__children__)
          });
          $scope.items.push(value);
        });
        console.log($scope.items);
      };
      $scope.openPanel = function (item) {
        item.open = !item.open
      };

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
          field: "ativo",
          displayName: "ativo",
          cellTemplate: "<i class='fa {{node.ativo | ativo}}'></i>",
          cellTemplateScope: {
            click: function(e, d) {         // this works too: $scope.someMethod;
              console.log(e, d);
            }
          }
        }
      ];

      $scope.my_tree_handler = function (branch) {
        $state.go('wba.comercial.hierarquias.editar',{hierarquiaId: branch.uuid});
      }

      $scope.addHierarquia = function (plataformaId) {
        console.log(plataformaId);
        var modalInstance = $modal.open({
          templateUrl: 'views/wba/comercial/plataformas/modal-nova-hierarquia.html',
          resolve: {
            plataformaId: function () {
              return plataformaId
            },
            plataformas: function (){
              return apiComercial.getPlataformas().then(
                function (res) {
                  return res.data;
                }
              )
            },
            cedentes: function () {
              return apiEmpresas.getEmpresaByType('CEDENTE').then(
                function (res) {
                  return res.data
                }
              )
            },
            hierarquias: function () {
              return apiComercial.getHierarquiaByPlatformId(plataformaId).then(
                function (res) {
                  console.log(res.data);
                  return res.data
                }
              )
            }
          },
          controller: function ($scope, $modalInstance, plataformas, hierarquias, plataformaId, cedentes) {
            $scope.hierarquias = hierarquias;
            $scope.hierarquia = {};
            $scope.hierarquia.uuidPlataforma = plataformaId;
            $scope.plataformas = plataformas;
            $scope.cedentes = cedentes;
            $scope.salvarHierarquia = function (hierarquia) {
              $modalInstance.close(hierarquia);
            };

            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };

            $scope.hierarquias = hierarquias;
          }
        });
        modalInstance.result.then(
          function (item) {
            apiComercial.saveHierarquia(item).then(
              function (res) {
                toaster.pop('success','Hierarquia','Hierarquia cadastrada com sucesso');
                $scope.getPlataformas();
              },
              function (err) {
                toaster.pop('error','Hierarquia',err.statusText);
              }
            )
          }
        );
      }
    }
  ]);
