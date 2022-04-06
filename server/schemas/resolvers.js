const { User, Event, Category } = require("../models");
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
                .populate("events")
                .populate("categories")
                .select("-_v -password")
        },
        user: async (parent, { email }) => {
            return User.findOne({ email })
                .select("-_v -password")
                .populate("events")
                .populate("categories");
        },
        events: async(parent, { user }) => {
            const params = user ? { user } : {};
            return Event.find(params)
                .populate("user")
                .populate("category")
                .sort({ createdAt: -1 });
        },
        myCategories: async(parent, { user }) => {
            const params = user ? { user } : {};
            return Category.find(params);
        }
    },
    Mutation: {
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
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        addEvent: async (parent, args, context) => {
            if(args.category) {
                const checkForCategory = await Category.findOne({ category: args.category });
                if(!checkForCategory) {
                    throw new AuthenticationError("Category does not exist");
                } 
                args.category = checkForCategory._id;
            }

            if(context.user) {
                const event = await Event.create({ ...args, user: context.user._id });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { events: event._id } },
                    { new: true }
                );
                return event;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        addCategory: async(parent, args, context) => {
            if(context.user) {
                const category = await  Category.create({ ...args, user: context.user._id});

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { categories: category._id } },
                    { new: true }
                );
                return category;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        editUser: async (parent, args, context) => {
            if(context.user) {
                return await User.findByIdAndUpdate( { _id: context.user._id }, args, { new: true })
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        editEvent: async (parent, args, context) => {
            if(context.user) {
                return await Event.findByIdAndUpdate( { _id: args.eventId }, args, { new: true })
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        editCategory: async (parent, args, context) => {
            if(context.user) {
                return await Category.findOneAndUpdate( { _id: args.categoryId }, args, { new: true })
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        deleteUser: async (parent, args, context) => {
            if(context.user) {
                const removeUser = await Category.deleteMany(
                    { user: context.user._id }
                )
                .then(updatedData => Event.deleteMany(
                    { user: context.user._id }
                ))
                .then(updatedData => User.findByIdAndDelete(
                    { _id: context.user._id }
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
                ) 
                .then(updatedData => Event.findByIdAndDelete(
                    { _id: eventId },
                    { new: true }
                ))
                return removeEvent;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        deleteCategory: async (parent, { categoryId }, context) => {
            if(context.user) {
                const removeCategory = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { categories: categoryId } },
                    { new: true }
                ) 
                .then(updatedData => Category.findOneAndDelete(
                    { _id: categoryId },
                    { new: true }
                ))
                return removeCategory;
            }
            throw new AuthenticationError("You need to be logged in!");
        }
    }
};

module.exports = resolvers;