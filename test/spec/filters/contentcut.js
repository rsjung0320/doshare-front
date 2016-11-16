'use strict';

describe('Filter: contentCut', function () {

  // load the filter's module
  beforeEach(module('appApp'));

  // initialize a new instance of the filter before each test
  var contentCut;
  beforeEach(inject(function ($filter) {
    contentCut = $filter('contentCut');
  }));

  it('should return the input prefixed with "contentCut filter:"', function () {
    var text = 'angularjs';
    expect(contentCut(text)).toBe('contentCut filter: ' + text);
  });

});
