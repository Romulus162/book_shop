const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const Book = require('./models/book');

const app = express();

app.use(bodyParser.json());

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

        }

        input BookInput {
            title: String!
            author: String!
            description: String!
            price: Float!
        }

        type RootQuery {
            books: [Book!]!
        }

        type RootMutation {
            createBook(bookInput: BookInput): Book
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
              return { ...book._doc, _id: book.id };
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
        });
        console.log(args);
        return book
          .save()
          .then(result => {
            console.log(result);
            return { ...result._doc, _id: book.id };
          })
          .catch(err => {
            console.log(err);
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
