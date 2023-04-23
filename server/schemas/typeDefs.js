const { gql } = require('apollo-server-express');

const typeDefs = gql `
    type User {
        _id: ID
        username: String!
        email: String!
        password: String
        savedBooks: [Book]
        bookCount: Int
    }
    type Book {
        bookId: ID!
        authors: [String]
        description: String
        image: String
        link: String
        title: String!
    }
    type Auth {
        token: ID!
        user: User
    }
    input bookData {
        bookId: ID!
        authors: [String]
        description: String
        image: String
        link: String
        title: String!
    }

    type Query {
        me: User
    }

    type Mutation {
        addUser(
            username: String!
            email: String!
            password: String!
        ): Auth
        login(email: String!, password: String!): Auth
        saveBook(
            input: bookData!
        ): User
        deleteBook(
            bookId: ID!
        ): User
    }
`;

module.exports = typeDefs;