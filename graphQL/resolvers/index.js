const bookResolver = require('./books');
const orderResolver = require('./orders');
const staffResolver = require('./staff');
const userResolver = require('./user');
const genreResolver = require('./genre');

const rootResolver = {
  ...bookResolver,
  ...orderResolver,
  ...staffResolver,
  ...userResolver,
  ...genreResolver,
};

module.exports = rootResolver;
