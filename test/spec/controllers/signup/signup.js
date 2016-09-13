'use strict';

describe('Controller: SignupCtrl', function () {

  // load the controller's module
  beforeEach(module('appApp'));

  var SignupSignupCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SignupCtrl = $controller('SignupCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SignupSignupCtrl.awesomeThings.length).toBe(3);
  });
});
