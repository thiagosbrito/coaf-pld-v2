'use strict';
angular.module('wbaApp')
  .controller('WorkflowListarController',[
    '$scope',
    '$state',
    '$stateParams',
    'apiOperacoes',
    '$modal',
    'toaster',
    'SweetAlert',
    'Upload',
    'baseUrl',
    '$timeout',
    function ($scope, $state, $stateParams, apiOperacoes, $modal, toaster, SweetAlert, Upload, baseUrl, $timeout) {

      $scope.getWorkflows = function () {
        apiOperacoes.getWorkflows().then(
          function (res) {
            $scope.workflows = res.data;
          },
          function (err) {
            toaster.pop('error','Workflows',err.statusText)
          }
        )
      };

      $scope.getWorkflows();

      $scope.getWorkflowInfo = function (id) {
        var modalInstance = $modal.open({
          templateUrl: 'views/wba/operacoes/workflow/modal-info.html',
          resolve: {
            info: function (){
              return apiOperacoes.getWorkflowById(id).then(
                function (res) {
                  return res.data;
                }
              )
            }
          },
          controller: function ($scope, $modalInstance, info) {

            $scope.info = info;
            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };
          }
        });
      };
      $scope.getWorkflowImage = function (id) {
        var modalInstance = $modal.open({
          templateUrl: 'views/wba/operacoes/workflow/modal-image.html',
          size: 'lg',
          controller: function ($scope, $modalInstance, baseUrl) {
            $scope.image = baseUrl.apiOperacoes + '/workflows/' + id + '/imagem';
            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };
          }
        });
      };
      $scope.uploadFiles = function(file, errFiles) {
        var name = file.name;
        if(/.*bpmn(20)?\.xml$/.exec(name)) {
          $scope.f = file;
          $scope.errFile = errFiles && errFiles[0];
          if (file) {
            file.upload = Upload.upload({
              url: baseUrl.apiOperacoes + '/workflows/deploy',
              data: {file: file}
            });

            file.upload.then(function (response) {
              $timeout(function () {
                file.result = response.data;
                toaster.pop('success','Workflow','Upload de arquivo efetuado com sucesso');
                $scope.getWorkflows();
              });
            }, function (response) {
              if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
              file.progress = Math.min(100, parseInt(100.0 *
                evt.loaded / evt.total));
            });
          }
        }
        else {
          SweetAlert.swal("OPS! ", "O nome do arquivo não é valido, ele precisa ter a extensão .bpmn20.xml, corrija e tente novamente.", "error");
        }

      }
    }
  ]);
