const Book = require('../../models/book');
const Order = require('../../models/order');
const { transformBook, transformOrder } = require('./merge');

module.exports = {
  orders: async () => {
    try {
      const orders = await Order.find();
      return orders.map(order => {
        return transformOrder(order);
      });
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
    return transformOrder(result);
  },

  cancelOrder: async args => {
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
