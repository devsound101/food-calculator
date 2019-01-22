(function () {
  'use strict';

  angular
    .module('myApp')
    .service('onsEstimationService', service);

  service.$inject = ['OnsData'];

  function service(OnsData) {


    var self = {
      getEstimation: function(income){
        var lowerBoundaries = OnsData.lowerMonthlyIncome.filter(function(v){
          return income >= v;
        });
        var lowerIndex = 0;
        if(lowerBoundaries.length > 0){
          lowerIndex = lowerBoundaries.length - 1;
        }
        var data = {};
        angular.forEach(OnsData.estimation, function(datapoints, fieldId){
          data[fieldId] = datapoints[lowerIndex]*52/12;
        });
        return data;
      }
    };


    return self;

  }

})();
