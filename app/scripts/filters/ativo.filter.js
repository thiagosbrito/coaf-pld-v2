angular.module('wbaApp').
filter('ativo', function() {
  return function(input) {
    if(input == true) {
      return "fa-check green"
    }
    else {
      return "fa-times red"
    }
  }
});
