const User = require('../models/User'); // Import the User model
const createHttpError = require('http-errors');

/**
 * Searches for users by displayname or email with dynamic result limiting.
 * @param {string} searchString - The string to search for.
 * @returns {Promise<Array>} - Returns an array of user objects with id, displayname, email, and avatar.
 */
const searchUsers = async (searchString) => {
  if (!searchString || searchString.trim().length < 3) {
    throw createHttpError(400, 'Search string must be at least 3 characters long.');
  }

  try {
    const regex = new RegExp(searchString.trim(), 'i'); // Case-insensitive search

    // Perform initial query to fetch matches
    const matches = await User.find(
      {
        $or: [
          { displayname: { $regex: regex } },
          { email: { $regex: regex } },
        ],
      },
      'id displayname email avatar' // Select only required fields
    ).lean();

    // Dynamically determine the limit based on relevance
    const exactMatches = matches.filter(
      (user) =>
        user.displayname.toLowerCase() === searchString.toLowerCase() ||
        user.email.toLowerCase() === searchString.toLowerCase()
    );

    const limit = exactMatches.length > 0 ? exactMatches.length : Math.min(5, matches.length);

    // Return the dynamically limited results
    return matches.slice(0, limit);
  } catch (error) {
    throw createHttpError(500, 'An internal server error occurred while searching for users.');
  }
};

module.exports = {searchUsers};
