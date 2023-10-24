const Book = require('../../models/book');
const Staff = require('../../models/staff');
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

  createBook: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    const book = new Book({
      title: args.bookInput.title,
      author: args.bookInput.author,
      description: args.bookInput.description,
      price: +args.bookInput.price,
      adder: req.staffId,
    });
    let createdBook;
    try {
      console.log(args);
      const result = await book.save();
      createdBook = transformBook(result);
      const staff = await Staff.findById(req.staffId);
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
