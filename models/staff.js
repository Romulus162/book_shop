const mongoos = require('mongoose');
const Schema = mongoos.Schema;

const staffSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdBooks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],
});

module.exports = mongoos.model('Staff', staffSchema);
