'use strict';

angular.module('wbaApp')
  .controller('CadastroPoliciesEditarController',[
    '$scope',
    '$state',
    '$stateParams',
    'apiCadastro',
    'toaster',
    'SweetAlert',
    'items',
    'itemsOperacao',
    function ($scope, $state, $stateParams, apiCadastro, toaster, SweetAlert, items, itemsOperacao) {

      $scope.items = items;
      $scope.itemsOperacao = itemsOperacao;

      $scope.getPolicy = function (id) {
        apiCadastro.getPolicyById(id).then(
          function (res) {
            $scope.pol = res.data;
          },
          function (err) {
            toaster.pop('error','Edição de Questãos e Classificação de Risco',err.statusText);
          }
        )
      };

      $scope.getPolicy($stateParams.policyId);


      $scope.itemsRisk = _.memoize(function(policy){

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
                      name:'Sem suspeição'},
                  {
                      id:'MEDIUM_SUSPICION',
                      name:'Suspeição Média'},
                  {
                      id:'HIGH_SUSPICION',
                      name:'Suspeição Alta'},
                  {
                      id:'MAX_SUSPICION',
                      name:'Suspeição Máxima'}
              ];

          }else if(policy.policyType == 'CUSTOMER_ANALYSIS'){
              items = [
                  {
                      id:'LOW_RISK',
                      name:'Risco Baixo'},
                  {
                      id:'MEDIUM_RISK',
                      name:'Risco Médio'},
                  {
                      id:'HIGH_RISK',
                      name:'Risco Máximo'}
              ];
          }

          return items;
      });

    }
  ]);