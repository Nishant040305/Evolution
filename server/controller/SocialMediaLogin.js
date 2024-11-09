const passport = require('passport');
require('../config/passport'); // Import the passport configuration
const googleCallback = (req, res) => {
  passport.authenticate('google', (err, user) => {
    if (err || !user) {
      return res.status(400).json({ message: 'Google login failed' });
    }
    const jwtData = jwtToken.sign(
      {
        displayname: user.displayname,
        email: user.email,
        avatar: user.avatar,
        _id: user._id,
      },
      process.env.JWTSECREAT
    );
    res.cookie('uid', jwtData, { httpOnly: true, secure: true, sameSite: 'Strict' });
    return res.status(200).json({ info: user, message: 'Google login successful' });
  })(req, res);
};

module.exports = { googleCallback };
