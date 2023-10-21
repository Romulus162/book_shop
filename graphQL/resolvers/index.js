const bookResolver = require('./books');
const orderResolver = require('./orders');
const staffResolver = require('./staff');

const rootResolver = {
  ...bookResolver,
  ...orderResolver,
  ...staffResolver,
};

module.exports = rootResolver;
