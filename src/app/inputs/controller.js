(function () {
  'use strict';

  angular
    .module('myApp')
    .controller('InputsController', controller);

  controller.inject = ['$scope', 'inputService', 'onsEstimationService', '$state'];

  function controller($scope, inputService, onsEstimationService, $state) {
    var vm = this;

    vm.sectionActives = {aboutYou: true};

    vm.model = inputService.getModel();

    vm.sectionFields = inputService.getSectionFields();

    vm.onsEstimation = {};

    vm.outcomeSections = [
      {
        id: 'householdBills',
        name: 'Household Bills',
        hasOnsEstimation: true
      },
      {
        id: 'clothesInternet',
        name: 'Clothes, TV & Internet',
        hasOnsEstimation: true
      },
      {
        id: 'otherExpenses',
        name: 'Other Expenses'
      },
      {
        id: 'savingDebts',
        name: 'Savings & Debts'
      }
    ];

    //watch input of income
    $scope.$watch(function () {
      return inputService.getTotalIncome();
    }, function (nVal, oVal) {
      if (nVal !== oVal) {
        vm.onsEstimation = onsEstimationService.getEstimation(nVal || 0);
        //add default values to all matched fields
        angular.forEach(vm.onsEstimation, function (value, fieldId) {
          vm.model[fieldId] = value;
        });
      }
    });

    vm.hasPartnerTypes = [
      {text: 'Yes', value: 'yes'},
      {text: 'No', value: 'no'}
    ];

    vm.childrenCounts = [];
    for (var i = 0; i < 9; i++) {
      vm.childrenCounts.push({text: i, value: i});
    }

    vm.housingPaymentTypes = [
      {text: 'Rent', value: 'rent'},
      {text: 'Mortgage', value: 'mortgage'},
      {text: 'Own outright', value: 'own-outright'}
    ];
    vm.mortgageCoveredTypes = [
      {text: 'Yes', value: 'yes'},
      {text: 'No', value: 'no'}
    ];

    //when children count is changed
    vm.onChildrenCountChanged = function (selected) {
      vm.model.monthlyChildcare = selected.value * 300;
    };

    vm.makeSectionActive = function (sectionId) {
      angular.forEach(vm.sectionActives, function (v, k) {
        vm.sectionActives[k] = false;
      });
      vm.sectionActives[sectionId] = true;
    };

    vm.getSectionSum = inputService.getSectionSum;

    vm.getTotalOutcome = inputService.getTotalOutcome;
    vm.getTotalIncome = inputService.getTotalIncome;

    vm.results = function(){
      //console.log('INPUTS:', angular.toJson(vm.model));
      vm.model.calculated = true;
      $state.go('results');
    };
  }
})();
