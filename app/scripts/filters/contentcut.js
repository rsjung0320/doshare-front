'use strict';

/**
 * @ngdoc filter
 * @name appApp.filter:contentCut
 * @function
 * @description
 * # contentCut
 * Filter in the appApp.
 */
angular.module('appApp')
  .filter('contentCut', function() {
    return function(value, wordwise, max, tail) {
      if (!value){return '';}
      value = String(value).replace(/<[^>]+>/gm, ' ');
      max = parseInt(max, 10);
      if (!max) {return value;}
      if (value.length <= max) {return value;}

      value = value.substr(0, max);
      if (wordwise) {
        var lastspace = value.lastIndexOf(' ');
        if (lastspace !== -1) {
          //Also remove . and , so its gives a cleaner result.
          if (value.charAt(lastspace - 1) === '.' || value.charAt(lastspace - 1) === ',') {
            lastspace = lastspace - 1;
          }
          value = value.substr(0, lastspace);
        }
      }
      return value + (tail || ' …');
    };
  });
