'use strict';

describe('Controller: BoardlistCtrl', function () {

  // load the controller's module
  beforeEach(module('appApp'));

  var BoardlistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BoardlistCtrl = $controller('BoardlistCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BoardlistCtrl.awesomeThings.length).toBe(3);
  });
});
