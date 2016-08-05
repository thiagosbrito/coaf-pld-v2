'use strict';
angular.module('wbaApp')
  .controller('CadastroUsuariosListarController',[
    '$scope',
    '$state',
    '$stateParams',
    'apiCadastro',
    'apiPermissions',
    '$modal',
    'toaster',
    'SweetAlert',
    'Session',
    'apiBuyingEntity',
    function ($scope, $state, $stateParams, apiCadastro, apiPermissions, $modal, toaster, SweetAlert, Session, apiBuyingEntity) {
      
      $scope.user = Session.getUser();

      $scope.getUsers = function () {
        apiCadastro.getUsuarios().then(
          function (res) {
            $scope.users = res.data;
          },
          function (err) {
            toaster.pop('error','Usuários',err.statusText);
          }
        )
      };

      $scope.getUsers();

      $scope.novo = function () {
        var modalInstance = $modal.open({

          templateUrl: 'views/coaf-pld/cadastros/usuarios/modal-novo.html',
          controller: function ($modalInstance, $scope, user, permissions, apiBuyingEntity) {
            

            $scope.allGroups = [];

            $scope.itemsBuyingEntity = [];
            $scope.user = {};
            $scope.permission = user.permissions;

            if ($scope.permission.systemAdmin) {
              apiBuyingEntity.getBuyingEntities().then(
                function (res) {
                  angular.forEach(res.data, function (buyingEntity) {
                    var item = {id:buyingEntity.id, name:buyingEntity.corporateName};
                    $scope.itemsBuyingEntity.push(item)
                  });

                  $scope.user.buyingEntity.id = $scope.itemsBuyingEntity[0].id;
                }
              )
            }

            angular.forEach(permissions, function(item) {
              $scope.allGroups.push({name:item.permission,description: item.description, $$hashKey:item.permission});
            });

            $scope.save = function (item) {
              $modalInstance.close(item)
            }

            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            }
          },
          resolve: {
            user:  function () {
              return $scope.user;
            },
            permissions: function () {
              return apiPermissions.getAllPermissions().then(
                function (permissions) {
                  return permissions.data;
                }
              )
            }
          }
        });

        modalInstance.result.then(
          function (item) {
            
            apiCadastro.addUsuario(item).then(
              function (res) {
                toaster.pop('success','Cadastro Usuários','Cadastro realizado com sucesso');
                $scope.getUsers();
              },
              function (err) {
                toaster.pop('error','Cadastro Usuários',err.status + ": " + err.message);
              }
            )
          }, 
          function () {
            return false
          }
        );
      };

      $scope.editar = function (id) {
        var modalInstance = $modal.open({

          templateUrl: 'views/coaf-pld/cadastros/usuarios/modal-editar.html',
          controller: function ($modalInstance, $scope, user, permissions, usuario) {

            $scope.allGroups = permissions;

            $scope.permission = user.permissions;
            $scope.user = usuario;

            $scope.changeSenha = function () {
              if(!$scope.editSenha) {
                $scope.editSenha = true;
              }
              else {
                $scope.editSenha = false;
              }
            };


            $scope.save = function (item) {
              $modalInstance.close(item)
            };

            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };
          },
          resolve: {
            usuario: function () {
              return apiCadastro.getUsuarioById(id).then(
                function (usuario) {
                  var dados = usuario.data;
                  var newGroups = [];
                  angular.forEach(dados.groups, function (group) {
                      var newGroup = {
                        name:group.name,
                        description:group.description,
                        $$hashKey:group.name
                      };
                      newGroups.push(newGroup);
                  });

                  dados.groups = newGroups;
                  return dados;
                }
              )
            },
            user:  function () {
              return $scope.user;
            },
            permissions: function () {
              return apiPermissions.getAllPermissions().then(
                function (permissions) {
                  var items = [];
                  angular.forEach(permissions.data, function(item) {
                    items.push({
                      name:item.name,
                      description: item.description,
                      $$hashKey:item.name
                    });
                  });
                  return items;
                }
              )
            }
          }
        });

        modalInstance.result.then(
          function (item) {
            
            apiCadastro.updateUsuario(item.login, item).then(
              function (res) {
                toaster.pop('success','Cadastro Usuários','Cadastro atualizado com sucesso');
                $scope.getUsers();
              },
              function (err) {
                toaster.pop('error','Cadastro Usuários',err.status + ": " + err.message);
              }
            )
          }, 
          function () {
            return false
          }
        );
      };
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
            apiCadastro.deleteUsuario(id).then(
              function (res) {
                SweetAlert.swal("Excluído!", "Seu registro foi excluído com sucesso", "success");
                $scope.getUsers();
              },
              function (err) {
                toaster.pop('error','Usuários',err.status + ": " + err.message);
              }
            )
          } else {
            SweetAlert.swal("Cancelado", "Seu item permanece intacto", "error");
          }
        });
      }

    }
    
  ]);