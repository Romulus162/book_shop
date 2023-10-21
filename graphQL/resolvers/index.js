const bcrypt = require('bcryptjs');

const Book = require('../../models/book');
const Staff = require('../../models/staff');
const Order = require('../../models/order');

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

// const singleBook = async bookId => {
//   try {
//     const book = await Book.findById(bookId);
//     return { ...book._doc, _id: book.id, adder:}
//   } catch (err) {
//     throw err;
//   }
// };

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
  orders: async () => {
    try {
      const orders = await Order.find();
      return orders.map(order => {
        return {
          ...order._doc,
          _id: order.id,
          createdAt: new Date(order._doc.createdAt).toISOString(),
          updatedAt: new Date(order._doc.updatedAt).toISOString(),
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

  orderBook: async args => {
    const fetchedBook = await Book.findOne({ _id: args.bookId });
    const order = new Order({
      staff: '6532e483159dc4f17cc55b61',
      book: fetchedBook,
    });
    const result = await order.save();
    return {
      ...result._doc,
      _id: result.id,
      createdAt: new Date(result._doc.createdAt).toISOString(),
      updatedAt: new Date(result._doc.updatedAt).toISOString(),
    };
  },
};
