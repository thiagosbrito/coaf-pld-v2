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

    $httpProvider.defaults.useXDomain = true;
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
        controller: 'MainController',
        templateUrl: 'views/main/main.html',
        resolve: {
          user: function ($localStorage) {
            return $localStorage.profile;
          }
        }
      })
      .state('coafPld.dashboard',{
        url: '/dashboard',
        templateUrl: 'views/coaf-pld/dashboard/dashboard.html',
        controller: 'DashboardController',
        resolve: {
          user: function (Session) {
            return Session.getUser();
          }
        }
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
        resolve: {
          user: function (Session) {
            return Session.getUser();
          }
        },
        controller: 'AnalisesOperacoesNovoController'
      })
      .state('coafPld.analises.operacoes.view',{ // nova analise de operacoes
        url: '/view/:analiseId',
        templateUrl: 'views/coaf-pld/analises/operacoes/view.html',
        controller: 'AnalisesOperacoesViewController'
      })
      .state('coafPld.analises.operacoes.pdf',{
        url: '/view/:analiseId/pdf',
        controller: 'PDFViewerOperacaoController',
        templateUrl: 'views/coaf-pld/analises/operacoes/pdf.html'
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

      .state('coafPld.analises.cedentes.pdf',{
        url: '/view/:analiseId/pdf',
        controller: 'PDFViewerCedenteController',
        templateUrl: 'views/coaf-pld/analises/cedentes/pdf.html'
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
      .state('coafPld.cadastro.policies', {
        url: '/questoes',
        template: '<div ui-view=""></div>'
      })
      .state('coafPld.cadastro.policies.listar',{
        url: '/listar',
        templateUrl: 'views/coaf-pld/cadastros/policies/listar.html',
        controller: 'CadastroPoliciesListarController'
      })
      .state('coafPld.cadastro.policies.novo',{
        url: '/novo',
        templateUrl: 'views/coaf-pld/cadastros/policies/novo.html',
        controller: 'CadastroPoliciesNovoController',
        resolve: {
          policies: function (apiPolicies, Session) {
            var user = Session.getUser();
            var policies = [];
            return apiPolicies.getPolicyById(user.operationPolicy.id).then(
              function (res) {
                var item = res.data;
                policies.push(item);
              }
            ).then(
              apiPolicies.getPolicyById(user.customerPolicy.id).then(
                function (res) {
                  var item = res.data;
                  policies.push(item);
                }
              )
            ).then(
              apiPolicies.getPolicies().then(
                function (res) {
                  var items = res.data;
                  angular.forEach(items, function (value) {
                    policies.push(value);
                  });
                }
              )
            ).then( function () { return policies } );
          },
          items: function () {
            return [
              { id:'ONE_CHOICE', name:'One Choice' },
              { id:'MULTIPLE_CHOICE', name:'Mutiple Choice' },
              { id:'TRUE_OR_FALSE', name:'True or False' }
            ];
          },
          itemsOperacao: function () {
            return [
              {id: 'OPERATION_ANALYSIS', name: 'Analise da Operação' },
              {id: 'CUSTOMER_ANALYSIS',name: 'Analise do Cedente'}
            ];
          }
        }
      })
      .state('coafPld.cadastro.policies.editar',{
        url: '/editar/:policyId',
        templateUrl: 'views/coaf-pld/cadastros/policies/editar.html',
        controller: 'CadastroPoliciesEditarController',
        resolve: {
          items: function () {
            return [
              { id:'ONE_CHOICE', name:'One Choice' },
              { id:'MULTIPLE_CHOICE', name:'Mutiple Choice' },
              { id:'TRUE_OR_FALSE', name:'True or False' }
            ];
          },
          itemsOperacao: function () {
            return [
              {id: 'OPERATION_ANALYSIS', name: 'Analise da Operação' },
              {id: 'CUSTOMER_ANALYSIS',name: 'Analise do Cedente'}
            ];
          } 
        }
      })
      .state('coafPld.cadastro.criterio',{
        url: '/criterio',
        template: '<div ui-view=""></div>'
      })
      .state('coafPld.cadastro.criterio.listar',{
        url: '/listar',
        templateUrl: 'views/coaf-pld/cadastros/criterio/listar.html',
        controller: 'CadastroCriterioListarController'
      })
      .state('coafPld.cadastro.usuarios',{
        url: '/usuarios',
        template: '<div ui-view=""></div>'
      })
      .state('coafPld.cadastro.usuarios.listar',{
        url: '/listar',
        templateUrl: 'views/coaf-pld/cadastros/usuarios/listar.html',
        controller: 'CadastroUsuariosListarController'
      })
      

      .state('coafPld.comunicar', {
        url: '/comunicar',
        template: '<div ui-view=""></div>'
      })
      .state('coafPld.comunicar.notifications',{
        url: '/notificacoes',
        template: '<div ui-view=""></div>'
      })
      .state('coafPld.comunicar.notifications.listar', {
        url: '/listar',
        templateUrl: 'views/coaf-pld/notifications/listar.html',
        controller: 'NotificationsListarController',
        resolve: {
          notifications: function (apiNotifications) {
            return apiNotifications.getNotifications().then(
              function (res) {
                return res.data
              }
            )
          }
        }
      })

      .state('coafPld.manual',    {
        url: '/manual',
        template: '<div ui-view=""></div>'
      })
      .state('coafPld.manual.ppld',{
        url: '/ppld',
        templateUrl: 'views/coaf-pld/manual/ppld.html',
        controller: 'ManualController'
      })

      .state('coafPld.sobre',     {
        url: '/sobre',
        templateUrl: 'views/coaf-pld/about/about.html'
      })
      
      .state("coafPld.otherwise", {
        url: "*path",
        templateUrl: "views/extras-404.html"
      })
  }
]);
