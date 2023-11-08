const mongoos = require('mongoose');
const Schema = mongoos.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoos.model('User', userSchema);
