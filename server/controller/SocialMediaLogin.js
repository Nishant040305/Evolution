const path = require('path');
const User = require('../models/User');
const axios = require('axios');
const crypto = require('crypto');
const querystring = require('querystring');
const jwtToken = require('jsonwebtoken');
const { UserNameParse } = require('../utils');
const Token = require('../models/Token');
require('../config/passport');
const googleCallback = (req, res) => {
  const user = req.user;
  if (!user || !user.verify) {
    console.error('Authentication Error:', err);
    return res.redirect(process.env.CLIENT);
  }
  const jwtData = jwtToken.sign(
    {
      displayname: user.displayname,
      email: user.email,
      avatar: user.avatar,
      name: user?.name,
      bio: user?.bio,
      linkedin: user?.linkedin,
      location: user?.location,
      createdAt: user?.createdAt,
      github: user?.github,
      _id: user._id,
    },
    process.env.JWTSECREAT
  );
  res.cookie('uid', jwtData, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
  return res.redirect(process.env.CLIENT);
};
// Step 1: Redirect to GitHub for OAuth
const GithubRedirect = async (req, res) => {
  try {
    const client_id = process.env.GITHUB_CLIENT_ID;
    const redirect_uri = `${process.env.SERVER}/api/auth/github/callback`;

    const mode = req.query.mode || 'login';
    let state = '';

    if (mode === 'connect') {
      const tokenRaw = crypto.randomBytes(32).toString('hex');

      const userId = req.user?._id;
      const email = req.user?.email;

      if (!userId || !email) {
        return res
          .status(401)
          .send('Unauthorized: Login required for GitHub connect');
      }

      const tokenDoc = await Token.create({
        userId,
        token: tokenRaw,
        type: 'GitHubConnect',
        email,
      });

      state = Buffer.from(`${tokenDoc._id}.${tokenRaw}`).toString('base64');
    } else {
      // for login, just encode the mode
      state = Buffer.from(JSON.stringify({ mode })).toString('base64');
    }

    const githubOAuthURL = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}`;
    res.redirect(githubOAuthURL);
  } catch (error) {
    console.error('GitHub Redirect Error:', error);
    res.status(500).send('GitHub redirect failed');
  }
};

// Step 2: Handle GitHub OAuth callback
const GithubCallback = async (req, res) => {
  const { code, state } = req.query;
  const client_id = process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECREAT;
  const redirect_uri = `${process.env.SERVER}/api/auth/github/callback`;

  try {
    // Exchange code for access token
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      querystring.stringify({
        client_id,
        client_secret,
        code,
        redirect_uri,
      }),
      {
        headers: { Accept: 'application/json' },
      }
    );

    const { access_token } = response.data;

    // Get user profile
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const githubProfile = userResponse.data;
    const githubEmail = githubProfile.email || `${githubProfile.login}@github`;

    // Decode state
    const decodedState = Buffer.from(state, 'base64').toString();
    let mode = 'login';

    if (decodedState.includes('.')) {
      // It's a GitHubConnect flow
      const [tokenId, rawToken] = decodedState.split('.');
      const storedToken = await Token.findOne({
        _id: tokenId,
        token: rawToken,
        type: 'GitHubConnect',
      });

      if (!storedToken) {
        return res.status(400).send('Invalid or expired connection token');
      }

      const user = await User.findById(storedToken.userId);
      if (!user) {
        return res.status(404).send('User not found');
      }

      // Connect GitHub to existing user
      user.github = `https://github.com/${githubProfile.login}`;
      await user.save();

      await Token.deleteOne({ _id: storedToken._id });
      return res.redirect(`${process.env.CLIENT}/social`);
    } else {
      // Login or signup flow
      const parsed = JSON.parse(decodedState);
      mode = parsed.mode || 'login';
    }

    // Try to find existing user
    let user = await User.findOne({
      email: githubProfile.email || githubProfile.login,
    }).lean();

    if (!user) {
      const hashedUsername = await UserNameParse(
        githubEmail.includes('@') ? githubEmail : `${githubEmail}@dna.com`
      );

      user = await new User({
        name: githubProfile.name,
        displayname: hashedUsername,
        email: githubEmail,
        password: null,
        github: `https://github.com/${githubProfile.login}`,
        verify: true,
      }).save();
    }

    const jwtPayload = {
      displayname: user.displayname,
      email: user.email,
      avatar: user.avatar,
      bio: user?.bio,
      linkedin: user?.linkedin,
      location: user?.location,
      name: user?.name,
      _id: user?._id,
      github: user.github,
      createdAt: user?.createdAt,
    };

    const jwtData = jwtToken.sign(jwtPayload, process.env.JWTSECREAT);

    res.cookie('uid', jwtData, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return res.redirect(process.env.CLIENT);
  } catch (error) {
    console.error(
      'Error during GitHub OAuth:',
      error.response?.data || error.message
    );
    res.status(500).send('Authentication failed');
  }
};

module.exports = {
  googleCallback,
  GithubRedirect,
  GithubCallback,
};
