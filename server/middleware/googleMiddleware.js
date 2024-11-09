const passport = require('passport');
require('../config/passport'); // Import the passport configuration
const googleLogin = (req, res, next) => {
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
  };

  module.exports = { googleLogin };