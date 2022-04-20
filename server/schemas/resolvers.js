const { User, Event, Date, Category } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .populate("events")
                    .populate("categories")
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
        event: async (parent, args, context) => {
            if(context.user) {
                const findEvent = await Event.findOne({ _id: args._id })
                    .populate("startDate")
                    .populate("endDate")
                    .populate("category");
                return findEvent;
            }
            throw new AuthenticationError("Not logged in.");
        },
        myEvents: async(parent, args, context) => {
            if(context.user) {
                const myEvent = await Event.find({ user: context.user._id })
                    .populate("user")
                    .populate("startDate")
                    .populate("endDate")
                    .populate("category")
                    .sort({ createdAt: -1 });
                return myEvent;
            }
            throw new AuthenticationError("Not logged in.");
        },
        myDates: async(parent, args, context) => {
            if(context.user) {
                const dates = await Date.find({ user: context.user._id })
                    .populate("events")
                    .populate("user");
                return dates;
            }
            throw new AuthenticationError("Not logged in.");
        },
        myCategories: async(parent, args, context) => {
            if(context.user) {
                const categories = await Category.find({ user: context.user._id })
                .populate("user");
                return categories;
            }
            throw new AuthenticationError("Not logged in.");
        },
        todaysDate: async(parent, args, context) => {
            if(context.user) {
                const today = await Date.find(
                    { 
                        user: { $in: context.user._id }, 
                        day: { $in: args.day },
                        month: {$in: args.month },
                        year: { $in: args.year }
                    }
                )
                    .populate("events");
                return today;
            }
            throw new AuthenticationError("Not logged in.");
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
            // checks if the category selected exists and then assigns
            // category's id to args.category for Event.create to use
            if(args.category.length) {
                const checkForCategory = await Category.findOne({ category: args.category });
                if(!checkForCategory) {
                    throw new AuthenticationError("Category does not exist");
                } 
                args.category = checkForCategory._id;
            } else {
                args.category = null;
            }

            if(context.user) {
                //create array from startDate string
                const startDateArr = args.startDate.split(",");
                const checkStartDate = await Date.find(
                    { 
                        user: { $in: context.user._id }, 
                        day: { $in: startDateArr[0] },
                        month: {$in: startDateArr[1] },
                        year: { $in: startDateArr[2] }
                    }
                )

                //check if startDate exists for user
                if(checkStartDate.length) {
                    args.startDate = checkStartDate[0]._id;
                } else {
                    await Date.create({
                        user: context.user._id,
                        day: startDateArr[0],
                        month: startDateArr[1],
                        year: startDateArr[2]
                    }).then(data => {
                        args.startDate = data._id
                    })
                }
                //check an end date was given
                if(args.endDate.length) {
                    const endDateArr = args.endDate.split(",");
                    const checkEndDate = await Date.find(
                        { 
                            user: { $in: context.user._id }, 
                            day: { $in: endDateArr[0] },
                            month: {$in: endDateArr[1] },
                            year: { $in: endDateArr[2] }
                        }
                    )
                    
                    // check if endDate exists for user
                    if(checkEndDate.length) {
                        args.endDate = checkEndDate._id;
                    } else {
                        await Date.create({
                            user: context.user._id,
                            day: endDateArr[0],
                            month: endDateArr[1],
                            year: endDateArr[2]
                        }).then(data => {
                            args.endDate = data._id
                        })
                    }
                } else {
                    args.endDate = null;
                }

                const event = await Event.create({
                    ...args, 
                    user: context.user._id,
                });

                await Date.findByIdAndUpdate(
                    { _id: args.startDate },
                    { $push: { events: event._id } },
                    { new: true }
                );

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