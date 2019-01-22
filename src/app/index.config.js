(function() {
  'use strict';

  angular
    .module('myApp')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-center';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = false;
    toastrConfig.closeButton = true;
    toastrConfig.closeHtml = '<a class="btn-close"><img src="assets/img/close-button.svg"></a>';
    toastrConfig.preventDuplicates = false;


  }

})();
