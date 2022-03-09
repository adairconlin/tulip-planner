const { Schema, model } = require("mongoose");
const detailSchema = require("./Detail");

const eventSchema = new Schema(
    {
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
        username: {
            type: String,
            required: true
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