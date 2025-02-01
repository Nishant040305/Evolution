const Users = require('../models/User');
const crypto = require('crypto');

// Generate a 6-digit OTP code
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

// Generate a unique and user-friendly username based on the email
const UserNameParse = async (email) => {
  if (typeof email !== 'string' || !email.includes('@')) {
    return email; // Return the email as is if it's not a valid email format
  }

  // Extract the username (everything before the '@' symbol)
  const baseUsername = email.split('@')[0];

  // Split the base username into parts (e.g., "john.doe" -> ["john", "doe"])
  const nameParts = baseUsername.split(/[.\-_]/); // Split by common separators

  // Use the first part as the first name and the second part (if exists) as the last name
  const firstName = nameParts[0] || '';
  const lastName = nameParts[1] || '';

  // Combine the first name and the first letter of the last name (if available)
  let username = `${firstName}${lastName.charAt(0)}`.toLowerCase();

  // Truncate the username to a maximum length (e.g., 8 characters)
  const maxLength = 8;
  username = username.slice(0, maxLength);

  // Generate a short, unique hash from the email
  const generateHash = (input) => {
    return crypto.createHash('sha256').update(input).digest('hex').slice(0, 4); // 4-character hash
  };

  let uniqueHash = generateHash(email);
  let finalUsername = `${username}_${uniqueHash}`;

  // Check if the username is already taken
  let isUnique = false;
  while (!isUnique) {
    const existingUser = await Users.findOne({ displayname: finalUsername });

    if (!existingUser) {
      isUnique = true; // Username is unique
    } else {
      // If the username is taken, generate a new hash and try again
      uniqueHash = generateHash(email + Math.random().toString()); // Add randomness to avoid collisions
      finalUsername = `${username}_${uniqueHash}`;
    }
  }

  return finalUsername;
};

module.exports = { generateOTP, UserNameParse };
