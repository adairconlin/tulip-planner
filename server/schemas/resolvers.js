const { User, Event } = require("../models");

const resolvers = {
    Query: {
        events: async() => {
            return Event.find().sort({ createdAt: -1 });
        }
    }
};

module.exports = resolvers;