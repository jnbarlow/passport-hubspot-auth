[![CircleCI](https://circleci.com/gh/jnbarlow/passport-hubspot-auth.svg?style=shield)](https://circleci.com/gh/jnbarlow/passport-hubspot-auth)

# Passport-Hubspot-Auth

[Passport](http://passportjs.org/) strategies for authenticating with [Hubspot](http://www.hubspot.com/)
using OAuth 2.0.

This module lets you authenticate using HubSpot credentials in your Node.js applications.
By plugging into Passport, HubSpot authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

    $ npm install passport-hubspot-auth

## Usage of OAuth 2.0

#### Configure Strategy

The HubSpot OAuth 2.0 authentication strategy authenticates users using a HubSpot
account and OAuth 2.0 tokens.  The strategy requires a `verify` callback, which
accepts these credentials and calls `done` providing a user, as well as
`options` specifying a client ID, client secret, and callback URL.

```javascript
var HubSpotStrategy = require( 'passport-hubspot-auth' ).Strategy;

passport.use(new HubSpotStrategy({
    clientID:     HUBSPOT_CLIENT_ID,
    clientSecret: HUBSPOT_CLIENT_SECRET,
    callbackURL: "http://yourdomain:3000/auth/hubspot/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    // Information is sent back here.
  }
));
```
Conversely, if you don't want the request to be available, omit `passReqToCallback` or set it to false

```javascript
var HubSpotStrategy = require( 'passport-hubspot-auth' ).Strategy;

passport.use(new HubSpotStrategy({
    clientID:     HUBSPOT_CLIENT_ID,
    clientSecret: HUBSPOT_CLIENT_SECRET,
    callbackURL: "http://yourdomain:3000/auth/hubspot/callback",
    passReqToCallback   : false
  },
  function(accessToken, refreshToken, profile, done) {
    // Information is sent back here.
  }
));
```

```javascript
var HubSpotStrategy = require( 'passport-hubspot-auth' ).Strategy;

passport.use(new HubSpotStrategy({
    clientID:     HUBSPOT_CLIENT_ID,
    clientSecret: HUBSPOT_CLIENT_SECRET,
    callbackURL: "http://yourdomain:3000/auth/hubspot/callback",
  },
  function(accessToken, refreshToken, profile, done) {
    // Information is sent back here.
  }
));
```

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'hubspot'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```javascript
app.get('/auth/hubspot',
  passport.authenticate('google', { scope: 'contacts content' }
));

app.get( '/auth/hubspot/callback',
	passport.authenticate( 'hubspot', {
		successRedirect: '/auth/hubspot/success',
		failureRedirect: '/auth/hubspot/failure'
}));
```

#### Profile Response

```
profile { 
    token: '<access token>',
    user: '<hubspot username>',
    hub_domain: '<hubspot instance>',
    scopes: [ <array of scopes> ],
    hub_id: ########,
    app_id: ######,
    expires_in: #####, //seconds from now
    user_id: ########,
    token_type: 'access',
    provider: 'hubspot' 
}
```

## Credits
  
  - [John Barlow](http://github.com/jnbarlow)
  - [Jared Hanson](http://github.com/jaredhanson) (original author of passport-hubspot-oauth2)
  - [passport-hubspot-oauth2](https://www.npmjs.com/package/passport-hubspot-oauth2) - abandoned project that this was based upon.

## License

[The MIT License](http://opensource.org/licenses/MIT)
