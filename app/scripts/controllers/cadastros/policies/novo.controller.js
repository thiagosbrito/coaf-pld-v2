'use strict';

angular.module('wbaApp')
  .controller('CadastroPoliciesNovoController',[
    '$scope',
    '$state',
    '$stateParams',
    'apiPolicies',
    'apiCadastro',
    'toaster',
    'SweetAlert',
    'items',
    'itemsOperacao',
    'policies',
    'Session',
    function ($scope, $state, $stateParams, apiPolicies, apiCadastro, toaster, SweetAlert, items, itemsOperacao, policies, Session){
      
      $scope.policyToCopy = {};
      $scope.items = items;
      $scope.itemsOperacao = itemsOperacao;
      $scope.existingPolicies = policies;
      $scope.user = Session.getUser();

      $scope.pol = {};
      $scope.pol.questions = [];

      $scope.itemsRisk = _.memoize(function(){
        var policy = $scope.policyToCopy;
        var items = [
          {
            id:'',
            name:'Selecione o tipo da politica'
          }
        ];

        if(policy.policyType == 'OPERATION_ANALYSIS'){
          items = [
            {
              id:'NO_SUSPICION',
              name:'Sem suspeição'
            },
            {
              id:'MEDIUM_SUSPICION',
              name:'Suspeição Média'
            },
            {
              id:'HIGH_SUSPICION',
              name:'Suspeição Alta'
            },
            {
              id:'MAX_SUSPICION',
              name:'Suspeição Máxima'
            }
          ];
          return items;

        }
        else if(policy.policyType == 'CUSTOMER_ANALYSIS'){
          items = [
            {
              id:'LOW_RISK',
              name:'Risco Baixo'},
            {
              id:'MEDIUM_RISK',
              name:'Risco Médio'},
            {
              id:'HIGH_RISK',
              name:'Risco Máximo'
            }
          ];
          return items;
        }
      });

      $scope.addQuestion = function (type) {
          var question = {title:'', questionType:type, choices:[]}
          $scope.pol.questions.push(question);
      }

      $scope.removeQuestion = function (question) {
          $scope.pol.questions.splice($scope.pol.questions.indexOf(question), 1);
      }

      $scope.addChoice = function (question) {
          var choice = {risk:'', description:''}
          question.choices.push(choice);
      }

      $scope.removeChoice = function (question, choice) {
          question.choices.splice(question.choices.indexOf(choice), 1);
      };
      
      $scope.isNew = function() {
        return true;
      };
      
      $scope.copyPolicy = function() {
        $scope.pol.questions = [];
        angular.copy($scope.policyToCopy,$scope.pol);
        angular.forEach($scope.pol.questions,function(question) {
          question.id=null;
          angular.forEach(question.choices,function(choice) {
            choice.id=null;
          });
        });
      };
      
      // $scope.$watch("policyToCopy",function(value) {
      //   if (value) {
      //     $scope.copyPolicy();
      //   } else {
      //     $scope.pol.questions = [];
      //   }
      // });

      $scope.save = function () {
        console.log($scope.pol);
        apiCadastro.addPolicy($scope.pol).then(
          function (res) {
            toaster.pop('success','Cadastro de Questões e Critérios de Risco','Cadastro efetuado com sucesso');
          },
          function (err) {
            toaster.pop('error','Cadastro de Questões e Critérios de Risco',err.statusText);
          }
        )
      }

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      }
    }
  ])