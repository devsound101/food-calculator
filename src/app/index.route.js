(function() {
  'use strict';

  angular
    .module('myApp')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('inputs', {
        url: '/inputs',
        templateUrl: 'app/inputs/template.html',
        controller: 'InputsController',
        controllerAs: 'vm'
      })
      .state('results', {
        url: '/results',
        templateUrl: 'app/results/template.html',
        controller: 'ResultsController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/inputs');
  }

})();
