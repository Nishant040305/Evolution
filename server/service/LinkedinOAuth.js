const crypto = require('crypto');
const fetch = require('node-fetch');
const Token = require('../models/Token');

class LinkedInOAuth {
  constructor({ clientId, clientSecret, redirectUri }) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
  }

  /**
   * Step 1: Get LinkedIn authorization URL
   */
  getAuthorizationUrl(state) {
    const scope = 'r_liteprofile r_emailaddress';
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      state,
      scope,
    });

    return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
  }

  /**
   * Step 2: Exchange authorization code for access token
   */
  async getAccessToken(code) {
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: this.redirectUri,
      client_id: this.clientId,
      client_secret: this.clientSecret,
    });

    const res = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    const data = await res.json();
    return data.access_token;
  }

  /**
   * Step 3: Fetch user's LinkedIn profile
   */
  async getUserProfile(accessToken) {
    const res = await fetch('https://api.linkedin.com/v2/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const profile = await res.json();
    return profile;
  }

  /**
   * Step 4: Generate a random code and store it in MongoDB
   */
  async storeCode(userId) {
    const code = crypto.randomBytes(24).toString('hex');

    const token = new Token({
      code,
      userId,
    });

    await token.save();
    return code;
  }
}

export default LinkedInOAuth;
