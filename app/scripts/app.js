angular.module('wbaApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngAnimate',
  'easypiechart',
  'NgSwitchery',
  'sun.scrollable',
  'ui.bootstrap',
  'ui.select',
  'theme.core.templates',
  'theme.core.template_overrides',
  'ui.router',
  'ui.utils.masks',
  'angular-loading-bar',
  'theme.demos',
  'toaster',
  'oitozero.ngSweetAlert'
  // ,
  // 'csrf-cross-domain'
  ])
  .constant('nanoScrollerDefaults', {
    nanoClass: 'scroll-pane',
    paneClass: 'scroll-track',
    sliderClass: 'scroll-thumb',
    contentClass: 'scroll-content'
  })
  .run(['$window', function ($window) {
    $window.ngGrid.config = {
        footerRowHeight: 40,
        headerRowHeight: 40,
        rowHeight: 40
    };
  }])
  .run([
    '$state',
    '$rootScope',
    function ($state, $rootScope) {
      $rootScope.$state = $state;
      $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
        console.log('$stateChangeStart to '+toState.to+'- fired when the transition begins. toState,toParams : \n',toState, toParams);
      });

      $rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams){
        console.log('$stateChangeError - fired when an error occurs during transition.');
        console.log(arguments);
      });

      $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
        console.log('$stateChangeSuccess to '+toState.name+'- fired once the state transition is complete.');
      });

      $rootScope.$on('$viewContentLoaded',function(event){
        console.log('$viewContentLoaded - fired after dom rendered',event);
      });

      $rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
        console.log('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name.');
        console.log(unfoundState, fromState, fromParams);
      });    
    }
  ])
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

      // $httpProvider.defaults.transformRequest = function(data){
      //     if (data === undefined) {
      //         return data;
      //     }
      //     return $.param(data);
      // }

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
        .state('wba.comercial.hierarquias.listar',{})
        .state('wba.comercial.hierarquias.novo',{})
        .state('wba.comercial.hierarquias.editar',{})

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
        // Routews for Cobranca Module
        .state('wba.cobranca',{
          url: '/cobranca'
        })

        // Routews for Checagem Module
        .state('wba.checagem',{
          url: '/checagem'
        })

        // Routews for Notificacao Module
        .state('wba.notificacao',{
          url: '/notificacao'
        })

      
    }
  ])
  .constant('baseUrl',{
    "apiUrl"          :     "http://localhost:8000/sso-wba/v1",
    "apiEmpresas"     :     "http://192.168.99.100:8081/empresas/v1",
    "apiComercial"    :     "http://192.168.99.100:9090/comercial/v1"
  })
  .directive('demoOptions', function () {
    return {
      restrict: 'C',
      link: function (scope, element, attr) {
        element.find('.demo-options-icon').click( function () {
          element.toggleClass('active');
        });
      }
    };
  })
  

  // var auth = {};
  // var logout = function(){
  //     console.log('*** LOGOUT');
  //     auth.loggedIn = false;
  //     auth.authz = null;
  //     window.location = auth.logoutUrl;
  // };

  // angular.element(document).ready(function ($http) {
  //   var keycloakAuth = new Keycloak('../keycloak.json');
  //   auth.loggedIn = false;

  //   keycloakAuth.init({ onLoad: 'login-required' }).success(function () {
  //       auth.loggedIn = true;
  //       auth.authz = keycloakAuth;
  //       auth.logoutUrl = "http://192.168.99.100:8080/realms/idtrus/protocol/openid-connect/logout?redirect_uri=http://localhost:9000/#/";
  //       module.factory('Auth', function() {
  //           return auth;
  //       });
  //       angular.bootstrap(document, ["wbaApp"]);
  //   }).error(function () {
  //           window.location.reload();
  //       });

  // });

  // module.factory('authInterceptor', function($q, Auth) {
  //     return {
  //         request: function (config) {
  //             var deferred = $q.defer();
  //             if (Auth.authz.token) {
  //                 Auth.authz.updateToken(5).success(function() {
  //                     config.headers = config.headers || {};
  //                     config.headers.Authorization = 'Bearer ' + Auth.authz.token;

  //                     deferred.resolve(config);
  //                 }).error(function() {
  //                         deferred.reject('Failed to refresh token');
  //                     });
  //             }
  //             return deferred.promise;
  //         },
  //         requestError: function () {
  //           return function(promise) {
  //             return promise.then(function(response) {
  //               return response;
  //             }, function(response) {
  //               if (response.status == 401) {
  //                 console.log('session timeout?');
  //                 logout();
  //               } else if (response.status == 403) {
  //                 alert("Forbidden");
  //               } else if (response.status == 404) {
  //                 alert("Not found");
  //               } else if (response.status) {
  //                 if (response.data && response.data.errorMessage) {
  //                   alert(response.data.errorMessage);
  //                 } else {
  //                   alert("An unexpected server error has occurred");
  //                 }
  //               }
  //               return $q.reject(response);
  //             });
  //           };
  //         }
  //     };
  // });




  // module.config(function($httpProvider) {      
  //     $httpProvider.interceptors.push('authInterceptor');

  // });
