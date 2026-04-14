// const passport = require('passport');
import passport from 'passport';
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const User = require('../models/user');
import User from '../models/user.js';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
      scope: ['profile', 'email']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          // User exists, return user
          return done(null, user);
        } else {
          // Create new user
          const newUser = await User.create({
            name: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            // Generate a random password (user won't use this to login)
            password: require('crypto').randomBytes(16).toString('hex'),
            avatar: profile.photos[0].value,
            // Set any additional fields as needed
          });

          return done(null, newUser);
        }
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// module.exports = passport;
export default passport;