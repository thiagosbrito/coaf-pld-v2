angular
  .module('theme.demos', [
    'oc.lazyLoad',
    'theme.demos.canvas_charts',
    'theme.demos.nvd3_charts',
    'theme.demos.flot_charts',
    'theme.demos.morris_charts',
    'theme.demos.sparkline_charts',
    'theme.demos.dashboard'
  ])
  .directive('img', ['$timeout', function ($t) {
      // NOTE: this affects all <img> tags
      // Remove this directive for production
    'use strict';
      return {
      restrict: 'E',
      link: function (scope, element) {
        $t ( function () {
            var src = element.attr('src') || element.attr('ng-src');
          if (src.match(/assets\/demo/)) {
            element.attr('src', 'http://placehold.it/400&text=Placeholder');
          }
        }, 10);
      }
      };
  }]);