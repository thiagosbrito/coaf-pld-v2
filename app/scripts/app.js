angular.module('wbaApp', [
  'theme',
  'theme.demos'
  ])
  
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    '$routeProvider',
    '$httpProvider',
    function($stateProvider, $urlRouterProvider, $routeProvider, $httpProvider) {
      'use strict';
      
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
      $urlRouterProvider.otherwise('/dashboard');
      
      $stateProvider
        .state('wba',{
          url: '',
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
            return 'views/' + param.templateFile + '.html';
          }
        })
        .state('wba.dashboard',{
          url: '/dashboard',
          controller: 'MainController',
          templateUrl: 'views/index.html'
        })
        .state('wba.organizacoes', {
          url: '/organizacoes',
          template: '<div ui-view=""></div>'
        })
        .state('wba.organizacoes.listar', {
          url: '/listar',
          templateUrl: 'views/wba/organizacoes/listar.html',
          controller: 'OrganizacoesListarController'
        })
        .state('wba.organizacoes.novo', {
          url: '/novo',
          templateUrl: 'views/wba/organizacoes/novo.html',
          controller: 'OrganizacoesNovoController'
        })
        .state('wba.usuarios', {
          url: '/usuarios',
          template: '<div ui-view=""></div>'
        })
        .state('wba.usuarios.listar',{
          url: '/listar',
          templateUrl: 'views/wba/usuarios/listar.html'
        })
        .state('wba.usuarios.novo',{
          url: '/novo',
          templateUrl: 'views/wba/usuarios/novo.html'
        })
        .state('wba.usuarios.editar',{
          url: '/editar',
          templateUrl: 'views/wba/usuarios/editar.html'
        })


      
    }
  ])
  .constant('baseUrl',{
    "apiUrl":"http://localhost:8000/sso-wba/v1"
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
