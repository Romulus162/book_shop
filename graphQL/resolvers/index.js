const bcrypt = require('bcryptjs');

const Book = require('../../models/book');
const Staff = require('../../models/staff');

const bookDataByID = async bookID => {
  try {
    const book = await Book.find({
      _id: { $in: bookID },
    });

    book.map(book => {
      return {
        ...book._doc,
        _id: book.id,
        adder: staffDataByID.bind(this, book.adder),
      };
    });
    return book;
  } catch (err) {
    throw err;
  }
};

const staffDataByID = async staffID => {
  try {
    const staff = await Staff.findById(staffID);
    return {
      ...staff._doc,
      _id: staff.id,
      createdBooks: bookDataByID.bind(this, staff._doc.createdBooks),
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  books: async () => {
    try {
      const books = await Book.find();
      return books.map(book => {
        return {
          ...book._doc,
          _id: book.id,
          adder: staffDataByID.bind(this, book._doc.adder),
        };
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
      createdBook = {
        ...result._doc,
        _id: result._doc._id.toString(),
        adder: staffDataByID.bind(this, result._doc.adder),
      };
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
  createStaff: async args => {
    try {
      const currentStaff = await Staff.findOne({
        email: args.staffInput.email,
      });
      if (currentStaff) {
        throw new Error('Staff exists already.');
      }
      const hashedPassword = await bcrypt.hash(args.staffInput.password, 12);

      const staff = new Staff({
        email: args.staffInput.email,
        password: hashedPassword,
      });
      const result = await staff.save();
      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
};
