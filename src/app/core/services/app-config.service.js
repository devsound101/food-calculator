(function () {
  'use strict';

  angular
    .module('myApp')
    .service('appConfig', service);

  service.$inject = ['$http'];

  function service($http) {

    var self = {

    };

    return self;

  }

})();
