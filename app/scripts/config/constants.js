'use strict';
angular.module('wbaApp')
  .constant('baseUrl',{
    "apiUrl"          :     "http://api.erp.idtrust.com.br:9000/sso-wba/v1",
    "apiEmpresas"     :     "http://api.erp.idtrust.com.br:9000/empresas/v1",
    "apiComercial"    :     "http://api.erp.idtrust.com.br:9000/comercial/v1",
    "apiOperacoes"    :     "http://api.erp.idtrust.com.br:9000/operacoes/v1",
    "apiCobrancas"    :     "http://api.erp.idtrust.com.br:9000/cobrancas/v1",
    "apiDocumentacao" :     "http://api.erp.idtrust.com.br:9000/documentacao/v1"
  })
  .constant('nanoScrollerDefaults', {
    nanoClass: 'scroll-pane',
    paneClass: 'scroll-track',
    sliderClass: 'scroll-thumb',
    contentClass: 'scroll-content'
  })
