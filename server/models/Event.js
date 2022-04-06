const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
    {
        title: {
            type: String,
            trim: true,
            required: "Please enter a name for this event.",
            minlength: 1,
            maxlength: 50
        },
        description: {
            type: String,
            trim: true
        },
        startDate: {
            type: String,
            required: true
        },
        endDate: {
            type: String,
            required: false
        },
        category: {
            type:  Schema.Types.ObjectId,
            ref: "Category"
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //get: timestamp => dateFormat(timestamp)
        }
    }
);

const Event = model("Event", eventSchema);
module.exports = Event;