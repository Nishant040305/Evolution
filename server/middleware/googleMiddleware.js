const passport = require('passport');
const googleLogin = (req, res, next) => {
  passport.authenticate('google', { scope: ['profile', 'email'] })(
    req,
    res,
    next
  );
};

module.exports = { googleLogin };
