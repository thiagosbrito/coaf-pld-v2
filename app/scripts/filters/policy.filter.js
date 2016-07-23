'use strict';
angular.module('wbaApp')
.filter('policyTypeFilter', function() {
    return function(input) {
      if (input == 'OPERATION_ANALYSIS')
        return 'Análise de Operação';
      else if (input == 'CUSTOMER_ANALYSIS')
        return 'Análise de Cedente';
      else
        return input;
    };
});