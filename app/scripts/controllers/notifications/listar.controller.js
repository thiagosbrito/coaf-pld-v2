'use strict';

angular.module('wbaApp')
  .controller('NotificationsListarController',[
    '$scope',
    '$state',
    'apiNotifications',
    'SweetAlert',
    'toaster',
    'notifications',
    '$modal',
    function ($scope, $state, apiNotifications, SweetAlert, toaster, notifications, $modal) {
      
      $scope.filtro = {};
      $scope.currentPage = 0;
      $scope.pageSize = 8;

      $scope.notifications = notifications;
      
      $scope.loteDate = new Date();

      $scope.numberOfPages = function() {
        return Math.ceil($scope.notifications.length / $scope.pageSize);
      };

      $scope.retificar = function() {

        if ($scope.selectToRetificate() == '') {
          return;
        }
        
        $scope.appletHtml = "<applet codebase='/applet' code='br.com.wcj.coaf.applet.Signer.java'" +
          " archive='applet-coaf.jar'" +
          " width='550px' height='150px' name='Applet de assinatura de xml'> " + 
          "<param name='list' value='" + $scope.selectToRetificate() + "' />" +
          "<param name='operation' value='2' />" + 
        " </applet>";

        var modalInstance = $modal.open({

          templateUrl: 'views/coaf-pld/notifications/modal-applet.html',
          resolve: {
            appletHtml: function () {
              return $scope.appletHtml;
            }
          },
          controller: function ($modalInstance, $scope, appletHtml) {
            $scope.appletHtml = appletHtml;

            $scope.save = function (item) {
              $modalInstance.close(item)
            }

            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            }
          }
        });

        modalInstance.result.then(
          function (item) {
            
            apiCadastro.addCedente(item).then(
              function (res) {
                toaster.pop('success','Cadastro Cedente','Cadastro realizado com sucesso');
              },
              function (err) {
                toaster.pop('error','Cadastro Cedente',err.statusText);
              }
            )
          }, 
          function () {
            return false
          }
        );
      };

      $scope.openAppletModal = function() {

        if ($scope.selectedIds() == '') {
          return;
        }

        $scope.appletHtml = "<applet codebase='/applet' code='br.com.wcj.coaf.applet.Signer.java'" +
          " archive='applet-coaf.jar'" +
          " width='550px' height='150px' name='Applet de assinatura de xml'> " + 
          "<param name='list' value='" + $scope.selectedIds() + "' />" +
          "<param name='operation' value='0' />" + 
        " </applet>";


        var dialog = $dialog.dialog({
          modalFade : false,
          resolve: {
            appletHtml: $scope.appletHtml
          }
        });
        
        
        dialog.open('/app/dialogs/applet.html', 'AppletModalCtrl').then(
            function(result) {
              $scope.notifications = Notification.query(function(result) {
                $location.url('/notifications');
              });
            });
      };

      $scope.consultarLote = function() {


        $scope.appletHtml = "<applet codebase='/applet' code='br.com.wcj.coaf.applet.Signer.java'" +
          " archive='applet-coaf.jar'" +
          " width='550px' height='150px' name='Applet de assinatura de xml'> " + 
          "<param name='list' value='" + $scope.readDate() + "' />" +
          "<param name='operation' value='1' />" + 
        " </applet>";


        var dialog = $dialog.dialog({
          modalFade : false,
          resolve: {
            appletHtml: $scope.appletHtml
          }
        });


        dialog.open('/app/dialogs/applet.html', 'AppletModalCtrl').then(
            function(result) {
              $scope.notifications = Notification.query(function(result) {
                $location.url('/notifications');
              });
            });
      };

      $scope.selectToRetificate = function() {
        var ids = "";

        angular.forEach($scope.notifications, function(notification) {
          if (notification.selected) {
            ids += notification.id + ";";
          }
        });

        return ids.length > 0 ? ids.substring(0, ids.length - 1) : "";

      };

      $scope.selectedIds = function() {

        var ids = "";

        angular.forEach($scope.notifications, function(notification) {

          if (notification.selected) {
            ids += notification.id + ";";
          }

        });

        return ids.length > 0 ? ids.substring(0, ids.length - 1) : "";
      };

      $scope.readDate = function() {
        d = $scope.loteDate;

        return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();

      };

      $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
      };

    }
  ])