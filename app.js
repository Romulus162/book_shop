const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(bodyParser.json());

app.use('/api', graphqlHTTP({
    schema: buildSchema(`
        type RootQuery {
            books: [String!]!
        }

        type RootMutation {
            createBook(name: String): String
        }

        schema {

            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        books: () =>{
            return ['Papion', 'Jurassic park', 'Maze Runner'];
        },
        createBook: (args) =>{
            const bookName = args.name;
            return bookName;
        }
    },
    graphiql: true
}));

app.listen(3000);
