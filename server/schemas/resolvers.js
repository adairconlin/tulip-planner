const { User, Event } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select("-_v -password");
                return userData;
            }
            throw new AuthenticationError("Not logged in.");
        },
        users: async() => {
            return User.find()
                .select("-_v -password")
        },
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select("-_v -password")
                .populate("events")
        },
        events: async() => {
            return Event.find().sort({ createdAt: -1 });
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if(!user) {
                throw new AuthenticationError("Incorrect credentials.");
            }

            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw) {
                throw new AuthenticationError("Incorrect credentials");
            }

            const token = signToken(user);
            return { token, user };
        },
        addEvent: async (parent, args, context) => {
            if(context.user) {
                console.log(context.user);
                const event = await Event.create({ ...args, userId: context.user._id });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { events: event._id } },
                    { new: true }
                );
                return event;
            }

            throw new AuthenticationError("You need to be logged in!");
        }
    }
};

module.exports = resolvers;