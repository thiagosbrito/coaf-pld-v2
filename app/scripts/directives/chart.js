'use strict';

/* App Module */

var chart = angular.module('wbaApp', []);
chart.directive('pieChart', function() {
    return {
      restrict: 'A',
      link: function($scope, $elm, $attr) {
        var options = {};
        
        var data = [];

        $attr.$observe('pieChart',function(vlr) {
          // Instantiate and draw our chart, passing in some options.
          var chart = new google.visualization.PieChart($elm[0]);

        var value = eval('('+vlr+')');
        
        // set chart options
        if (!angular.isUndefined(value.options)) {
          options = value.options;
        }
        
        if (!angular.isUndefined(value.select)) {
          google.visualization.events.addListener(chart,'select',function() {
            eval('$scope.'+value.select+'(chart.getSelection());');
            $scope.$apply();
          });
        }

        var dataArray = [];
          if (value.data.length > 0) {
            var x;
          var tmp = [];
            for (x in value.data[0]) {
              tmp.push(x);
            }
            dataArray.push(tmp);
            angular.forEach(value.data,function(e) {
              var tmp = [];
              var x;
              for (x in e) {
                tmp.push(eval('e.'+x));
              }
              dataArray.push(tmp);
            });
            data = google.visualization.arrayToDataTable(dataArray,false);
            drawChart(chart, data, options);
          } else {
            $elm[0].innerHTML = '';
          }
        });

      }
    };
});

// draw the chart
function drawChart(chart, data, options) {
  chart.draw(data,options);
}

// load google visualization api
google.load('visualization', '1', {packages: ['corechart']});
