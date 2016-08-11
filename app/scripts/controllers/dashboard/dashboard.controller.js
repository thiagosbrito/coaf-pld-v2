'use strict';

angular.module('wbaApp')
  
  .controller('DashboardController',[
    '$scope',
    '$state',
    '$location',
    'apiChart',
    '$rootScope',
    'user',
    'apiLogin',
    'Session',
    function ($scope, $state, $location, apiChart, $rootScope, user, apiLogin, Session) {
      

      if(apiLogin.isAuthenticated()) {
        $scope.user = user;
        $scope.permissions = $scope.user.permissions;

        $scope.customerChartData = [];
        $scope.operationChartData = [];

        

        $scope.chartCustomer = {
          options: {
            chart: {
              type: 'pie',
              options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
              }
            },
            tooltip: {
              pointFormat: '<b>{point.y}</b>'
            },
            legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'top',
              backgroundColor: '#FFFFFF'
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
              },
              point: {
                events: {
                  click: function () {
                      alert('Name: ' + this.name + ', value: ' + this.y);
                  }
                }
              },
              series: {
                turboThreshold: 10000
              }
            }
          },
          size: {
            width: 400,
            height: 300
          },
          series: [{
            name: 'Cedentes',
            data: []
          }],
          title: {
            text: ''
          },
          loading: false
        };
        

        $scope.chartOperation = {
          options: {
            chart: {
              type: 'pie'
            },
            tooltip: {
              pointFormat: '<b>{point.y}</b>'
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
              },
              series: {
                turboThreshold: 10000
              }
            },
            legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'top',
              backgroundColor: '#FFFFFF'
            }
          },
          size: {
            width: 400,
            height: 300
          },
          series: [{
            name: 'Operacões',
            innerSize: 120,
            data: []
          }],
          title: {
            text: ''
          },
          loading: false
        };

        $scope.today = function() {
          $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
          $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
          return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function() {
          $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.openStartCustomer = function($event) {
          $event.preventDefault();
          $event.stopPropagation();
          $scope.openedStartCustomer = true;
        };
        $scope.openEndCustomer = function($event) {
          $event.preventDefault();
          $event.stopPropagation();
          $scope.openedEndCustomer = true;
        };
        $scope.openStartOperation = function($event) {
          $event.preventDefault();
          $event.stopPropagation();
          $scope.openedStartOperation = true;
        };
        $scope.openEndOperation = function($event) {
          $event.preventDefault();
          $event.stopPropagation();
          $scope.openedEndOperation = true;
        };

        $scope.dateOptions = {
          formatYear: 'yy',
          startingDay: 1
        };

        $scope.format = 'dd/MM/yyyy';


        var inprogress_style = {color:'#00EE00', textStyle:{color:'black'}};
        var riscoBaixo_style = {color:'#3300CC'};
        var riscoAlto_style = {color:'#CC0000'};

        $scope.customerRestData = [];
        $scope.operationRestData = [];


        $scope.customerChartSlices = [];
        $scope.operationChartSlices = [];

        // flags para controle de exibição do chart
        $scope.customerChartShow = false;
        $scope.operationChartShow = false;


        // datas iniciais e finais do dash
        $scope.customerStartDate = new Date();
        $scope.customerEndDate = new Date();
        $scope.operationStartDate = new Date();
        $scope.operationEndDate = new Date();

        $scope.sortRestData = function (value) {
          return value.sort(function (a, b) {
            return a.code - b.code;
          });
        };

        $scope.resolveRestData = function (value) {
          var result = [];
          angular.forEach(value, function (e) {
              var tmp = {name:e.status, y:e.count};
              result.push(tmp);
          });
          return result;
        };

        $scope.resolveSlices = function (value) {
          var result = [];

          angular.forEach(value, function (e) {
            // configura as cores das fatias do chart
            if (e.code == 0) {
              result.push(inprogress_style);
            } else if (e.code == 1) {
              result.push(riscoBaixo_style);
            } else if (e.code == 2) {
              result.push(riscoAlto_style);
            }
          });

          return result;
        };

        $scope.includeRequestFormattedDate = function (startDate, endDate, opt) {
          if (!angular.isUndefined(startDate) && !angular.isUndefined(endDate)) {

            // data inicial
            opt.startDay = startDate.getDate();
            opt.startMonth = startDate.getMonth();
            opt.startYear = startDate.getFullYear();

            // data final
            opt.endDay = endDate.getDate();
            opt.endMonth = endDate.getMonth();
            opt.endYear = endDate.getFullYear();
          }
        };

        /**
         * Processa os dados retornados pelo servidor (customers)
         */
        $scope.processCustomer = function (startDate, endDate) {

          if ($scope.permissions.customerDashboard) {
            var opt = {type:'customer'};
            $scope.includeRequestFormattedDate(startDate, endDate, opt);
            $scope.restData = apiChart.getChartData(opt).then(
              function (res) {
                if (res.data.length > 0) {
                  angular.forEach(res.data, function (value) {
                    $scope.chartCustomer.series[0].data.push({name: value.status, y: value.count})
                  })
                  $scope.customerChartShow = $scope.chartCustomer.series.length > 0 ? true : false;    
                }
                // $scope.customerRestData = $scope.sortRestData(res.data);
                // $scope.customerChartData = $scope.resolveRestData($scope.customerRestData);
                // $scope.customerChartSlices = $scope.resolveSlices($scope.customerRestData);
              }
            )
          }
        };
        $scope.processCustomer($scope.customerStartDate, $scope.customerEndDate);

        /**
         * Processa os dados retornados pelo servidor (operations)
         */
        $scope.processOperation = function (startDate, endDate) {
          
          if ($scope.permissions.customerDashboard) {
            var opt = {type:'operation'};
            $scope.includeRequestFormattedDate(startDate, endDate, opt);
            $scope.restData = apiChart.getChartData(opt).then(
              function (res) {
                if(res.data.length > 0) {
                  angular.forEach(res.data, function (value) {
                    $scope.chartOperation.series[0].data.push({name: value.status, y: value.count})
                  })
                  $scope.operationChartShow = $scope.chartOperation.series.length > 0 ? true : false;
                }
              }
            )
          }
        };

        $scope.processOperation($scope.operationStartDate, $scope.operationEndDate);

        $scope.changeCustomerDate = function (start, end) {
          $scope.chartCustomer.series[0].data = [];
          $scope.processCustomer(start, end);
        }

        $scope.changeOperationDate = function (start, end) {
          $scope.chartOperation.series[0].data = [];
          $scope.processOperation(start, end);
        }


        $scope.analysisCallback = function (selection, analysisType, data, startDate, endDate) {
          if (selection.length > 0) {
            var firstSelection = data[selection[0].row];

            const IN_PROGRESS = 0;
            const NO_RISK = 1;
            const RISK = 2;

            var formatStartDate = dateUtil.formatDate(startDate);
            var formatEndDate = dateUtil.formatDate(endDate);

            var status = null;

            if (IN_PROGRESS == firstSelection.code) {
              status = 'in_progress'
            } else if (NO_RISK == firstSelection.code) {
              status = 'no_risk'
            } else if (RISK == firstSelection.code) {
              status = 'risk';
            } else {
              status = 'none';
            }
            $location.url('/analyzes?type=' + analysisType + '&startDate=' + formatStartDate + '&endDate=' + formatEndDate + '&status=' + status);
          }
        };

        $scope.operationCallback = function (selection) {
          return $scope.analysisCallback(selection, 'O', $scope.operationRestData, $scope.operationStartDate, $scope.operationEndDate);
        };

        $scope.customerCallback = function (selection) {
          return $scope.analysisCallback(selection, 'C', $scope.customerRestData, $scope.customerStartDate, $scope.customerEndDate);
        };

      }
      else {
        Session.destroy();
        $state.go('login');
      };
      

      
    }
  ])