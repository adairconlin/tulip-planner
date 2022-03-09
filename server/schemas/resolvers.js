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
                .populate("events");
        },
        events: async(parent, { userId }) => {
            const params = userId ? { userId } : {};
            return Event.find(params)
                .populate("details")
                .sort({ createdAt: -1 });
        },
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
                const event = await Event.create({ ...args, userId: context.user._id });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { events: event._id } },
                    { new: true }
                );
                return event;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        addDetail: async (parent, { eventId, detailText }, context) => {
            if(context.user) {
                console.log(context.user);
                const updatedEvent = await Event.findOneAndUpdate(
                    { _id: eventId },
                    { $push: { details: { detailText, userId: context.user._id } } },
                    { new: true, runValidators: true }
                );
                return updatedEvent;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        deleteUser: async (parent, { userId }, context) => {
            if(context.user) {
                const removeUser = await Event.deleteMany(
                    { userId: context.user._id }
                ) .then(updatedData => User.findByIdAndDelete(
                    { _id: userId }
                ));
                return removeUser;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        deleteEvent: async (parent, { eventId }, context) => {
            if(context.user) {
                const removeEvent = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { events: eventId  } },
                    { new: true }
                ) .then(updatedData => Event.findByIdAndDelete(
                    { _id: eventId },
                    { new: true }
                ))
                return removeEvent;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        deleteDetail: async (parent, { eventId, detailId }, context) => {
            if(context.user) {
                const removeDetail = await Event.findByIdAndUpdate(
                    { _id: eventId },
                    { $pull: { details: { _id: detailId } } },
                    { new: true }
                )
                return removeDetail;
            }
            throw new AuthenticationError("You need to be logged in!");
        }
    }
};

module.exports = resolvers;