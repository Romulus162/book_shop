const bookResolver = require('./books');
const orderResolver = require('./orders');
const staffResolver = require('./staff');
const genreResolver = require('./genre');

const rootResolver = {
  ...bookResolver,
  ...orderResolver,
  ...staffResolver,
  ...genreResolver,
};

module.exports = rootResolver;
