const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        _id: ID
        name: String
        email: String
        events: [Event]
        categories: [Category]
        createdAt: String
    }
    
    type Event {
        _id: ID
        title: String
        description: String
        startDate: String
        endDate: String
        category: Category
        user: User
        createdAt: String
    }

    type Category {
        _id: ID
        categoryName: String
        color: String
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(email: String!): User
        event(_id: ID!): Event
        myEvents: [Event]
        myCategories: [Category]
    }

    type Mutation {
        login(email: String!, password: String!): Auth

        addUser(name: String!, email: String!, password: String!): Auth
        addEvent(title: String!, description: String, startDate: String!, endDate: String, category: String): Event
        addCategory(categoryName: String!, color: String!): Category

        editUser(name: String, email: String, password: String): User
        editEvent(eventId: ID!, title: String, description: String, startDate: String, endDate: String, category: String): Event
        editCategory(categoryId: ID!, categoryName: String, color: String): Category

        deleteUser: User
        deleteEvent(eventId: ID!): User
        deleteCategory(categoryId: ID!): User
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;