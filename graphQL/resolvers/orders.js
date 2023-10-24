const Book = require('../../models/book');
const Order = require('../../models/order');
const { transformBook, transformOrder } = require('./merge');

module.exports = {
  orders: async (_, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const orders = await Order.find();
      return orders.map(order => {
        return transformOrder(order);
      });
    } catch (err) {
      throw err;
    }
  },
  orderBook: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    const fetchedBook = await Book.findOne({ _id: args.bookId });
    const order = new Order({
      staff: req.staffId,
      book: fetchedBook,
    });
    const result = await order.save();
    return transformOrder(result);
  },

  cancelOrder: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const order = await Order.findById(args.orderId).populate('book');
      const book = transformBook(order.book);
      console.log(book);
      await Order.deleteOne({ _id: args.orderId });
      return book;
    } catch (err) {
      throw err;
    }
  },
};
