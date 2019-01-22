(function () {
  'use strict';

  angular
    .module('myApp')
    .directive('inputSectionItem', directive);

  function directive() {
    return {
      restrict: 'AE',
      templateUrl: 'app/inputs/input-section-item.directive.html',
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        section: '=',
        onsEstimation: '=',
        showNextButton: '='
      },
      controller: controller
    }
  }

  controller.inject = ['inputService'];

  function controller(inputService) {
    var vm = this;

    vm.model = inputService.getModel();
    vm.sectionFields = inputService.getSectionFields();

    vm.sectionEstimationSum = function (sectionKey) {
      var fields = vm.sectionFields[sectionKey];
      var sum = 0;
      angular.forEach(fields, function (f) {
        sum += vm.onsEstimation[f.id] || 0;
      });
      return sum;
    };
  }
})();
