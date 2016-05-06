'use strict';

angular.module('wbaApp')
.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$routeProvider',
  '$httpProvider',
  '$locationProvider',
  function($stateProvider, $urlRouterProvider, $routeProvider, $httpProvider,$locationProvider) {
    'use strict';

    // $locationProvider.html5mode = true;
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};

    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider
      .state('wba',{
        url: '',
        abstract: true,
        templateUrl: 'views/main/main.html',
        resolve: {
          loadCalendar : ['$ocLazyLoad', function ($ocLazyLoad) {
            return  $ocLazyLoad.load([
              'bower_components/fullcalendar/dist/fullcalendar.js'
            ])
          }]
        }
      })
      .state('wba.templates', {
        url: '/template/:templateFile',
        templateUrl: function (param) {
          if (param.templateFile == 'inbox') {
            param.templateFile = 'extras-inbox'
          }
          return 'views/' + param.templateFile + '.html';
        }
      })
      .state('wba.dashboard',{
        url: '/dashboard',
        controller: 'MainController',
        templateUrl: 'views/index.html'
      })
      .state('wba.usuarios-permissoes', {
        url: '/usuarios-permissoes',
        template: '<div ui-view=""></div>'
      })
      .state('wba.usuarios-permissoes.profile', {
        url: '/perfil',
        templateUrl: 'views/wba/usuario/perfil.html'
      })
      .state('wba.usuarios-permissoes.organizacoes', {
        url: '/organizacoes',
        template: '<div ui-view=""></div>'
      })
      .state('wba.usuarios-permissoes.organizacoes.listar', {
        url: '/listar',
        templateUrl: 'views/wba/organizacoes/listar.html',
        controller: 'OrganizacoesListarController'
      })

      .state('wba.usuarios-permissoes.organizacoes.usuarios',{
        url: '/:organizacaoId/usuarios',
        template: '<div ui-view=""></div>'
      })
      .state('wba.usuarios-permissoes.organizacoes.usuarios.listar', {
        url: '/listar',
        templateUrl: 'views/wba/organizacoes/usuarios.html',
        controller: 'OrganizacoesUsuariosController'
      })
      .state('wba.usuarios', {
        url: '/usuarios',
        template: '<div ui-view=""></div>'
      })
      .state('wba.usuarios.novo', {
        url: '/novo',
        templateUrl: 'views/wba/usuario/novo.html',
        controller: 'OrganizacoesUsuariosNovoController'
      })

      .state('wba.usuarios-permissoes.organizacoes.usuarios.grupos', {
        url: '/:usuarioId/grupos',
        template: '<div ui-view=""></div>'
      })
      .state('wba.usuarios-permissoes.organizacoes.usuarios.grupos.listar', {
        url: '/listar',
        templateUrl: 'views/wba/organizacoes/grupos-usuario.html',
        controller: 'OrganizacoesUsuariosGruposController'
      })
      .state('wba.usuarios-permissoes.organizacoes.usuarios.grupos.novo', {
        url: '/novo',
        templateUrl: 'views/wba/organizacoes/novo-grupo-usuario.html',
        controller: 'OrganizacoesUsuariosGruposNovoController'
      })
      .state('wba.usuarios-permissoes.organizacoes.usuarios.roles', {
        url: '/:usuarioId/roles',
        template: '<div ui-view=""></div>'
      })
      .state('wba.usuarios-permissoes.organizacoes.usuarios.roles.listar', {
        url: '/listar',
        templateUrl: 'views/wba/organizacoes/roles-usuario.html',
        controller: 'OrganizacoesUsuariosRolesController'
      })
      .state('wba.usuarios-permissoes.organizacoes.usuarios.roles.novo', {
        url: '/novo',
        templateUrl: 'views/wba/organizacoes/novo-roles-usuario.html',
        controller: 'OrganizacoesUsuariosRolesNovoController'
      })

      .state('wba.usuarios-permissoes.grupos', {
        url: '/grupos',
        template: '<div ui-view=""></div>'
      })
      .state('wba.usuarios-permissoes.grupos.listar',{
        url: '/listar',
        templateUrl: 'views/wba/grupos/listar.html',
        controller: 'GruposListarController'
      })
      .state('wba.usuarios-permissoes.grupos.editar',{
        url: '/editar',
        templateUrl: 'views/wba/grupos/editar.html'
      })

      .state('wba.usuarios-permissoes.roles', {
        url: '/roles',
        template: '<div ui-view=""></div>'
      })
      .state('wba.usuarios-permissoes.roles.listar',{
        url: '/listar',
        templateUrl: 'views/wba/roles/listar.html',
        controller: 'RolesListarController'
      })
      .state('wba.usuarios-permissoes.roles.novo',{
        url: '/novo',
        templateUrl: 'views/wba/roles/novo.html'
      })
      .state('wba.usuarios-permissoes.roles.editar',{
        url: '/editar',
        templateUrl: 'views/wba/roles/editar.html'
      })

      .state('wba.usuarios-permissoes.modulos', {
        url: '/modulos',
        template: '<div ui-view=""></div>'
      })

      .state('wba.usuarios-permissoes.modulos.listar', {
        url: '/listar',
        templateUrl: 'views/wba/modulos-permissoes/listar.html',
        controller: 'ModulosPermissoesListarController'
      })

      // Routews for Empresas Module
      .state('wba.empresas',{
        url: '/empresas',
        template: '<div ui-view=""></div>'
      })
      .state('wba.empresas.listar',{
        url: '/listar',
        templateUrl: 'views/wba/empresas/listar.html',
        controller: 'EmpresasListarController'
      })
      .state('wba.empresas.novo',{
        url: '/novo',
        templateUrl: 'views/wba/empresas/novo.html'
      })
      .state('wba.empresas.novo.empresa',{
        url: '/empresa',
        templateUrl: 'views/wba/empresas/novo-empresa.html',
        controller: 'NovaEmpresaController'
      })
      .state('wba.empresas.novo.endereco',{
        url: '/:empresaId/endereco',
        templateUrl: 'views/wba/empresas/novo-endereco.html',
        controller: 'NovaEmpresaEnderecoController'
      })
      .state('wba.empresas.novo.representante',{
        url: '/:empresaId/representante',
        templateUrl: 'views/wba/empresas/novo-representante.html',
        controller: 'NovaEmpresaRepresentanteController'
      })
      .state('wba.empresas.novo.contato',{
        url: '/:empresaId/contato',
        templateUrl: 'views/wba/empresas/novo-contato.html',
        controller: 'NovaEmpresaContatoController'
      })
      .state('wba.empresas.editar', {
        url: '/editar/:empresaId',
        templateUrl: 'views/wba/empresas/editar.html',
        abstract: true,
        controller: function ($scope, $stateParams) {
          $scope.empresaId = $stateParams.empresaId;
        },
        resolve: {
          empresa: function (apiEmpresas, $stateParams) {
            return apiEmpresas.getById($stateParams.empresaId).then(
              function (res) {
                return res.data
              }
            )
          }
        }
      })
      .state('wba.empresas.editar.empresa',{
        url: '/empresa',
        templateUrl: 'views/wba/empresas/editar-empresa.html',
        controller: 'EditarEmpresaController'
      })
      .state('wba.empresas.editar.endereco',{
        url: '/endereco',
        templateUrl: 'views/wba/empresas/editar-empresa-endereco.html',
        controller: 'EditarEmpresaEnderecoController'
      })
      .state('wba.empresas.editar.representante',{
        url: '/representante',
        templateUrl: 'views/wba/empresas/editar-empresa-representante.html',
        controller: 'EditarEmpresaRepresentanteController'
      })
      .state('wba.empresas.editar.contato',{
        url: '/contato',
        templateUrl: 'views/wba/empresas/editar-empresa-contato.html',
        controller: 'EditarEmpresaContatoController'
      })

      // Routews for Comercial Module
      .state('wba.comercial',{
        url: '/comercial',
        template: '<div ui-view=""></div>'
      })
      .state('wba.comercial.hierarquias',{
        url: '/hierarquias',
        template: '<div ui-view=""></div>'
      })
      .state('wba.comercial.hierarquias.listar',{
        url:'/listar',
        templateUrl: 'views/wba/comercial/hierarquias/listar.html',
        controller: 'HierarquiasListarController',
        resolve: {
          hierarquias: function (apiComercial) {
            return apiComercial.getHierarquias().then(
              function (res) {
                return res.data
              }
            )
          }
        }


      })
      .state('wba.comercial.hierarquias.novo',{
        url:'/novo',
        templateUrl: 'views/wba/comercial/hierarquias/novo.html',
        controller: 'HierarquiasNovoController'
      })
      .state('wba.comercial.hierarquias.editar',{
        url:'/editar/:hierarquiaId',
        templateUrl: 'views/wba/comercial/hierarquias/editar.html',
        controller: 'HierarquiasEditarController'
      })

      .state('wba.comercial.plataformas',{
        url: '/plataformas',
        template: '<div ui-view=""></div>'
      })
      .state('wba.comercial.plataformas.listar',{
        url:'/listar',
        templateUrl: 'views/wba/comercial/plataformas/listar.html',
        controller: 'PlataformasListarController'
      })
      .state('wba.comercial.plataformas.novo',{
        url:'/novo',
        templateUrl: 'views/wba/comercial/plataformas/novo.html',
        controller: 'PlataformasNovoController'
      })
      .state('wba.comercial.plataformas.editar',{
        url:'/editar/:plataformaId',
        templateUrl: 'views/wba/comercial/plataformas/editar.html',
        controller: 'PlataformasEditarController'
      })

      .state('wba.operacoes',{
        url: '/operacoes',
        template: '<div ui-view=""></div>'
      })
      .state('wba.operacoes.listar',{
        url: '/listar',
        templateUrl: 'views/wba/operacoes/listar.html',
        controller: 'OperacoesListarController'
      })
      .state('wba.operacoes.novo',{
        url: '/novo',
        templateUrl: 'views/wba/operacoes/novo.html',
        controller: 'OperacoesNovoController'
      })

      // Editar operações wizard
      .state('wba.operacoes.editar',{
        url: '/editar/:operacaoId',
        abstract: true,
        templateUrl: 'views/wba/operacoes/editar.html',
        controller: 'OperacoesEditarController',
        resolve: {
          operacao: function (apiOperacoes, $stateParams) {
            return apiOperacoes.getOperacaoById($stateParams.operacaoId).then(
              function (res) {
                return res.data
              }
            )
          }
        }
      })
      .state('wba.operacoes.editar.digitacao',{
        url: '/digitacao',
        templateUrl: 'views/wba/operacoes/editar-digitacao.html',
        controller: 'DigitacaoOperacaoController'
      })
      .state('wba.operacoes.editar.analise',{
        url: '/analise',
        templateUrl: 'views/wba/operacoes/editar-analise.html',
        controller: 'AnaliseOperacaoController'
      })

      .state('wba.operacoes.editar.tarifas',{
        url: '/tarifas',
        templateUrl: 'views/wba/operacoes/editar-tarifas.html',
        controller: 'TarifasOperacaoController'
      })


      .state('wba.operacoes.carteiras',{
        url: '/carteiras',
        template: '<div ui-view=""></div>'
      })
      .state('wba.operacoes.carteiras.listar',{
        url: '/listar',
        templateUrl: 'views/wba/operacoes/carteiras/listar.html',
        controller: 'CarteirasListarController'
      })
      .state('wba.operacoes.carteiras.editar',{
        url: '/editar/:carteiraId',
        templateUrl: 'views/wba/operacoes/carteiras/editar.html' ,
        controller: 'CarteirasEditarController'
      })

      .state('wba.operacoes.tarifas',{
        url: '/tarifas',
        template: '<div ui-view=""></div>'
      })
      .state('wba.operacoes.tarifas.listar',{
        url: '/listar',
        templateUrl: 'views/wba/operacoes/tarifas/listar.html',
        controller: 'TarifasListarController'
      })

      // .state('wba.operacoes.tarifas.novo',{
      //   url: '/novo',
      //   templateUrl: 'views/wba/operacoes/tarifas/novo.html'
      // })
      // .state('wba.operacoes.tarifas.editar',{
      //   url: '/editar/:tarifaId',
      //   templateUrl: 'views/wba/operacoes/tarifas/editar.html'
      // })


      // Routews for Cobranca Module
      .state('wba.cobranca',{
        url: '/cobranca',
        template: '<div ui-view=""></div>'
      })

      .state('wba.cobranca.cobrancas', {
        url: '',
        template: '<div ui-view=""></div>'
      })
      .state('wba.cobranca.cobrancas.listar', {
        url: '/listar',
        templateUrl: 'views/wba/cobranca/cobrancas/listar.html',
        controller: 'CobrancasListarController'
      })
      .state('wba.cobranca.cobrancas.editar', {
        url: '/editar/:cobrancaId',
        templateUrl: 'views/wba/cobranca/cobrancas/editar.html',
        controller: 'CobrancasEditarController'
      })
      .state('wba.cobranca.boletos',{
        url: '/boletos',
        template: '<div ui-view=""></div>'
      })

      .state('wba.cobranca.boletos.inicial',{
        url: '/inicio',
        templateUrl: 'views/wba/cobranca/boletos/inicial.html'
      })

      .state('wba.cobranca.boletos.passos',{
        url: '/passos',
        templateUrl: 'views/wba/cobranca/boletos/passos.html',
        controller: function ($scope, $state) {
          $scope.st = $state;
          console.log($scope.st);
        }
      })
      .state('wba.cobranca.boletos.passos.passo-1',{
        url: '/passo-1',
        templateUrl: 'views/wba/cobranca/boletos/passo-1.html',
        title: 'Passo 1',
        queue: 0,
        controller: 'BoletosPasso1Controller'
      })
      .state('wba.cobranca.boletos.passos.passo-2',{
        url: '/passo-2',
        templateUrl: 'views/wba/cobranca/boletos/passo-2.html',
        title: 'Passo 2',
        queue: 1
      })
      .state('wba.cobranca.boletos.passos.passo-3',{
        url: '/passo-3',
        templateUrl: 'views/wba/cobranca/boletos/passo-3.html',
        title: 'Passo 3',
        queue: 2
      })
      .state('wba.cobranca.boletos.passos.passo-4',{
        url: '/passo-4',
        templateUrl: 'views/wba/cobranca/boletos/passo-4.html',
        title: 'Passo 4',
        queue: 3
      })
      .state('wba.cobranca.boletos.passos.passo-5',{
        url: '/passo-5',
        templateUrl: 'views/wba/cobranca/boletos/passo-5.html',
        title: 'Passo 5',
        queue: 4
      })

      // Routews for Checagem Module
      .state('wba.checagem',{
        url: '/checagem',
        template: '<div ui-view=""></div>'
      })
      .state('wba.checagem.agendamentos',{
        url: '/agendamentos',
        templateUrl: 'views/wba/checagem/agendamentos.html'
      })
      .state('wba.checagem.confirmacao',{
        url: '/confirmacao-titulos',
        templateUrl: 'views/wba/checagem/confirmacao.html'
      })
      .state('wba.checagem.conferencia',{
        url: '/conferencia',
        templateUrl: 'views/wba/checagem/conferencia.html'
      })

      // Routews for Notificacao Module
      .state('wba.notificacao',{
        url: '/notificacao'
      })

  }
])
