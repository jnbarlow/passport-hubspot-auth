require('./test-helper')
var hubspot = require( '../lib/passport-hubspot-oauth' );

describe( 'passport-hubspot-oauth', function() {
  describe('module', function() {
    it('should report a version', function() {
      _.isString(hubspot.version).should.equal(true)
    })

    it('should export 0Auth 2.0 strategy', function() {
      hubspot.OAuth2Strategy.should.be.an.instanceOf(Function)
    })
  })
})
