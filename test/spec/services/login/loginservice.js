'use strict';

describe('Service: loginService', function () {

  // load the service's module
  beforeEach(module('appApp'));

  // instantiate service
  var loginService;
  beforeEach(inject(function (loginService_) {
    loginService = loginService_;
  }));

  it('should do something', function () {
    expect(!!loginService).toBe(true);
  });

});
