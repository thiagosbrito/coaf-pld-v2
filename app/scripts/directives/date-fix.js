'use strict';
angular.module('wbaApp')
	.directive('fixDatepicker',function(dateFilter,$parse){
	  return{
	    restrict:'EAC',
	    require:'?ngModel',
	    link:function(scope,element,attrs,ngModel,ctrl){
	      ngModel.$parsers.push(function(viewValue){
	        return dateFilter(viewValue,'dd-MM-yyyy');
	      });
	    }
	  }
	});