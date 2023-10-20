const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Book = require('./models/book');
const Staff = require('./models/staff');

const app = express();

app.use(bodyParser.json());

const bookDataByID = bookID => {
  return Book.find({
    _id: { $in: bookID },
  })
    .then(books => {
      return books.map(book => {
        return {
          ...book._doc,
          _id: book.id,
          adder: staffDataByID.bind(this, book.adder),
        };
      });
    })
    .catch(err => {
      throw err;
    });
};

const staffDataByID = staffID => {
  return Staff.findById(staffID)
    .then(staff => {
      return {
        ...staff._doc,
        _id: staff.id,
        createdBooks: bookDataByID.bind(this, staff._doc.createdBooks),
      };
    })
    .catch(err => {
      throw err;
    });
};

app.use(
  '/api',
  graphqlHTTP({
    schema: buildSchema(`
        type Book {
            _id: ID!
            title: String!
            author: String!
            description: String!
            price: Float!
            adder: Staff!

        }

        type Staff {
            _id: ID!
            email: String!
            password: String
            createdBooks: [Book!]
        }

        input BookInput {
            title: String!
            author: String!
            description: String!
            price: Float!
        }

        input StaffInput {
            email: String!
            password: String!
        }

        type RootQuery {
            books: [Book!]!
        }

        type RootMutation {
            createBook(bookInput: BookInput): Book
            createStaff(staffInput: StaffInput): Staff
        }

        schema {

            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      books: () => {
        return Book.find()
          .then(books => {
            return books.map(book => {
              return {
                ...book._doc,
                _id: book.id,
                adder: staffDataByID.bind(this, book._doc.adder),
              };
            });
          })
          .catch(err => {
            throw err;
          });
      },
      createBook: args => {
        const book = new Book({
          title: args.bookInput.title,
          author: args.bookInput.author,
          description: args.bookInput.description,
          price: +args.bookInput.price,
          adder: '6531b9e808e90fb8d2872da6',
        });
        let createdBook;
        console.log(args);
        return book
          .save()
          .then(result => {
            createdBook = {
              ...result._doc,
              _id: result._doc._id.toString(),
              adder: staffDataByID.bind(this, result._doc.adder),
            };
            return Staff.findById('6531b9e808e90fb8d2872da6');
            console.log(result);
          })
          .then(staff => {
            if (!staff) {
              throw new Error('Staff not found.');
            }
            staff.createdBooks.push(book);
            return staff.save();
          })
          .then(result => {
            return createdBook;
          })
          .catch(err => {
            console.log(err);
            throw err;
          });
      },
      createStaff: args => {
        return Staff.findOne({ email: args.staffInput.email })
          .then(user => {
            if (user) {
              throw new Error('Staff exists already.');
            }
            return bcrypt.hash(args.staffInput.password, 12);
          })

          .then(hashedPassword => {
            const staff = new Staff({
              email: args.staffInput.email,
              password: hashedPassword,
            });
            return staff.save();
          })
          .then(result => {
            return { ...result._doc, password: null, _id: result.id };
          })
          .catch(err => {
            throw err;
          });
      },
    },
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.kbdo7pq.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
