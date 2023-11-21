const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Order {
    _id: ID!
    book: Book!
    staff: Staff!
    createdAt: String!
    updatedAt: String!
}

type Book {
    _id: ID!
    title: String!
    author: String!
    description: String!
    price: Float!
    adder: Staff!
}

type Genre {
    _id: ID!
    name: String!
}

type Staff {
    _id: ID!
    email: String!
    password: String
    createdBooks: [Book!]
}

type User {
    _id: ID!
    email: String!
    password: String
  }

type stfAuthData {
    staffId: ID!
    token: String!
    tokenExpiration: Int!
}

type usrAuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

input BookInput {
    title: String!
    author: String!
    description: String!
    price: Float!
}

input GenreInput {
    name: String!
}

input StaffInput {
    email: String!
    password: String!
}

input UserInput {
    email: String!
    password: String!
  }

type RootQuery {
    books: [Book!]!
    book(id: ID!): Book
    genres: [Genre!]!
    orders: [Order!]!
    login(email: String!, password: String!): stfAuthData!
    usrLogin(email: String!, password: String!): usrAuthData!
}

type RootMutation {
    createBook(bookInput: BookInput): Book
    createGenre(genreInput: GenreInput): Genre
    createStaff(staffInput: StaffInput): Staff
    createUser(userInput: UserInput): User
    orderBook(bookId: ID!): Order!
    cancelOrder(orderId: ID!): Book!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
