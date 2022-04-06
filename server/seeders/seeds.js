const db = require("../config/connection");
const { User, Event, Category } = require("../models");

db.once("open", async() => {
    await Category.deleteMany({});
    await Event.deleteMany({});
    await User.deleteMany({});

    console.log("All old data has been removed.");
    process.exit(0);
});