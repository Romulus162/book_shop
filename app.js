const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

const books = [];

app.use(bodyParser.json());

app.use('/api', graphqlHTTP({
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
        books: () =>{
            return books;
        },
        createBook: (args) =>{
            const book = {
                _id: Math.random().toString(),
                title: args.bookInput.title,
                author: args.bookInput.author,
                description: args.bookInput.description,
                price: +args.bookInput.price
            }
            console.log(args);
            books.push(book);
            return book;
        }
    },
    graphiql: true
}));

app.listen(3000);
