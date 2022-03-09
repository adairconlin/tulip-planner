const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        event: [Event]
    }

    type Event {
        _id: ID
        eventText: String
        createdAt: String
        username: String
        eventDate: String
        eventDay: String

    }

    type Query {
        me: User
        users: [User]
        events: [Event]
        user(username: String!): User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;