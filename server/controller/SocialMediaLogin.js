const path = require('path');
const User = require('../models/User');
const axios = require('axios');
const querystring = require('querystring');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const jwtToken = require('jsonwebtoken');
require('../config/passport'); // Import the passport configuration
const googleCallback = (req, res) => {
  const user = req.user;
    if (!user) {
      console.error('Authentication Error:', err);
      return res.redirect(process.env.CLIENT);
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
    return res.redirect(process.env.CLIENT);
  
};
// Step 1: Redirect to GitHub for OAuth
//github
const GithubRedirect = async (req, res) => {
  const client_id = process.env.GITHUB_CLIENT_ID;
  const redirect_uri = 'http://localhost:4000/api/auth/github/callback';
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}`);
};


const GithubCallback = async (req, res) => {
  const { code } = req.query;
  const client_id = process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECREAT;
  const redirect_uri = 'http://localhost:4000/api/auth/github/callback';

  try {
    // Step 1: Exchange the code for an access token
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      querystring.stringify({
        client_id,
        client_secret,
        code,
        redirect_uri,
      }),
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const { access_token } = response.data;

    // Step 2: Get user details
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    
    let user = await User.findOne({ email:userResponse.data.email?userResponse.data.email:userResponse.data.login }).lean();
    if (!user) {
      user = await new User({
        displayname: userResponse.data.name,
        email:userResponse.data.email?userResponse.data.email:userResponse.data.login,
        password: null,
        avatar: userResponse.data.avatar_url,
        verify: true,
      }).save();
    }

    // JWT token creation and redirect
    const jwtPayload = {
      displayname: user.displayname,
      email:userResponse.data.email?userResponse.data.email:userResponse.data.login,
      avatar: user.avatar,
      _id: user._id,
    };
    const jwtData = jwtToken.sign(jwtPayload, process.env.JWTSECREAT);
    res.cookie('uid', jwtData, { httpOnly: true, secure: true, sameSite: 'Strict' });
    return res.redirect(process.env.CLIENT);

  } catch (error) {
    console.error('Error during GitHub OAuth:', error.response ? error.response.data : error.message);
    res.status(500).send('Authentication failed');
  }
};

module.exports = {  googleCallback,GithubCallback,GithubRedirect };
