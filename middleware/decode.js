//this entire file is experimental

const jwt = require('jsonwebtoken');

const getUserIdFromToken = (token, secretKey) => {
  try {
    const decodedToken = jwt.verify(token, secretKey);

    const userId = decodedToken.userId;

    return userId;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

module.exports = getUserIdFromToken;
