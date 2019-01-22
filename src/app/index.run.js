(function() {
  'use strict';

  angular
    .module('myApp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {
    $log.debug('runBlock end');
  }

})();
