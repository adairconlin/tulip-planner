const { Schema, model } = require("mongoose");
const detailSchema = require("./Detail");

const eventSchema = new Schema(
    {
        userId: {
            type: String,
            required: true
        },
        eventText: {
            type: String,
            required: "Please fill out some text for this event.",
            minlength: 1,
            maxlength: 120
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //get: timestamp => dateFormat(timestamp)
        },
        eventDate: {
            type: Date,
            required: false
        },
        eventDay: {
            type: String,
            required: false
        },
        detail: [detailSchema]
    }
);

const Event = model("Event", eventSchema);
module.exports = Event;