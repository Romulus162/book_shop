const { buildSchema } = require('graphql');

module.exports = buildSchema(`
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
      `);
