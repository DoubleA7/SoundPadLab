'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    // Home state routing
    $stateProvider
      .state('core', {
        abstract: true,
        template: '<ui-view/>',
        views: {
          '': {
            templateUrl: 'modules/core/client/views/core.client.view.html',
            controller: 'CoreController'
          }
        }
      })
    .state('core.home', {
      url: '/',
      templateUrl: 'modules/core/client/views/home.client.view.html'
    })
    .state('core.about', {
      url: '/about',
      templateUrl: 'modules/core/client/views/about.client.view.html',
      controller: 'AboutController'
    })
    .state('core.contact', {
      url: '/contact',
      templateUrl: 'modules/core/client/views/contact.client.view.html',
      controller: 'ContactController'
    })
    .state('core.team', {
      url: '/team',
      templateUrl: 'modules/core/client/views/team.client.view.html',
      controller: 'TeamController'
    })
    .state('not-found', {
      url: '/not-found',
      templateUrl: 'modules/core/client/views/404.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('bad-request', {
      url: '/bad-request',
      templateUrl: 'modules/core/client/views/400.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('forbidden', {
      url: '/forbidden',
      templateUrl: 'modules/core/client/views/403.client.view.html',
      data: {
        ignoreState: true
      }
    });
  }
]);
