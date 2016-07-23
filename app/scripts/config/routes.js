'use strict';

angular.module('wbaApp')
.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$routeProvider',
  '$httpProvider',
  '$locationProvider',
  function($stateProvider, $urlRouterProvider, $routeProvider, $httpProvider, $locationProvider) {
    'use strict';

    // $locationProvider.html5mode = true;
    $httpProvider.defaults.useXDomain = true;
    // $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};

    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('login',{
        url: '/login',
        templateUrl: 'views/coaf-pld/auth/login.html',
        controller: 'LoginController'
      })
      .state('coafPld',{
        url: '',
        abstract: true,
        controller: 'MainController',
        templateUrl: 'views/main/main.html'
      })
      // .state('coafPld.login',{
      //   url: '/login',
      //   templateUrl: 'views/wba/auth/login.html',
      //   controller: 'LoginController'
      // })
      .state('coafPld.dashboard',{
        url: '/dashboard',
        templateUrl: 'views/coaf-pld/dashboard/dashboard.html',
      })
      // ANALISES
      .state('coafPld.analises',  {
        url: '/analises',
        template: '<div ui-view=""></div>'
      })
      .state('coafPld.analises.operacoes',{ // Main state for operacoes
    	  url: '/operacao',
    	  template: '<div ui-view=""></div>'
      })
      .state('coafPld.analises.operacoes.listar',{ // listar operacoes
        url: '/listar',
        templateUrl: 'views/coaf-pld/analises/operacoes/listar.html',
        controller: 'AnalisesOperacoesListarController'
      })
      .state('coafPld.analises.operacoes.novo',{ // nova analise de operacoes
        url: '/novo',
        templateUrl: 'views/coaf-pld/analises/operacoes/novo.html',
        controller: 'AnalisesOperacoesNovoController'
      })
      .state('coafPld.analises.operacoes.view',{ // nova analise de operacoes
        url: '/view/:analiseId',
        templateUrl: 'views/coaf-pld/analises/operacoes/view.html',
        controller: 'AnalisesOperacoesViewController'
      })
      

      .state('coafPld.analises.cedentes',{ // Main state for cedentes
        url: '/cedente',
        template: '<div ui-view=""></div>'
      })
      .state('coafPld.analises.cedentes.listar',{ // listar cedentes
        url: '/listar',
        templateUrl: 'views/coaf-pld/analises/cedentes/listar.html',
        controller: 'AnalisesCedentesListarController'
      })
      .state('coafPld.analises.cedentes.novo',{ // nova analise de cedentes
        url: '/novo',
        templateUrl: 'views/coaf-pld/analises/cedentes/novo.html',
        controller: 'AnalisesCedentesNovoController'
      })

      .state('coafPld.analises.cedentes.view',{ // nova analise de cedentes
        url: '/view/:analiseId',
        templateUrl: 'views/coaf-pld/analises/cedentes/view.html',
        controller: 'AnalisesCedentesViewController'
      })
      
      
      .state('coafPld.cadastro',  {
        url: '/cadastro',
        template: '<div ui-view=""></div>'
      })
      .state('coafPld.cadastro.cedentes', {
        url: '/cedentes',
        template: '<div ui-view=""></div>'
      })
      .state('coafPld.cadastro.cedentes.listar', {
        url: '/listar',
        templateUrl: 'views/coaf-pld/cadastros/cedentes/listar.html',
        controller: 'CadastroCedentesListarController'
      })
      
      .state('coafPld.comunicar', {
        url: '/notificacoes',
        template: '<div ui-view=""></div>'
      })
      .state('coafPld.manual',    {
        url: '/manual',
        template: '<div ui-view=""></div>'
      })
      .state('coafPld.sobre',     {
        url: '/sobre',
        template: '<div ui-view=""></div>'
      })
  }
]);
