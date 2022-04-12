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
        startDate: Date
        endDate: Date
        category: Category
        user: User
        createdAt: String
    }

    type Date {
        _id: ID
        day: String
        month: String
        year: String
        events: [Event]
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
        myDates: [Date]
        myCategories: [Category]
    }

    type Mutation {
        login(email: String!, password: String!): Auth

        addUser(name: String!, email: String!, password: String!): Auth
        addEvent(title: String!, description: String, startDate: String!, endDate: String, category: String): Event
        addDate(day: String!, month: String!, year: String!): Date
        addCategory(categoryName: String!, color: String!): Category

        editUser(name: String, email: String, password: String): User
        editEvent(eventId: ID!, title: String, description: String, startDate: ID!, endDate: ID!, category: String): Event
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