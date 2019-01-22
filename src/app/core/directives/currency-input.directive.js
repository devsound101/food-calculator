(function () {
  'use strict';

  angular
    .module('myApp')
    .directive('currencyInput', directive);

  /* @ngInject */
  function directive($filter, $locale) {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, controller) {
        var hardCap, min, max, currencySymbol, ngRequired;
        var active = true;
        var fraction = 2;
        attrs.$observe('ngCurrency', function (value) {
          active = (value !== 'false');
          if (active) {
            reformat();
          }
          else {
            controller.$viewValue = controller.$$rawModelValue;
            controller.$render();
          }
        });
        attrs.$observe('hardCap', function (value) {
          hardCap = (value === 'true');
          revalidate();
        });
        attrs.$observe('min', function (value) {
          min = value ? Number(value) : undefined;
          revalidate();
        });
        attrs.$observe('max', function (value) {
          max = value ? Number(value) : undefined;
          revalidate();
        });
        attrs.$observe('currencySymbol', function (value) {
          currencySymbol = value;
          reformat();
        });
        attrs.$observe('ngRequired', function (value) {
          ngRequired = value;
          revalidate();
        });
        attrs.$observe('fraction', function (value) {
          fraction = value || 2;
          reformat();
          revalidate();
        });
        controller.$parsers.push(function (value) {
          if (active && [undefined, null, ''].indexOf(value) === -1) {
            value = clearValue(value);
            value = keepInRange(Number(value));
            return value;
          }
          return value;
        });
        controller.$formatters.push(function (value) {
          if (active && [undefined, null, ''].indexOf(value) === -1) {
            return $filter('currency')(value, getCurrencySymbol(), fraction);
          }
          return value;
        });
        controller.$validators.min = function (value) {
          if (!ngRequired && ([undefined, null, ''].indexOf(value) !== -1 || isNaN(value))) {
            return true;
          }
          return !active ||
            [undefined, null].indexOf(min) !== -1 || isNaN(min) ||
            value >= min;
        };
        controller.$validators.max = function (value) {
          if (!ngRequired && ([undefined, null, ''].indexOf(value) !== -1 || isNaN(value))) {
            return true;
          }
          return !active ||
            [undefined, null].indexOf(max) !== -1 || isNaN(max) ||
            value <= max;
        };
        controller.$validators.fraction = function (value) {
          return !active || !value || !isNaN(value);
        };
        function reformat() {
          if (active) {
            var value = void 0;
            var updateOn = void 0;
            if (controller.$options) {
              // HACK(nick-woodward): this is to maintain backwards compatability with Angular 1.5.9 and lower.
              // TODO(nick-woodward): This should be removed when ngCurrency does a 2.0.0 release
              // Reference: https://github.com/angular/angular.js/commit/296cfce40c25e9438bfa46a0eb27240707a10ffa
              updateOn = controller.$options.getOption ? controller.$options.getOption('updateOn') : controller.$options.updateOn;
            }
            if (updateOn === 'blur') {
              value = controller.$viewValue;
              for (var i = controller.$parsers.length - 1; i >= 0; i--) {
                value = controller.$parsers[i](value);
              }
            }
            else {
              value = controller.$$rawModelValue;
            }
            if(value === ''){
              value = 0;
            }
            for (var i = controller.$formatters.length - 1; i >= 0; i--) {
              value = controller.$formatters[i](value);
            }
            controller.$viewValue = value;
            controller.$render();
          }
        }

        function revalidate() {
          controller.$validate();
          if (active) {
            var value = keepInRange(controller.$$rawModelValue);
            if (value !== controller.$$rawModelValue) {
              controller.$setViewValue(value.toFixed(fraction));
              controller.$commitViewValue();
              reformat();
            }
          }
        }

        function keepInRange(value) {
          if (hardCap) {
            if (max !== undefined && value > max) {
              value = max;
            }
            else if (min !== undefined && value < min) {
              value = min;
            }
          }
          return value;
        }

        scope.$on('currencyRedraw', function () {
          revalidate();
          reformat();
        });
        element.bind('focus', function () {
          if (active) {
            var groupRegex = new RegExp("\\" + $locale.NUMBER_FORMATS.GROUP_SEP, 'g');
            var value = [undefined, null, ''].indexOf(controller.$$rawModelValue) === -1 ? $filter('number')(controller.$$rawModelValue, fraction).replace(groupRegex, '') : controller.$$rawModelValue;
            if (isNaN(parseFloat(value)) || value * 1 === 0) {
              value = '';
            }
            if (controller.$viewValue !== value) {
              controller.$viewValue = value;
              controller.$render();
              element.triggerHandler('focus');
            }
          }
        });
        element.bind('blur', reformat);
        // TODO: Rewrite this parsing logic to more readable.
        function decimalRex(dChar) {
          return RegExp('\\d|\\-|\\' + dChar, 'g');
        }

        function clearRex(dChar) {
          return RegExp('\\-{0,1}((\\' + dChar + ')|([0-9]{1,}\\' + dChar + '?))&?[0-9]{0,' + fraction + '}', 'g');
        }

        function clearValue(value) {
          value = String(value);
          var dSeparator = $locale.NUMBER_FORMATS.DECIMAL_SEP;
          var cleared = null;
          if (value.indexOf($locale.NUMBER_FORMATS.DECIMAL_SEP) === -1 &&
            value.indexOf('.') !== -1 &&
            fraction > 0) {
            dSeparator = '.';
          }
          // Replace negative pattern to minus sign (-)
          var neg_dummy = $filter('currency')('-1', getCurrencySymbol(), fraction);
          var neg_regexp = RegExp('[0-9.' + $locale.NUMBER_FORMATS.DECIMAL_SEP + $locale.NUMBER_FORMATS.GROUP_SEP + ']+');
          var neg_dummy_txt = neg_dummy.replace(neg_regexp.exec(neg_dummy), '');
          var value_dummy_txt = value.replace(neg_regexp.exec(value), '');
          // If is negative
          if (neg_dummy_txt === value_dummy_txt) {
            value = '-' + neg_regexp.exec(value);
          }
          if (RegExp('^-[\\s]*$', 'g').test(value)) {
            value = '-0';
          }
          if (decimalRex(dSeparator).test(value)) {
            cleared = value.match(decimalRex(dSeparator))
              .join('').match(clearRex(dSeparator));
            cleared = cleared ? cleared[0].replace(dSeparator, '.') : null;
          }
          return cleared;
        }

        function getCurrencySymbol() {
          return currencySymbol === undefined ? $locale.NUMBER_FORMATS.CURRENCY_SYM : currencySymbol;
        }
      }
    };
  }
})();
