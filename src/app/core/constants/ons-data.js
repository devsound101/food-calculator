(function () {
  'use strict';

  angular
    .module('myApp')
    .constant('OnsData', {
      lowerMonthlyIncome: [0.00, 771.33, 1148.33, 1551.33, 2002.00, 2487.33, 3016.00, 3709.33, 4671.33, 6248.67],
      estimation: {
        food: [30.50, 37.80, 44.50, 49.60, 54.30, 63.30, 65.00, 71.80, 78.70, 92.60],
        gasElectricity: [20.20, 22.50, 23.30, 24.00, 25.60, 26.10, 27.50, 28.30, 30.90, 37.20],
        water: [7.00, 7.50, 7.90, 8.20, 8.60, 8.50, 9.30, 9.50, 9.40, 11.00],
        phone: [5.10, 6.40, 7.50, 8.60, 10.10, 11.00, 12.80, 13.50, 14.70, 15.90],
        councilTax: [7.10, 10.80, 15.70, 19.00, 21.80, 23.80, 27.20, 28.80, 31.50, 45.10],
        homeInsurance: [1.90, 3.60, 3.70, 3.90, 4.70, 5.30, 5.70, 6.20, 6.60, 9.10],
        travel: [11.60, 15.40, 26.10, 30.60, 41.30, 51.10, 54.90, 68.80, 82.40, 111.30],
        clothes: [6.00, 7.40, 13.10, 13.30, 17.40, 24.90, 26.30, 33.20, 36.50, 47.90],
        tvBroadband: [5.00, 5.40, 6.90, 8.50, 9.60, 10.00, 10.90, 12.00, 12.10, 13.60]
      }
    });

})();
