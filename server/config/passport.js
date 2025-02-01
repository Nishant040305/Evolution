// passport.js
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const { UserNameParse } = require('../utils');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACKURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user || !user?.verify) {
          const hasheduser = await UserNameParse(profile.emails[0].value);
          user = await User.create({
            email: profile.emails[0].value,
            name: profile.displayName,
            displayname: hasheduser,
            avatar: profile.photos[0].value,
            password: null,
            verify: true,
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
