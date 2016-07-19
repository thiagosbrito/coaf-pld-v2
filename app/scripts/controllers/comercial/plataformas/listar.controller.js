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
      $scope.getHierarquias = function () {
        apiComercial.getHierarquias().then(
          function (res) {
            $scope.hierarquias = res.data
          })
      }();

      $scope.setParent = function (obj) {
        obj.pai = _.findWhere($scope.hierarquias, {uuid: obj.hierarquiaPai});
        obj.pai = _.omit(obj.pai,'__children__');
        obj.pai = _.omit(obj.pai,'__dept__');
        obj.pai = _.omit(obj.pai,'__expanded__');
        obj.pai = _.omit(obj.pai,'__hashKey__');
        obj.pai = _.omit(obj.pai,'__icon__');
        obj.pai = _.omit(obj.pai,'__index__');
        obj.pai = _.omit(obj.pai,'__index_real__');
        obj.pai = _.omit(obj.pai,'__level__');
        obj.pai = _.omit(obj.pai,'__parent__');
        obj.pai = _.omit(obj.pai,'__parent_real__')
        obj.pai = _.omit(obj.pai,'__selected__');
        obj.pai = _.omit(obj.pai,'__uid__');
        obj.pai = _.omit(obj.pai,'__visible__');
        return obj;
      };

      $scope.getHierarquiasIntoPlatform = function (platform) {
        platform.hierarquias = [];
        apiComercial.getHierarquiaByPlatformId(platform.uuid).then(
          function (res) {
            if(res) {

              platform.hierarquias.push(res.data);
              platform.tree = [];

              var getComissao = function (item) {
                console.log(item);
              }

              var checkChildren = function (item) {
                  if(item.hierarquias) {
                    angular.forEach(item.hierarquias, function (value) {
                      value.hierarquiaPai = parseInt(value.hierarquiaPai);
                      platform.tree.push(value);
                      $scope.setParent(value);
                      if(value.hierarquias) {
                        checkChildren(value);
                      }
                      else {
                        return false
                      }
                    })
                  }
              };

              checkChildren(platform);
              getComissao(platform);

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
          controller: function ($scope, $modalInstance, Upload, $timeout, plataforma, cedentes, apiComercial) {
            $scope.cedentes = {};
            $scope.cedentes.lista = cedentes;
            $scope.cedentes.selectedCedentes = [];
            $scope.plataforma = plataforma;
            $scope.tree_data = plataforma.tree;


            $scope.getData = function (){
              apiComercial.getPlataformas().then(
                function (res) {
                  $scope.plataformas = res.data;
                }
              );
              apiComercial.getHierarquias().then(
                function (res) {
                  $scope.hierarquias = res.data;
                }
              )
            }();
            $scope.isReading = false;
            $scope.isEditing = true;
            $scope.isAdding = true;

            $scope.getComissao = function (item) {
              apiComercial.getComissaoByHierarquiaId(item.uuid).then(
                function (res) {
                  console.log(res);
                },
                function (err) {
                  console.log(err);
                }
              );
              item.comissao = 0;
              console.log(item);
              return item;
            };

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
                $scope.getComissao(p);
                data.hrqs.push(p);
                if(p.hierarquias) {
                  angular.forEach(p.hierarquias, function(h) {
                    h.comissao = 0;
                    $scope.getComissao(h);
                    data.hrqs.push(h);
                    if(h.hierarquias) {
                      angular.forEach(h.hierarquias, function (c){
                        $scope.getComissao(c);
                        data.hrqs.push(c)
                      });
                    }
                  });
                }
              });
              return data;
            };

            $scope.treatData(plataforma);

            var tree;
            $scope.my_tree = tree = {};
            $scope.expanding_property = {
              field: 'nome',
              displayName: 'Nome'
            };
            $scope.definition_cols = [

              {
                field: "tipoHierarquia",
                displayName: "Tipo de Hierarquia",
                sortable : true,
                sortingType : "string"
              },
              {
                field: "comissao",
                displayName: "Comissão",
                cellTemplate: "<span ng-bind-html=\"(node.comissao) + '%'\"></span>"
              },
              {
                field: "ativo",
                displayName: "Ativo",
                cellTemplate: "<i class='fa {{node.ativo | ativo}}'></i>",
                cellTemplateScope: {
                  click: function(data) {         // this works too: $scope.someMethod;
                    console.log(data);
                  }
                }
              },
              {
                displayName: "",
                cellTemplate: "<div class='btn-group'>" + 
                                "<button class='btn btn-sm btn-primary' ng-click='editNode(node)' tooltip='Editar Hierarquia'>" +
                                  "<i class='fa fa-pencil'></i>" +
                                "</button>" +
                                "<button class='btn btn-sm btn-info' ng-click='addComissao(node)' tooltip='Comissão Hierarquia'>" +
                                  "<i class='fa fa-dollar'></i>" +
                                "</button>" +
                              "</div>"
              }
            ];

            $scope.addComissao = function (node) {
              $scope.isAdding = false;
              $scope.isEditing = true;
              $scope.isReading = true;
              $scope.hierarquia = node;
              console.log(node)
            }
            $scope.editNode = function (node) {
              $scope.isReading = true;
              $scope.isAdding = true;
              $scope.isEditing = false;
              $scope.hierarquia = node;

              if ($scope.hierarquia.uuidsCedente.length > 0) {
                angular.forEach($scope.hierarquia.uuidsCedente, function (item) {
                  var ced = _.findWhere($scope.cedentes.lista, {id: item});
                  ced.old = true;
                  $scope.cedentes.selectedCedentes.push(ced);
                })
              };

              console.log($scope.cedentes.selectedCedentes);
              
            };

            $scope.cancelEditing = function () {
              $scope.isReading = false;
              $scope.isEditing = true;
              $scope.isAdding = true;
              $scope.hierarquia = null;
            };
            $scope.changedValue = function (item, model) {
              console.log(item, model);
            };

            $scope.addComissaoHierarquia = function (comissao) {
              console.log(comissao);
            };

            $scope.updateHierarquia = function (hierarquia) {
              hierarquia = _.omit(hierarquia,'__children__');
              hierarquia = _.omit(hierarquia,'__dept__');
              hierarquia = _.omit(hierarquia,'__expanded__');
              hierarquia = _.omit(hierarquia,'__hashKey__');
              hierarquia = _.omit(hierarquia,'__icon__');
              hierarquia = _.omit(hierarquia,'__index__');
              hierarquia = _.omit(hierarquia,'__index_real__');
              hierarquia = _.omit(hierarquia,'__level__');
              hierarquia = _.omit(hierarquia,'__parent__');
              hierarquia = _.omit(hierarquia,'__parent_real__');
              hierarquia = _.omit(hierarquia,'__selected__');
              hierarquia = _.omit(hierarquia,'__uid__');
              hierarquia = _.omit(hierarquia,'__visible__');
              hierarquia.hierarquia = hierarquia.hierarquias;
              hierarquia = _.omit(hierarquia,'hierarquias');
              hierarquia = _.omit(hierarquia,'uuidsCedente');
              hierarquia.uuidCedente = null;
              hierarquia.hierarquiaPai = hierarquia.pai;
              hierarquia = _.omit(hierarquia,'pai');
              // hierarquia = _.omit(hierarquia,'uuid');
              if ($scope.cedentes.selectedCedentes.length > 0) {
                $scope.cedentes.selectedCedentes = _.without($scope.cedentes.selectedCedentes, {old: true});
                console.log($scope.cedentes.selectedCedentes);
                var cedentes = $scope.cedentes.selectedCedentes;
                // hierarquia = _.omit(hierarquia, 'cedentes');
                apiComercial.saveHierarquia(hierarquia).then(
                  function (res) {
                    toaster.pop('success','Hierarquias','Hierarquia cadastrada com sucesso');
                    $scope.getPlataformas();
                  },
                  function (err) {
                    toaster.pop('error','Hierarquias',err.statusText);
                  }
                );
                angular.forEach(cedentes, function (cen) {
                  if (cen.old) {
                    return false
                  }
                  else {
                    apiComercial.adicionarCedente(hierarquia.uuid, cen.id).then(
                      function (res) {
                        toaster.pop('success','Cedentes','Cedente adicionado à Hierarquia com sucesso')
                      },
                      function (err) {
                        toaster.pop('error','Cedentes',err.statusText);
                      }
                    )
                  }
                })
              }
              else {
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
              // apiComercial.updateHierarquia(hierarquia).then(
              //   function (res) {
              //     toaster.pop('success','Atualizar Hierarquia','Dados alterados com sucesso');
              //     $scope.isReading = false;
              //     $scope.isEditing = true;
              //     $scope.hierarquia = null;
              //   },
              //   function (err) {
              //     toaster.pop('error','Atualizar Hierarquia',err.statusText);
              //   }
              // )
            }

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
            if (item.cedentes.length > 0) {
              var cedentes = item.cedentes;
              item = _.omit(item, 'cedentes');
              apiComercial.saveHierarquia(item).then(
                function (res) {
                  toaster.pop('success','Hierarquias','Hierarquia cadastrada com sucesso');
                  $scope.getPlataformas();
                },
                function (err) {
                  toaster.pop('error','Hierarquias',err.statusText);
                }
              );
              angular.forEach(cedentes, function (cen) {
                apiComercial.adicionarCedente(item.uuid, cen.id).then(
                  function (res) {
                    console.log(res)
                  },
                  function (err) {
                    console.log(err)
                  }
                  )
              })
            }
            else {
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
            $scope.cedentes = {};
            $scope.cedentes.lista = cedentes;
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
