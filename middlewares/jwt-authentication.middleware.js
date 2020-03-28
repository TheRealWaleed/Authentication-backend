const Account = require('../models').Account;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'B9D90628453938C578C7F826DE5E5BD2BCAC29E10C5526888384BA74FCEA563E';
opts.issuer = 'accounts.examplesoft.com';
opts.audience = 'yoursite.net';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    Account.findOne({id: jwt_payload.sub}, function(err, account) {
        if (err) {
            return done(err, false);
        }
        if (account) {
            return done(null, account);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));
