const Book = require('../../models/book');
const { transformBook } = require('./merge');

module.exports = {
  books: async () => {
    try {
      const books = await Book.find();
      return books.map(book => {
        return transformBook(book);
      });
    } catch (err) {
      throw err;
    }
  },

  createBook: async args => {
    const book = new Book({
      title: args.bookInput.title,
      author: args.bookInput.author,
      description: args.bookInput.description,
      price: +args.bookInput.price,
      adder: '6532e483159dc4f17cc55b61',
    });
    let createdBook;
    try {
      console.log(args);
      const result = await book.save();
      createdBook = transformBook(result);
      const staff = await Staff.findById('6532e483159dc4f17cc55b61');
      console.log(result);
      if (!staff) {
        throw new Error('Staff not found.');
      }
      staff.createdBooks.push(book);
      await staff.save();
      return createdBook;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
