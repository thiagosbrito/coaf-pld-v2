'use strict';

angular.module('wbaApp')
  .controller('EstadosConfirmacaoListarController',[
    '$scope',
    '$state',
    '$stateParams',
    'apiChecagem',
    '$modal',
    'SweetAlert',
    'toaster',
    function ($scope, $state, $stateParams, apiChecagem, $modal, SweetAlert, toaster){

      $scope.getEstados = function () {
        apiChecagem.getEstados().then(
          function (res) {
            $scope.estados = res.data._embedded.estados;
            angular.forEach($scope.estados, function (value) {
              value.uuid = value._links.self.href.split('/');
              value.uuid = value.uuid[value.uuid.length - 1];
            })
          },
          function (err) {
            toaster.pop('error','Estados de Confirmação')
          }
        )
      };
      $scope.getEstados();

      $scope.addEstado = function () {
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: 'views/wba/checagem/estados-confirmacao/modal-add-estado.html',
          controller: function ($scope, $modalInstance) {
            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };
            $scope.save = function (estado) {
              $modalInstance.close(estado);
            }
          }
        });
        modalInstance.result.then(
          function (estado) {
            apiChecagem.addEstado(estado).then(
              function (res) {
                toaster.pop('success','Estados de Confirmaçao','Estado cadastrado com sucesso');
                $scope.getEstados();
              },
              function (err) {
                toaster.pop('error','Estados de Confirmação',err.statusText)
              }
            )
          },
          function () {
            return false
          }
        )
      };
      $scope.updateEstado = function (estado) {
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: 'views/wba/checagem/estados-confirmacao/modal-update-estado.html',
          resolve: {
            estado: function () {
              return estado
            }
          },
          controller: function ($scope, $modalInstance, estado) {

            $scope.estado = estado;
            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };

            $scope.save = function (estado) {
              $modalInstance.close(estado);
            }
          }
        });

        modalInstance.result.then(
          function (estado) {
            apiChecagem.updateEstado(estado.uuid, estado).then(
              function (res) {
                toaster.pop('success','Estados de Confirmaçao','Estado atualizado com sucesso');
              },
              function (err) {
                toaster.pop('error','Estados de Confirmação',err.statusText)
              }
            )
          },
          function () {
            return false
          }
        )
      };
      $scope.deleteEstado = function (id) {
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
            apiChecagem.deleteEstado(id).then(
              function (res) {
                SweetAlert.swal("Deleted!", "Your imaginary file has been deleted.", "success");
                $scope.getEstados();
              },
              function (err) {
                toaster.pop('error','Estados de Confirmação',err.statusText)
              }
            )
          } else {
            SweetAlert.swal("Cancelado", "Seu item permanece intacto", "error");
          }
        });
      };
    }
  ]);
