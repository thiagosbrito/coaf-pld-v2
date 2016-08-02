'use strict';

angular.module('wbaApp')
  .controller('AnalisesCedentesNovoController',[
    '$scope',
    '$rootScope',
    '$state',
    '$stateParams',
    'apiAnalizes',
    'apiCustomers',
    'apiPolicies',
    'toaster',
    'Session',
    function ($scope, $rootScope, $state, $stateParams, apiAnalizes, apiCustomers, apiPolicies, toaster, Session) {

      $scope.user = Session.getUser();


      $scope.analysis = {};
      $scope.showLoading = true;
      $scope.policies = [];

      $scope.startDate = moment().format('DD-MM-YYYY');
      $scope.endDate = moment().format('DD-MM-YYYY');
      
      $scope.today = function() {
        $scope.dt = new Date();
      };
      $scope.today();
      $scope.clear = function () {
        $scope.dt = null;
      };
      $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
      };
      $scope.toggleMin();
      $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
      };
      $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
      };
      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = $scope.formats[0];

      $scope.getPolicies = function () {
        apiPolicies.getPoliciesByCustomerId($scope.user.customerPolicy.id).then(
          function (res) {
            $scope.policies.push(res.data);
            $scope.analysis.policy = res.data;
            $scope.showLoading = false;
          },
          function (err) {
            toaster.pop('error','Política',err.statusText);
          }
        )
      }();

      $scope.getCustomers = function () {
        apiCustomers.getCustomers().then(
          function (res) {
            $scope.customers = res.data;
          },
          function (err) {
            toaster.pop('error','Cedentes',err.statusText);
          }     
          )
      }();

      $scope.analysis.answers = [];

      $scope.selectedOptions = '';

      $scope.addAnswer = function (choice, question) {

        var exists = false;

        angular.forEach($scope.analysis.answers, function (answer) {
                if (answer.question.id == question.id) {
                    exists = true;
                    answer.choices = [];
                    answer.choices.push(choice);
                }
            }
        );

        if (!exists) {
            var answer = {id:null, question:null, choices:[]}
            answer.question = question;
            answer.choices.push(choice);
            $scope.analysis.answers.push(answer);
        }
      };

      $scope.save = function () {
        $scope.analysis.buyingEntity = $rootScope.loggedBuyingEntity;
        apiAnalizes.save($scope.analysis).then(
          function (res) {
            toaster.pop('success','Análise de Operação','Análise cadastrada com sucesso');
            $state.go('coafPld.analises.operacoes.listar');
          },
          function (err) {
            toaster.pop('error','Análise de Operação',err.statusText);
          }
        )
      };

    }
  ]);