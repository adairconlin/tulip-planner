const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type Event {
        _id: ID
        userId: String
        eventText: String
        createdAt: String
        eventDate: String
        eventDay: String
        details: [Detail]
    }

    type Detail {
        _id: ID
        userId: String
        detailText: String
        createdAt: String
    }
    
    type User {
        _id: ID
        username: String
        email: String
        events: [Event]
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        events(userId: String): [Event]
        event(_id: ID!): Event
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addEvent(eventText: String!, eventDay: String, eventDate: String): Event
        addDetail(detailText: String!, eventId: ID!): Event

        deleteUser(userId: ID!): User
        deleteEvent(eventId: ID!): User
        deleteDetail(detailId: ID!, eventId: ID!): Event
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;