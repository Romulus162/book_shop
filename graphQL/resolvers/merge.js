const DataLoader = require('dataloader');

const Book = require('../../models/book');
const Staff = require('../../models/staff');
const { dateToString } = require('../../helpers/date');

const bookLoader = new DataLoader(bookIds => {
  return listBooks(bookIds);
});

//want to use this, but because of nasty bug, it doesn't make sense to use it
const staffLoader = new DataLoader(staffIds => {
  console.log(staffIds);
  return Staff.find({ _id: { $in: staffIds } });
});

const listBooks = async bookIDs => {
  try {
    const books = await Book.find({
      _id: { $in: bookIDs },
    });

    books.map(book => {
      return transformBook(book);
    });
    return books;
  } catch (err) {
    throw err;
  }
};

const singleBook = async bookId => {
  try {
    const book = await bookLoader.load(bookId.toString());
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
      createdBooks: listBooks.bind(this, staff._doc.createdBooks),
    };
  } catch (err) {
    throw err;
  }
};

const transformBook = book => {
  return {
    ...book._doc,
    _id: book.id,
    adder: staffDataByID.bind(this, book.adder),
  };
};

const transformOrder = order => {
  return {
    ...order._doc,
    _id: order.id,
    staff: staffDataByID.bind(this, order._doc.staff),
    book: singleBook.bind(this, order._doc.book),
    createdAt: dateToString(order._doc.createdAt),
    updatedAt: dateToString(order._doc.updatedAt),
  };
};

exports.transformBook = transformBook;
exports.transformOrder = transformOrder;
// exports.staffDataByID = staffDataByID;
// exports.singleBook = singleBook;
// exports.listBooks = listBooks;
