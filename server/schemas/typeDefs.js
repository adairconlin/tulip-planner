const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type Event {
        _id: ID
        eventText: String
        createdAt: String
        username: String
        eventDate: String
        eventDay: String

    }

    type Query {
        events: [Event]
    }
`;

module.exports = typeDefs;