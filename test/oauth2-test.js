require('./test-helper')
var HubSpotStrategy = require('../lib/passport-hubspot-oauth/oauth2');


describe('HubSpotStrategy', function () {
    

    describe('strategy param tests', function () {
        it('should return false for passReqToCallback', function () {
            const strategy = new HubSpotStrategy({
                clientID: 'ABC123',
                clientSecret: 'secret'
            }, function () { });

            strategy._passReqToCallback.should.equal(false);
        });

        it('should return true for passReqToCallback', function () {
            const strategy = new HubSpotStrategy({
                clientID: 'ABC123',
                clientSecret: 'secret',
                passReqToCallback: true
            }, function () { });

            strategy._passReqToCallback.should.equal(true);
        });
    });

    describe('strategy tests', function() {
        beforeEach(function () {
            this.strategy = new HubSpotStrategy({
                clientID: 'ABC123',
                clientSecret: 'secret'
            }, function () { });
        });

        describe('strategy when loading user profile', function () {
            beforeEach(function () {
                var self = this
                this.go = function (cb) {
                    process.nextTick(function () {
                        self.strategy.userProfile('access-token', function (err, profile) {
                            self.error = err
                            self.profile = profile
                            cb()
                        });
                    });
                }
            });
    
            describe('successfully', function () {
                beforeEach(function (done) {
                    this.strategy._oauth2.get = function (x, y, callback) {
                        var body = '{ \
                         "id": "00000000000000", \
                         "emails": [ \
                             { \
                                "email": "fred.example@gmail.com", \
                                "verified": true, \
                                "primary": true \
                             } \
                         ], \
                         "name": "Fred Example", \
                         "first_name": "Fred", \
                         "last_name": "Example", \
                         "image_id": "00000000" \
                        }';
    
                        callback(null, body, undefined);
                    }
                    this.go(done)
                });
    
                it('should not error', function () {
                    (this.error == null).should.equal(true, 'expected error to be undefined')
                });
                it('should load profile', function () {
                    this.profile.provider.should.equal('hubspot');
                    this.profile.id.should.equal('00000000000000');
                    this.profile.emails[0].email.should.equal('fred.example@gmail.com');
                });
            });
    
            describe('unsuccessfully', function () {
                beforeEach(function (done) {
                    this.strategy._oauth2.get = function (x, y, callback) {
                        callback(new Error('something-went-wrong'))
                    }
                    this.go(done)
                });
    
                it('should error', function () {
                    (this.error != null).should.equal(true, 'expected err to be defined, instead was null')
                });
    
                it('should wrap error in InternalOAuthError', function () {
                    this.error.constructor.name.should.equal('InternalOAuthError')
                });
    
                it('should not load profile', function () {
                    (this.profile == null).should.equal(true, 'expected profile to be undefined')
                });
            });
        });
    });
});
