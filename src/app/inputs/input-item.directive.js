(function () {
  'use strict';

  angular
    .module('myApp')
    .directive('inputItem', directive);

  function directive() {
    return {
      restrict: 'AE',
      templateUrl: 'app/inputs/input-item.directive.html',
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        ngModel: '=',
        label: '=',
        labelExp: '=',
        min: '=',
        max: '=',
        showPerMonth: '='
      },
      controller: controller
    }
  }

  controller.inject = ['$timeout'];

  function controller($timeout) {
    var vm = this;

    vm.sliderOptions = {
      from: 0,
      to: 15000,
      step: 1,
      //dimension: '£',
      //scale: [],
      //round: 0,
      //smooth: true,
      //vertical: false,
      skin: 'cl',
      //css: null,
      //className: '',
      realtime: true,
      //threshold: null,
      limits: false//,
      //modelLabels: null,
      //watchOptions: true,
      //heterogeneity: null
    };

    $timeout(function () {
      if (vm.min) {
        vm.sliderOptions.from = vm.min;
      }
      if (vm.max) {
        vm.sliderOptions.to = vm.max;
      }
    });
  }
})();
