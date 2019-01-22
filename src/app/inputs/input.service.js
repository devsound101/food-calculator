(function () {
  'use strict';

  angular
    .module('myApp')
    .service('inputService', service);

  service.$inject = [];

  function service() {


    var _sectionFields = {
      aboutYou: [],
      housingPayments: [],
      householdBills: [
        {id: 'food', name: 'Food and Housekeeping', max: 2000, showPerMonth: true},
        {id: 'gasElectricity', name: 'Gas/Electricity', max: 1000, showPerMonth: true},
        {id: 'water', name: 'Water', max: 500, showPerMonth: true},
        {id: 'phone', name: 'Phone', max: 1000, showPerMonth: true},
        {id: 'councilTax', name: 'Council Tax', max: 1000, showPerMonth: true},
        {id: 'homeInsurance', name: 'Home Insurance', max: 1000, showPerMonth: true},
        {id: 'travel', name: 'Essential Travel', max: 2000, exp: '(to work, school and shops)', showPerMonth: true}
      ],
      clothesInternet: [
        {id: 'clothes', name: 'Clothes', max: 1000, showPerMonth: true},
        {id: 'tvBroadband', name: 'TV/Boadband', max: 500, showPerMonth: true}
      ],
      otherExpenses: [
        {id: 'otherSpending', name: 'Other spending each month', max: 4000, exp: '(going out, gym, holidays)', showPerMonth: true}
      ],
      savingDebts: [
        {id: 'savings', name: 'How much do you have in savings?', max: 50000, exp: 'total savings', showPerMonth: false},
        {id: 'debts', name: '   Do you have any other debts?', max: 20000, exp: 'total debts', showPerMonth: false}
      ]
    };

    var _defaultModel = {
      monthlyIncome: 0,
      partnerMonthlyIncome: 0,
      monthlyChildcare: 0,
      hasPartner: {text: 'Please select', value: ''},
      childrenCount: {text: '0', value: 0},
      housingPaymentType: {text: 'Please select', value: ''},
      monthlyRent: 0,
      monthlyMortgage: 0,
      mortgageCovered: {text: 'Please select', value: ''},
      food: 0,
      gasElectricity: 0,
      water: 0,
      phone: 0,
      councilTax: 0,
      homeInsurance: 0,
      travel: 0,
      clothes: 0,
      tvBroadband: 0,
      otherSpending: 0,
      savings: 0,
      debts: 0
    };

    var _model = angular.copy(_defaultModel);

    var self = {
      getModel: function () {
        return _model;
      },
      getSectionFields: function () {
        return _sectionFields;
      },
      getTotalIncome: function () {
        var sum = _model.monthlyIncome * 1;
        if (_model.hasPartner && _model.hasPartner.value === 'yes') {
          sum += _model.partnerMonthlyIncome * 1;
        }
        return sum;
      },
      getTotalOutcome: function () {
        var sum = self.getSectionSum('householdBills') + self.getSectionSum('clothesInternet') +  + self.getSectionSum('otherExpenses');
        if (_model.housingPaymentType.value === 'rent') {
          sum += _model.monthlyRent * 1;
        } else if (_model.housingPaymentType.value === 'mortgage') {
          sum += _model.monthlyMortgage * 1;
        }
        if(_model.childrenCount.value > 0){
          sum += _model.monthlyChildcare * 1;
        }
        return sum;
      },
      getSectionSum: function (sectionKey) {
        var sum = 0;
        if (sectionKey === 'housingPayments') {
          if (_model.housingPaymentType) {
            if (_model.housingPaymentType.value === 'rent') {
              sum += _model.monthlyRent * 1;
            } else if (_model.housingPaymentType.value === 'mortgage') {
              sum += _model.monthlyMortgage * 1;
            }
          }
          return sum;
        }
        if (sectionKey === 'aboutYou') {
          if (_model.childrenCount && _model.childrenCount.value > 0) {
            sum += _model.monthlyChildcare * 1;
          }
          return sum;
        }
        var fields = _sectionFields[sectionKey];
        angular.forEach(fields, function (f) {
          sum += _model[f.id] * 1 || 0;
        });
        return sum;
      },
      convertToNumericModel: function () {
        angular.forEach(_model, function (value, key) {
          if (typeof(value) === 'string') {
            _model[key] = value * 1;
          }
        });
      }
    };

    return self;

  }

})();