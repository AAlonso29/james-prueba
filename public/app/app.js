//PASO 6: En esta seccion se procede a enlazar la capa de presentacion con la logica del sistema, ademas, se otorgan los permisos pertinenters apara la vista de cada una de las pantallas.

(function() {
    'use strict';

    var jamesAuth = angular.module('jamesAuth', [
        'ui.router',
        'ngCookies'
    ]);

    // API Request Interceptor
    jamesAuth.factory('requestInterceptor', [
        '$cookies',
        function($cookies) {
            return {
                request: function(config) {
                    var user = $cookies.get('user'),
                        token = null;

                    if(user) {
                        user = JSON.parse(user);
                        token = user.token ? user.token : null;
                    }

                    if(token) {
                        config.headers = config.headers || {};
                        config.headers.Authorization = token;
                    }

                    return config; 
                }
            };
        }
    ]);

    // Static data constant.
    var staticData = {};

    var userRoles = staticData.userRoles = {
        guest: 1,
        user: 2,
        admin: 4
    };

    staticData.accessLevels = {
        guest: userRoles.guest | userRoles.user | userRoles.admin,
        user: userRoles.user | userRoles.admin,
        admin: userRoles.admin
    };

    jamesAuth.constant('staticData', staticData);

    // Config block.
    jamesAuth.config([
        '$stateProvider',
        '$urlRouterProvider',
        '$httpProvider',
        '$locationProvider',
        'staticData',
        authConfig
    ]);

    function authConfig(
        $stateProvider,
        $urlRouterProvider,
        $httpProvider,
        $locationProvider,
        staticData ) {
        
        // Index route.
        $stateProvider.state('index', {
            url: '/',
            templateUrl: 'app/views/partials/partial-index.html'
        });

        // Login route.
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'app/views/partials/partial-login.html',
            controller: 'LoginController as lc'
        });

        // User area route.
        $stateProvider.state('profile', {
            url: '/profile',
            templateUrl: 'app/views/partials/partial-profile.html',
            controller: 'ProfileController as pc',
            data: {
                accessLevel: staticData.accessLevels.user
            }
        });
        

        // Admin area route.
        $stateProvider.state('admin', {
            url: '/admin',
            templateUrl: 'app/views/partials/partial-admin.html',         
            controller: 'AdminController as ac',
            data: {
                accessLevel: staticData.accessLevels.admin
                
               
            }
        });
        
        // Signup route.
        $stateProvider.state('signup', {
            url: '/signup',
            templateUrl: 'app/views/partials/partial-signup.html',
            controller: 'SignupController as sc'
           
        });

        // Empresa route.
        $stateProvider.state('empresa', {
            url: '/empresa',
            templateUrl: 'app/views/partials/partial-registroEmpresa.html',
            controller: 'empresaController as ec',
            data: {
                accessLevel: staticData.accessLevels.admin
            }
        }); 
        
        // Empresa route.
        $stateProvider.state('usr_cliente', {
            url: '/usr_cliente',
            templateUrl: 'app/views/partials/partial-registroCliente.html',
            controller: 'usr_clienteController as cc',
            data: {
                accessLevel: staticData.accessLevels.user
            }
        });

        $stateProvider.state('general_kpi', {
            url: '/general_kpi',
            templateUrl: 'app/views/partials/partial-registroKpi.html',
            controller: 'general_kpiController as gc',
            data: {
                accessLevel: staticData.accessLevels.user 
            }
        }); 

        $stateProvider.state('getperfil',{
            url: '/getperfil',
            templateUrl: 'app/views/partials/partial-getperfil.html',
            controller: 'getperfilController as gp'
        });

        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('requestInterceptor');
    }

    // Run block.
    jamesAuth.run([
        '$rootScope',
        '$state',
        'authService',
        authRun
    ]);

    function authRun($rootScope, $state, authService) {
        $rootScope.$on('$stateChangeStart', function(event, toState) {
            if(toState.data && toState.data.accessLevel) {
                var user = authService.getUserData();
                if(!(toState.data.accessLevel & user.role)) {
                    event.preventDefault();
                    $state.go('index');
                    return;
                }
            }
        });
    }
})();