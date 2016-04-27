'use strict';

angular.module('wbaApp')
  .controller('DigitacaoOperacaoController',[
    '$scope',
    '$state',
    '$stateParams',
    'operacao',
    'SweetAlert',
    'apiOperacoes',
    function ($scope, $state, $stateParams, operacao, SweetAlert, apiOperacoes) {

      $scope.operacao = operacao;

      /*$scope.popoverContent = "<ul class=\"nav nav-pills nav-stacked\">\n" +
        "<li><button class=\"btn btn-sm btn-primary btn-block\" ng-click=\"editarTitulo(rec)\"><i class=\"fa fa-pencil pull-left\"></i> Editar</button></li> \n" +
        "<li><button class=\"btn btn-sm btn-success btn-block\" ng-click=\"aprovarTitulo(rec)\"><i class=\"fa fa-check pull-left\"></i> Aprovar</button></li> \n " +
        "<li><button class=\"btn btn-sm btn-warning btn-block\" ng-click=\"reprovarTitulo(rec)\"><i class=\"fa fa-times pull-left\"></i> Reprovar</button></li> \n" +
        "<li><button class=\"btn btn-sm btn-danger btn-block\" ng-click=\"excluirTitulo(rec)\"><i class=\"fa fa-trash-o pull-left\"></i> Excluir</button></li> \n" +
        "</ul>";

      $scope.editarTitulo = function () {
        alert('Editar');
      }
      $scope.aprovarTitulo = function () {
        alert('Aprovar');
      }
      $scope.reprovarTitulo = function () {
        alert('Reprovar');
      }
      $scope.excluirTitulo = function () {
        alert('Excluir');
      }*/

      $scope.changeTitStatus = function (item) {
        SweetAlert.swal({
          title: "Você tem certeza?",
          text: "Para confirmar clique em Prosseguir",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Prosseguir",
          closeOnConfirm: true
        },
        function(isConfirm){
          if (isConfirm) {
            apiOperacoes.updateOperacao(item).then(
              function (res) {
                toaster.pop('success','Operações','Operação alterada com sucesso!');
              },
              function (err) {
                toaster.pop('error','Operações',err.statusText);
              }
            )
          }
        });
      }

    }

  ])
  .controller('digitacaoPopoverController',[
    '$scope',
    function ($scope) {
      $scope.editarTitulo = function (item) {
        console.log(item);
      }
    }
  ])
