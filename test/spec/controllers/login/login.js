'use strict';

describe('Controller: LoginLoginCtrl', function () {

  // load the controller's module
  beforeEach(module('appApp'));

  var LoginLoginCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoginLoginCtrl = $controller('LoginLoginCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LoginLoginCtrl.awesomeThings.length).toBe(3);
  });
});
