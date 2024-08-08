const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const { User } = require('../modals/User');
const { sanitizeUser, cookieExtractor } = require('../services/common');


// Passport Strategies 

var opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET_KEY;

passport.use(
    "local",
    new LocalStrategy({ usernameField: "email" }, async function (
      email,
      password,
      done
    ) {
      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: "invalid credentials" });
        }
        crypto.pbkdf2(
          password,
          user.salt,
          310000,
          32,
          "sha256",
          async function (err, hashedPassword) {
            if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
              return done(null, false, { message: "invalid credentials" });
            }
            const token = jwt.sign(
              sanitizeUser(user),
              process.env.JWT_SECRET_KEY
            );
            done(null, { id: user.id, role: user.role, token });
          }
        );
      } catch (err) {
        done(err);
      }
    })
  );
  
  passport.use(
    "jwt",
    new JwtStrategy(opts, async function (jwt_payload, done) {
      try {
        const user = await User.findById(jwt_payload.id);
        if (user) {
          return done(null, sanitizeUser(user));
        } else {
          return done(null, false);
        }
      } catch (err) {
        console.error("Error finding user:", err);
        return done(err, false);
      }
    })
  );
  
  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, { id: user.id, role: user.role });
    });
  });
  
  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
  


module.exports = passport;
