angular.module('wbaApp')
.config([
  'datepickerConfig',
  function (datepickerConfig){
    datepickerConfig.showWeeks = false;
  }
]) 
