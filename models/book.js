const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  adder: {
    type: Schema.Types.ObjectId,
    ref: 'Staff',
  },
});

module.exports = mongoose.model('Book', bookSchema);
