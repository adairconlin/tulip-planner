const { Schema, model } = require("mongoose");
const { DateTime } = require("luxon");

const eventSchema = new Schema(
    {
        title: {
            type: String,
            trim: true,
            required: "Please enter a name for this event.",
            maxlength: 50
        },
        description: {
            type: String,
            trim: true,
            maxlength: 500
        },
        startDate: {
            type: Schema.Types.ObjectId,
            ref: "Date"
        },
        endDate: {
            type: Schema.Types.ObjectId,
            ref: "Date"
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
            type: String,
            default: DateTime.now().toLocaleString(DateTime.DATETIME_MED)
        }
    }
);

const Event = model("Event", eventSchema);
module.exports = Event;