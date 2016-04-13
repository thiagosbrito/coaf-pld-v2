angular
  .module('wbaApp')
  .controller('NavigationController', [
    '$scope',
    '$location',
    '$timeout',
    function($scope, $location, $timeout) {
      'use strict';
      // $scope.menu = [
      //   // {
      //   //   label: 'Usuários e Permissões',
      //   //   iconClasses: 'ti ti-lock',
      //   //   children: [
      //   //     {
      //   //       label: 'Organizações',
      //   //       url: '#/usuarios-permissoes/organizacoes/listar'
      //   //     },
      //   //     {
      //   //       label: 'Grupos',
      //   //       url: '#/usuarios-permissoes/grupos/listar'
      //   //     },
      //   //     {
      //   //       label: 'Roles',
      //   //       url: '#/usuarios-permissoes/roles/listar'
      //   //     },
      //   //     {
      //   //       label: 'Permissões',
      //   //       url: '#/usuarios-permissoes/roles/listar'
      //   //     },
      //   //     {
      //   //       label: 'Módulos',
      //   //       url: '#/usuarios-permissoes/modulos/listar'
      //   //     }
      //   //   ]
      //   // },
      //   {
      //     label: 'Visão Geral',
      //     iconClasses: 'ti ti-dashboard',
      //     url: '#/dashboard'
      //   },
      //   {
      //     label: 'Cadastro',
      //     iconClasses: 'ti ti-panel',
      //     children: [
      //       // {
      //       //   label: 'Empresas',
      //       //   url: '#/empresas/listar'
      //       // },
      //       {
      //         label: 'Carteiras',
      //         url: '#/operacoes/carteiras/listar'
      //       },
      //       {
      //         label: 'Plataformas',
      //         url: '#/comercial/plataformas/listar'
      //       },
      //       {
      //         label: 'Hierarquia Comercial',
      //         url: '#/comercial/hierarquias/listar'
      //       }
      //     ]
      //   },
      //   {
      //     label: 'Comercial',
      //     iconClasses: 'ti ti-briefcase',
      //     children: [
      //       {
      //         label: 'Oportunidades'
      //       },
      //       {
      //         label: 'Atividades',
      //         children: [
      //           {
      //             label: 'Visitas'
      //           },
      //           {
      //             label: 'Tarefas'
      //           },
      //           {
      //             label: 'Anotações'
      //           },
      //           {
      //             label: 'Ligações'
      //           }
      //         ]
      //       },
      //       {
      //         label: 'Cliente potencial'
      //       },
      //       {
      //         label: 'Contatos'
      //       }
      //     ]
      //   },
      //   {
      //     label: 'Operações',
      //     iconClasses: 'ti ti-bolt',
      //     children: [
      //       {
      //         label: 'Operações',
      //         url: '#/operacoes/listar'
      //       },
      //       {
      //         label: 'Recebíveis',
      //         url: '#/operacoes/recebiveis/listar'
      //       },
      //       {
      //         label: 'Tarifas',
      //         url: '#/operacoes/tarifas/listar'
      //       },
      //       {
      //         label: 'Workflow',
      //         url: '#/operacoes/workflow/listar'
      //       }
      //     ]
      //   },
      //   {
      //     label: 'Checagem',
      //     iconClasses: 'ti ti-check-box',
      //     children: [
      //       {
      //         label: 'Agendamentos'
      //       },
      //       {
      //         label: 'Títulos'
      //       },
      //       {
      //         label: 'Conferência'
      //       }
      //     ]
      //   },
      //   {
      //     label: 'Cobrança',
      //     iconClasses: 'ti ti-money',
      //     children: [
      //       {
      //         label: 'Boletos'
      //       },
      //       {
      //         label: 'Arquivos Eletrônicos',
      //         children: [
      //           {
      //             label: 'Remessa'
      //           },
      //           {
      //             label: 'Retorno'
      //           }
      //         ]
      //       }
      //     ]
      //   },
      //   {
      //     label: 'Relatórios',
      //     iconClasses: 'ti ti-stats-up'
      //   },
      //   {
      //     label: 'Configurações',
      //     iconClasses: 'ti ti-settings',
      //     children: [
      //       {
      //         label: 'Empresas',
      //         url: '#/empresas/listar'
      //       },
      //       {
      //         label: 'Usuários e Permissões',
      //         url: '#/usuarios-permissoes/organizacoes/listar'
      //       },
      //       {
      //         label: 'Parâmetros do sistema',
      //         url: '#/usuarios-permissoes/grupos/listar'
      //       },
      //       {
      //         label: 'Auditoria',
      //         url: '#/usuarios-permissoes/grupos/listar'
      //       },
      //       {
      //         label: 'Manutenção',
      //         url: '#/usuarios-permissoes/grupos/listar'
      //       }
      //     ]
      //   },
      //   {
      //     label: 'Notificações',
      //     iconClasses: 'ti ti-announcement',
      //     children: [
      //       {
      //         label: 'Emails'
      //       },
      //       {
      //         label: 'SMTP'
      //       }
      //     ]
      //   }
      //   // ,
        
      //   // {
      //   //   label: 'Explore',
      //   //   iconClasses: '',
      //   //   separator: true
      //   // }, 
      //   // {
      //   //   label: 'Dashboard',
      //   //   iconClasses: 'ti ti-home',
      //   //   html: '<span class="badge badge-info">2</span>',
      //   //   url: '#/template/',
      //   // },
      //   // {
      //   //   label: 'HTML Version',
      //   //   iconClasses: 'ti ti-cup',
      //   //   url: '../../',
      //   // },
      //   // {
      //   //   label: 'Layouts',
      //   //   iconClasses: 'ti ti-layout',
      //   //   children: [
      //   //     {
      //   //       label: 'Grid Scaffolding',
      //   //       url: '#/template/layout-grid'
      //   //     },
      //   //     {
      //   //       label: 'Horizontal Nav',
      //   //       url: '#/template/layout-horizontal'
      //   //     },
      //   //     {
      //   //       label: 'Boxed',
      //   //       url: '#/template/layout-boxed'
      //   //     }
      //   //   ]
      //   // },
      //   // {
      //   //   label: 'UI Kit',
      //   //   iconClasses: 'ti ti-view-list-alt',
      //   //   children: [
      //   //     {
      //   //       label: 'Typography',
      //   //       url: '#/template/ui-typography'
      //   //     },
      //   //     {
      //   //       label: 'Buttons',
      //   //       url: '#/template/ui-buttons'
      //   //     },
      //   //     {
      //   //       label: 'Modals',
      //   //       url: '#/template/ui-modals'
      //   //   },
      //   //   {
      //   //     label: 'Progress',
      //   //     url: '#/template/ui-progressbars'
      //   //   },
      //   //   {
      //   //     label: 'Pagination',
      //   //     url: '#/template/ui-paginations'
      //   //   },
      //   //   {
      //   //     label: 'Breadcrumbs',
      //   //     url: '#/template/ui-breadcrumbs'
      //   //   }, {
      //   //     label: 'Labels & Badges',
      //   //     url: '#/template/ui-labelsbadges',
      //   //   }, {
      //   //     label: 'Alerts',
      //   //     url: '#/template/ui-alerts',
      //   //   }, {
      //   //     label: 'Tabs',
      //   //     url: '#/template/ui-tabs',
      //   //   }, {
      //   //     label: 'FontAwesome Icons',
      //   //     url: '#/template/ui-icons-fontawesome',
      //   //   }, {
      //   //     label: 'Themify Icons',
      //   //     url: '#/template/ui-icons-themify',
      //   //   }, {
      //   //     label: 'Wells',
      //   //     url: '#/template/ui-wells'
      //   //   }, {
      //   //     label: 'Images & Carousel',
      //   //     url: '#/template/ui-imagecarousel'
      //   //   }]
      //   // }, {
      //   //   label: 'Components',
      //   //   iconClasses: 'ti ti-control-shuffle',
      //   //   children: [{
      //   //     label: 'Tiles',
      //   //     url: '#/template/ui-tiles'
      //   //   }, {
      //   //     label: 'Bootbox',
      //   //     url: '#/template/components-bootbox'
      //   //   }, {
      //   //     label: 'Pines Notifications',
      //   //     url: '#/template/components-notifications'
      //   //   }, {
      //   //     label: 'Sliders & Ranges',
      //   //     url: '#/template/ui-sliders',
      //   //   }, {
      //   //     label: 'Pulsating Elements',
      //   //     url: '#/template/components-pulsate'
      //   //   }, {
      //   //     label: 'jQuery Knob',
      //   //     url: '#/template/components-knob'
      //   //   }]
      //   // }, {
      //   //   label: 'Forms',
      //   //   iconClasses: 'ti ti-pencil',
      //   //   children: [{
      //   //     label: 'Form Layout',
      //   //     url: '#/template/form-layout',
      //   //   }, {
      //   //     label: 'Components',
      //   //     url: '#/template/form-components',
      //   //   }, {
      //   //     label: 'Pickers',
      //   //     url: '#/template/form-pickers'
      //   //   }, {
      //   //     label: 'Form Wizard',
      //   //     url: '#/template/form-wizard'
      //   //   }, {
      //   //     label: 'Validation',
      //   //     url: '#/template/form-validation',
      //   //   }, {
      //   //     label: 'Form Masks',
      //   //     url: '#/template/form-masks'
      //   //   }, {
      //   //     label: 'Advanced Uploaders',
      //   //     url: '#/template/form-fileupload',
      //   //   }, {
      //   //     label: 'WYSIWYG Editor',
      //   //     url: '#/template/form-wysiwyg',
      //   //   }, {
      //   //     label: 'Inline Editor',
      //   //     url: '#/template/form-xeditable',
      //   //   }]
      //   // }, {
      //   //   label: 'Panels',
      //   //   iconClasses: 'ti ti-settings',
      //   //   hideOnHorizontal: true,
      //   //   children: [{
      //   //     label: 'Panels',
      //   //     url: '#/template/ui-panels',
      //   //   }, {
      //   //     label: 'Draggable Panels',
      //   //     url: '#/template/ui-advancedpanels'
      //   //   }]
      //   // }, {
      //   //   label: 'Tables',
      //   //   iconClasses: 'ti ti-layout-grid3',
      //   //   children: [{
      //   //     label: 'Tables',
      //   //     url: '#/template/tables-basic'
      //   //   }, {
      //   //     label: 'ngGrid',
      //   //     url: '#/template/tables-data',
      //   //   }, {
      //   //     label: 'Responsive Tables',
      //   //     url: '#/template/tables-responsive'
      //   //   }, {
      //   //     label: 'Editable Tables',
      //   //     url: '#/template/tables-editable',
      //   //   }]
      //   // }, {
      //   //   label: 'Analytics',
      //   //   iconClasses: 'ti ti-stats-up',
      //   //   hideOnHorizontal: true,
      //   //   children: [{
      //   //     label: 'Flot',
      //   //     url: '#/template/charts-flot',
      //   //   }, {
      //   //     label: 'Morris.js',
      //   //     url: '#/template/charts-morrisjs'
      //   //   }, {
      //   //     label: 'Easy Pie Chart',
      //   //     url: '#/template/charts-easypiechart'
      //   //   }, {
      //   //     label: 'Sparklines',
      //   //     url: '#/template/charts-sparklines',
      //   //   }]
      //   // }, {
      //   //   label: 'Maps',
      //   //   iconClasses: 'ti ti-map-alt',
      //   //   hideOnHorizontal: true,
      //   //   children: [{
      //   //     label: 'Google Maps',
      //   //     url: '#/template/maps-google'
      //   //   }, {
      //   //     label: 'Vector Maps',
      //   //     url: '#/template/maps-vector',
      //   //   }]
      //   // }, {
      //   //   label: 'Pages',
      //   //   iconClasses: 'ti ti-file',
      //   //   hideOnHorizontal: true,
      //   //   children: [{
      //   //     label: 'Profile',
      //   //     url: '#/template/extras-profile'
      //   //   }, {
      //   //     label: 'FAQ',
      //   //     url: '#/template/extras-faq',
      //   //   }, {
      //   //     label: 'Invoice',
      //   //     url: '#/template/extras-invoice'
      //   //   }, {
      //   //     label: 'Registration',
      //   //     url: '#/template/extras-registration'
      //   //   }, {
      //   //     label: 'Password Reset',
      //   //     url: '#/template/extras-forgotpassword'
      //   //   }, {
      //   //     label: 'Login',
      //   //     url: '#/template/extras-login'
      //   //   }, {
      //   //     label: '404 Page',
      //   //     url: '#/template/extras-404'
      //   //   }, {
      //   //     label: '500 Page',
      //   //     url: '#/template/extras-500'
      //   //   }]
      //   // }, {
      //   //   label: 'Functional Apps',
      //   //   hideOnHorizontal: true,
      //   //   separator: true
      //   // }, {
      //   //   label: 'Inbox',
      //   //   iconClasses: 'ti ti-email',
      //   //   url: '#/template/inbox',
      //   //   html: '<span class="badge badge-danger">3</span>'
      //   // }, {
      //   //   label: 'Calendar',
      //   //   iconClasses: 'ti ti-calendar',
      //   //   url: '#/template/calendar',
      //   //   html: '<span class="badge badge-warning">1</span>'
      //   // }
      // ];

      $scope.menu = [
        {
          label: 'Usuários e Permissões',
          iconClasses: 'ti ti-lock',
          children: [
            {
              label: 'Organizações',
              url: '#/usuarios-permissoes/organizacoes/listar'
            },
            {
              label: 'Grupos',
              url: '#/usuarios-permissoes/grupos/listar'
            },
            {
              label: 'Roles',
              url: '#/usuarios-permissoes/roles/listar'
            },
            {
              label: 'Permissões',
              url: '#/usuarios-permissoes/roles/listar'
            },
            {
              label: 'Módulos',
              url: '#/usuarios-permissoes/modulos/listar'
            }
          ]
        },
        {
          label: 'Empresas',
          iconClasses: 'ti ti-home',
          children: [
            {
              label: 'Listar Empresas',
              url: '#/empresas/listar'
            }
          ]
        },
        {
          label: 'Comercial',
          iconClasses: 'ti ti-briefcase',
          children: [
            {
              label: 'Hierarquias',
              url: '#/comercial/hierarquias/listar'
            },
            {
              label: 'Plataformas',
              url: '#/comercial/plataformas/listar'
            }
          ]
        },
        {
          label: 'Operações',
          iconClasses: 'ti ti-bolt',
          children: [
            {
              label: 'Carteiras',
              url: '#/operacoes/carteiras/listar'
            },
            {
              label: 'Operações',
              url: '#/operacoes/listar'
            },
            {
              label: 'Recebíveis',
              url: '#/operacoes/recebiveis/listar'
            },
            {
              label: 'Tarifas',
              url: '#/operacoes/tarifas/listar'
            },
            {
              label: 'Workflow',
              url: '#/operacoes/workflow/listar'
            }
          ]
        },
        {
          label: 'Checagem',
          iconClasses: 'ti ti-check-box',
          children: [
            {
              label: 'Agendamentos'
            },
            {
              label: 'Títulos'
            },
            {
              label: 'Conferência'
            }
          ]
        },
        {
          label: 'Cobrança',
          iconClasses: 'ti ti-money',
          children: [
            {
              label: 'Boletos'
            },
            {
              label: 'Arquivos Eletrônicos',
              children: [
                {
                  label: 'Remessa'
                },
                {
                  label: 'Retorno'
                }
              ]
            }
          ]
        },
        {
          label: 'Notificações',
          iconClasses: 'ti ti-announcement',
          children: [
            {
              label: 'Emails'
            },
            {
              label: 'SMTP'
            }
          ]
        }];

      var setParent = function(children, parent) {
        angular.forEach(children, function(child) {
          child.parent = parent;
          if (child.children !== undefined) {
            setParent(child.children, child);
          }
        });
      };

      $scope.findItemByUrl = function(children, url) {
        for (var i = 0, length = children.length; i < length; i++) {
          if (children[i].url && children[i].url.replace('#', '') === url) {
            return children[i];
          }
          if (children[i].children !== undefined) {
            var item = $scope.findItemByUrl(children[i].children, url);
            if (item) {
              return item;
            }
          }
        }
      };

      setParent($scope.menu, null);

      $scope.openItems = []; $scope.selectedItems = []; $scope.selectedFromNavMenu = false;

      $scope.select = function(item) {
        console.log(item);
        // close open nodes
        if (item.open) {
          item.open = false;
          return;
        }
        for (var i = $scope.openItems.length - 1; i >= 0; i--) {
          $scope.openItems[i].open = false;
        }
        $scope.openItems = [];
        var parentRef = item;
        while (parentRef !== null) {
          parentRef.open = true;
          $scope.openItems.push(parentRef);
          parentRef = parentRef.parent;
        }

        // handle leaf nodes
        if (!item.children || (item.children && item.children.length < 1)) {
          $scope.selectedFromNavMenu = true;
          for (var j = $scope.selectedItems.length - 1; j >= 0; j--) {
            $scope.selectedItems[j].selected = false;
          }
          $scope.selectedItems = [];
          parentRef = item;
          while (parentRef !== null) {
            parentRef.selected = true;
            $scope.selectedItems.push(parentRef);
            parentRef = parentRef.parent;
          }
        }
      };

      $scope.highlightedItems = [];
      var highlight = function(item) {
        var parentRef = item;
        while (parentRef !== null) {
          if (parentRef.selected) {
            parentRef = null;
            continue;
          }
          parentRef.selected = true;
          $scope.highlightedItems.push(parentRef);
          parentRef = parentRef.parent;
        }
      };

      var highlightItems = function(children, query) {
        angular.forEach(children, function(child) {
          if (child.label.toLowerCase().indexOf(query) > -1) {
            highlight(child);
          }
          if (child.children !== undefined) {
            highlightItems(child.children, query);
          }
        });
      };

      // $scope.searchQuery = '';
      $scope.$watch('searchQuery', function(newVal, oldVal) {
        var currentPath = '#' + $location.path();
        if (newVal === '') {
          for (var i = $scope.highlightedItems.length - 1; i >= 0; i--) {
            if ($scope.selectedItems.indexOf($scope.highlightedItems[i]) < 0) {
              if ($scope.highlightedItems[i] && $scope.highlightedItems[i] !== currentPath) {
                $scope.highlightedItems[i].selected = false;
              }
            }
          }
          $scope.highlightedItems = [];
        } else
        if (newVal !== oldVal) {
          for (var j = $scope.highlightedItems.length - 1; j >= 0; j--) {
            if ($scope.selectedItems.indexOf($scope.highlightedItems[j]) < 0) {
              $scope.highlightedItems[j].selected = false;
            }
          }
          $scope.highlightedItems = [];
          highlightItems($scope.menu, newVal.toLowerCase());
        }
      });

      $scope.$on('$routeChangeSuccess', function() {
        if ($scope.selectedFromNavMenu === false) {
          var item = $scope.findItemByUrl($scope.menu, $location.path());
          if (item) {
            $timeout(function() {
              $scope.select(item);
            });
          }
        }
        $scope.selectedFromNavMenu = false;
        $scope.searchQuery = '';
      });
    }
  ]
);