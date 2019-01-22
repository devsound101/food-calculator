(function () {
  'use strict';

  angular
    .module('myApp')
    .service('resultService', service);

  service.$inject = ['inputService', '$http'];

  function service(inputService, $http) {

    var _defaultModel = {
      losingType: {text: 'You', value: 'you'},
      costsForFamily: 0,
      shortFallMonthlyBills: 0,
      householdBillsPeriod: [
        '', '', ''
      ],
      lifeAssurance: [
        0, 0, 0
      ],
      debts: 0,
      funeralCost: 3702,
      cacellationCost: 0,
      monthlyIncome: 0,
      housingCost: 0,
      childcare: 0,
      sumLivingCost: 0,
      food: 0,
      gasElectricity: 0,
      water: 0,
      phone: 0,
      councilTax: 0,
      homeInsurance: 0,
      travel: 0,
      sumClothesTV: 0,
      clothes: 0,
      tvBroadband: 0,
      otherSpending: 0,
      numbersInFamily: 0,
      strain: [0, 0, 0]
    };

    var _model = angular.copy(_defaultModel);

    inputService.convertToNumericModel();
    var inputs = inputService.getModel();

    function calculate() {
      _model.numbersInFamily = (inputs.hasPartner.value === 'yes' ? 1 : 0) + inputs.childrenCount.value;
      console.log('numbersInFamily', _model.numbersInFamily);

      _model.debts = inputs.debts;

      //cancellation cost(3 months of bills
      _model.cancellationCost = 0;
      if (_model.numbersInFamily === 0) {
        _model.cancellationCost += inputs.housingPaymentType.value === 'rent' ? inputs.monthlyRent : 0;
        _model.cancellationCost += inputs.gasElectricity + inputs.water + inputs.phone + inputs.councilTax + inputs.homeInsurance + inputs.tvBroadband;
        _model.cancellationCost = _model.cancellationCost * 3;
      }

      //ongoing housing cost
      _model.housingCost = 0;
      if (_model.numbersInFamily > 0) {
        if (inputs.housingPaymentType.value === 'rent') {
          _model.housingCost = inputs.monthlyRent;
        } else if (inputs.housingPaymentType.value === 'mortgage') {
          if (inputs.mortgageCovered.value === 'no') {
            _model.housingCost = inputs.monthlyMortgage;
          }
        }
      }

      //monthly income
      if (_model.losingType.value === 'you') {
        if (inputs.hasPartner.value === 'no') {
          _model.monthlyIncome = 0;
        } else {
          _model.monthlyIncome = inputs.partnerMonthlyIncome;
        }
      } else {
        _model.monthlyIncome = inputs.monthlyIncome;
      }

      //childcare
      _model.childcare = 0;
      if (inputs.childrenCount.value > 0) {
        _model.childcare = inputs.monthlyChildcare;
      }

      //Your monthly bills and living cost
      _model.food = inputs.food * _model.numbersInFamily / (_model.numbersInFamily + 1);
      _model.gasElectricity = _model.numbersInFamily === 0 ? 0 : inputs.gasElectricity;
      _model.water = _model.numbersInFamily === 0 ? 0 : inputs.water;
      _model.phone = _model.numbersInFamily === 0 ? 0 : inputs.phone;
      _model.councilTax = _model.numbersInFamily === 0 ? 0 : inputs.councilTax * 0.75;
      _model.homeInsurance = _model.numbersInFamily === 0 ? 0 : inputs.homeInsurance;
      _model.travel = inputs.travel * _model.numbersInFamily / (_model.numbersInFamily + 1);
      _model.sumLivingCost = _model.food + _model.gasElectricity + _model.water + _model.phone + _model.councilTax + _model.homeInsurance + _model.travel;

      //clothes, TV & Internet
      _model.clothes = _model.numbersInFamily === 0 ? 0 : inputs.clothes;
      _model.tvBroadband = _model.numbersInFamily === 0 ? 0 : inputs.tvBroadband;
      _model.sumClothesTV = _model.clothes + _model.tvBroadband;

      //other spending
      _model.otherSpending = inputs.otherSpending * _model.numbersInFamily / (_model.numbersInFamily + 1);

      calculateHouseholdBillsPeriod();

      _model.lifeAssurance[0] = getLifeAssurance(1);
      _model.lifeAssurance[1] = getLifeAssurance(5);
      _model.lifeAssurance[2] = getLifeAssurance(10);

      //Immediate Costs for Family
      _model.costsForFamily = _model.debts + _model.funeralCost;

      //Shortfall on monthly bills
      _model.shortFallMonthlyBills = _model.monthlyIncome - _model.housingCost - _model.childcare - _model.sumLivingCost;
    }

    function calculateHouseholdBillsPeriod() {
      _model.strain[0] = _model.housingCost + _model.sumLivingCost + _model.childcare;
      _model.strain[1] = _model.strain[0] + _model.sumClothesTV;
      _model.strain[2] = _model.strain[1] + _model.otherSpending;

      for (var i = 0; i < 3; i++) {
        var diff = _model.strain[i] - _model.monthlyIncome;
        var val = diff > 0 ? Math.max(0, Math.round((inputs.savings - inputs.debts) / diff)) : 'Many';
        val += ' months';
        _model.householdBillsPeriod[i] = val;
      }

    }

    function getLifeAssurance(year) {

      var amount = 0;

      //if you have no children
      if (_model.numbersInFamily === 0) {
        amount = _model.debts + _model.funeralCost + _model.cancellationCost - inputs.savings;
      } else { //if you have family
        amount = _model.debts + _model.funeralCost
          - year * 12 * (_model.monthlyIncome - _model.housingCost - _model.sumLivingCost - _model.sumClothesTV - _model.otherSpending);
      }

      amount = amount < 0 ? 0 : mround(amount, 100);

      return amount;
    }

    function mround(num, base) {
      return Math.round(num / base) * base;
    }

    var self = {
      getModel: function () {
        return _model;
      },
      calculate: calculate,
      downloadPDF: function(){
        //@todo integrate with backend to generate PDF
        //console.log('RESULTS:', angular.toJson(_model));
        return $http({
          method: 'POST',
          url: 'http://example.com/api/endpoint',
          data: { result: _model }
        });
      }
    };

    return self;

  }

})();