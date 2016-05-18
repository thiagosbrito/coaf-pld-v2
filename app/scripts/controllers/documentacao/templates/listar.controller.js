'use strict';

angular.module('wbaApp')
  .controller('TemplatesListarController', [
    '$scope',
    '$state',
    '$stateParams',
    'toaster',
    '$modal',
    'apiEmpresas',
    'apiOperacoes',
    'apiDocumentacao',
    'uuid4',
    'SweetAlert',
    function ($scope, $state, $stateParams, toaster, $modal, apiEmpresas, apiOperacoes, apiDocumentacao, uuid4, SweetAlert) {

      $scope.getCarteiras = function () {
        apiOperacoes.getCarteiras().then(
          function (res) {
            $scope.carteiras = res.data;
          }
        )
      }();
      $scope.getTemplates = function () {
        apiDocumentacao.getTemplates().then(
          function (res) {
            $scope.templates = res.data;
            angular.forEach($scope.templates, function (value) {
              value.uuidCarteira = _.findWhere($scope.carteiras, {uuid: value.uuidCarteira});
            });
          },
          function (err) {
            toaster.pop('error','Templates',err.statusText)
          }
        )
      };
      $scope.getTemplates();

      $scope.novoTemplate = function () {
        var modalInstance = $modal.open({
          templateUrl: 'views/wba/documentacao/templates/modal-novo-template.html',
          resolve: {
            carteiras: function () {
              return apiOperacoes.getCarteiras().then(
                function (res) {
                  return res.data;
                }
              )
            },
            empresas: function () {
              return apiEmpresas.getAll().then(
                function (res) {
                  return res.data;
                }
              )
            }
          },
          controller: function ($scope, $modalInstance, carteiras, empresas) {
            $scope.empresas = empresas;
            $scope.carteiras = carteiras;

            $scope.save = function (item) {
              $modalInstance.close(item);
            };

            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };

            $scope.aceLoaded = function (_editor) {
              // console.log(_editor);
            };

            $scope.aceChanged = function(e) {
              // console.log(e);
            };
          }
        });


        modalInstance.result.then(
          function (item) {
            if(item.uuidCarteira)
              item.uuidCarteira = item.uuidCarteira.uuid;
            if(item.uuidPessoa)
              // item.uuidPessoa = item.uuidPessoa.id.toString();
              item.uuidPessoa = uuid4.generate();
            apiDocumentacao.addTemplate(item).then(
              function (res) {
                toaster.pop('success','Templates','Template criado com sucesso');
                $scope.getTemplates();
              },
              function (err) {
                toaster.pop('error','Templates',err.statusText);
              }
            )
          }
        );
      }
      $scope.editTemplate = function (template) {
        var modalInstance = $modal.open({
          templateUrl: 'views/wba/documentacao/templates/modal-edit-template.html',
          resolve: {
            template: function () {
              return template
            },
            carteiras: function () {
              return apiOperacoes.getCarteiras().then(
                function (res) {
                  return res.data;
                }
              )
            },
            empresas: function () {
              return apiEmpresas.getAll().then(
                function (res) {
                  return res.data;
                }
              )
            }
          },
          controller: function ($scope, $modalInstance, carteiras, empresas, template) {
            $scope.empresas = empresas;
            $scope.carteiras = carteiras;

            $scope.template = template;

            $scope.update = function (item) {
              $modalInstance.close(item);
            };

            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };

            $scope.aceLoaded = function (_editor) {
              // console.log(_editor);
            };

            $scope.aceChanged = function(e) {
              // console.log(e);
            };
          }
        });


        modalInstance.result.then(
          function (item) {
            if(item.uuidCarteira)
              item.uuidCarteira = item.uuidCarteira.uuid;
            apiDocumentacao.updateTemplate(item).then(
              function (res) {
                toaster.pop('success','Templates','Template atualizado com sucesso');
                $scope.getTemplates();
              },
              function (err) {
                toaster.pop('error','Templates',err.statusText);
              }
            )
          }
        );
      }

      $scope.deleteTemplate = function (template) {
        SweetAlert.swal({
            title: "Você tem certeza?",
            text: "Se prosseguir essa operação não poderá ser desfeita",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Prosseguir",
            closeOnConfirm: false
        },
        function(isConfirm){
          if(isConfirm) {
            apiDocumentacao.deleteTemplate(template).then(
              function (res) {
                SweetAlert.swal("Template","Arquivo excluído com sucesso","success");
                $scope.getTemplates();
              },
              function (err) {
                SweetAlert.swal("Template","Seu arquivo não foi excluído.","error");
              }
            )
          }
        });
      };

    }
  ]);
