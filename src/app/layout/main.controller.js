(function () {
  'use strict';

  angular
    .module('myApp')
    .controller('MainController', controller);

  controller.inject = ['$rootScope'];

  /** @ngInject */
  function controller($rootScope) {

    var deregistrationCallbackForStateChangeSuccess;
    deregistrationCallbackForStateChangeSuccess = $rootScope.$on('$stateChangeSuccess', function (e, current) {

    });
    $rootScope.$on('$destroy', deregistrationCallbackForStateChangeSuccess);

  }
})();
