const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
module.exports = {
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDINARYKEY,
  api_secret: process.env.CLOUDNIARYSECREAT,
};
