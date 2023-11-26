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

  //this stuff bellow is not working as intended in other places

  profilePicture: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
});

module.exports = mongoos.model('User', userSchema);
