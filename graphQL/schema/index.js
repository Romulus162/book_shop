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

type Staff {
    _id: ID!
    email: String!
    password: String
    createdBooks: [Book!]
}

type stfAuthData {
    staffId: ID!
    token: String!
    tokenExpiration: Int!
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
    orders: [Order!]!
    login(email: String!, password: String!): stfAuthData!
}

type RootMutation {
    createBook(bookInput: BookInput): Book
    createStaff(staffInput: StaffInput): Staff
    orderBook(bookId: ID!): Order!
    cancelOrder(orderId: ID!): Book!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
