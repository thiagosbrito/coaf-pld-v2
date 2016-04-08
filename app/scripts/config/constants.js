'use strict';
angular.module('wbaApp')
  .constant('baseUrl',{
    "apiUrl"          :     "http://localhost:8000/sso-wba/v1",
    "apiEmpresas"     :     "http://192.168.99.100:8081/empresas/v1",
    "apiComercial"    :     "http://192.168.99.100:9090/comercial/v1",
    "apiOperacoes"    :     "http://192.168.99.100:8100/operacoes/v1"
  })
  .constant('nanoScrollerDefaults', {
    nanoClass: 'scroll-pane',
    paneClass: 'scroll-track',
    sliderClass: 'scroll-thumb',
    contentClass: 'scroll-content'
  })