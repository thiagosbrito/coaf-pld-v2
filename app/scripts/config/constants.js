'use strict';
angular.module('wbaApp')
  .constant('baseUrl',{
    "apiUrl"          :     "http://localhost:3000/api",
    "apiLogin"        :     "http://localhost:3000/j_security_check"
  })
  .constant('nanoScrollerDefaults', {
    nanoClass: 'scroll-pane',
    paneClass: 'scroll-track',
    sliderClass: 'scroll-thumb',
    contentClass: 'scroll-content'
  })
