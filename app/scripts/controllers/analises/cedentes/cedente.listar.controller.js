'use strict';

angular.module('wbaApp')
.controller('AnalisesCedentesListarController',[
  '$scope',
  '$state',
  '$stateParams',
  'apiAnalizes',
  function ($scope, $state, $stateParams, apiAnalizes) {
    
      // definitions for date
      
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
      $scope.openFrom = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        
        $scope.openedFrom = true;
      };
      $scope.openTo = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        
        $scope.openedTo = true;
      };
      $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
      };
      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = $scope.formats[0];
        // end of definitions
        
        $scope.filter = {};
        $scope.filter.count = false;
        $scope.filter.inputCpfCnpjFilter = "";
        $scope.filter.inputNomeFilter = ""; 
        $scope.filter.inputNumeroOperacaoFilter = "";
        $scope.filter.maxResults = 8;
        $scope.filter.startResult = 0;
        $scope.filter.status = 'none';
        $scope.filter.type = 'C';
        $scope.currentPage = 1;
        $scope.pageSize = 8;

        $scope.getAnalyzes = function (filter) {
          
          var f = filter;
          if ($scope.startDate) {
            if(moment.isDate($scope.startDate)) {
              f.startDate = moment($scope.startDate).format('DD-MM-YYYY');
            }
            else {
              f.startDate = $scope.startDate;
            }
          }
          if($scope.endDate) {
            if(moment.isDate($scope.endDate)) {
              f.endDate = moment($scope.endDate).format('DD-MM-YYYY');
            }
            else {
              f.endDate = $scope.endDate;
            }
          }
          f.count = false;
          apiAnalizes.getAnalizes(f).then(
            function(res) {
              $scope.analyzes = res.data;
              f.count = true;
              apiAnalizes.getAnalizes(f).then(
                function(num){
                  $scope.numItems = parseInt(num.data.message);
                  $scope.numberOfPages = Math.ceil($scope.numItems / $scope.pageSize);
                });
            },
            function (err) {
              console.log(err)
            }
            )
        };
        $scope.getAnalyzes($scope.filter);
        
        $scope.pageChanged = function (page) {
          console.log(page, $scope.currentPage);
        }
        
        $scope.$watch('currentPage',function (v, ov) {
          if(!ov) {
            return false
          }
          if(v > ov) {
            $scope.filter.startResult = $scope.filter.startResult + $scope.pageSize;
            $scope.getAnalyzes($scope.filter);
          }
          if(v < ov) {
            $scope.filter.startResult = $scope.filter.startResult - $scope.pageSize;
            $scope.getAnalyzes($scope.filter);
          }
        })
      }
      ]);