(function () {
  'use strict';

  angular
    .module('myApp')
    .controller('ResultsController', controller);

  controller.inject = ['inputService', 'resultService', '$timeout', '$state'];

  function controller(inputService, resultService, $timeout, $state) {
    var vm = this;

    if(!inputService.getModel().calculated){
      $state.go('inputs');
      return;
    }

    vm.sectionActives = {aboutYou: true};

    vm.model = resultService.getModel();

    vm.losingTypes = [
      {text: 'You', value: 'you'},
      {text: 'Partner', value: 'partner'}
    ];

    vm.onLosingTypeChanged = function (selected) {
      $timeout(function(){
        resultService.calculate();
      });
    };

    vm.downloadPDF = function(){
      resultService.downloadPDF().then(function(){
        alert('Success');
      });
    };

    resultService.calculate();
  }
})();
