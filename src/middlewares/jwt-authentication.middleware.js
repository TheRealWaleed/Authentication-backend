const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const { Account } = require("../models");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "B9D90628453938C578C7F826DE5E5BD2BCAC29E10C5526888384BA74FCEA563E";
opts.issuer = "accounts.examplesoft.com";
opts.audience = "yoursite.net";
passport.use(new JwtStrategy(opts, ((jwtPayload, done) => {
  Account.findOne({ id: jwtPayload.sub }, (err, account) => {
    if (err) {
      return done(err, false);
    }
    if (account) {
      return done(null, account);
    }
    return done(null, false);
    // or you could create a new account
  });
})));
