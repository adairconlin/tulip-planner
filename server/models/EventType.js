const { Schema, model } = require("mongoose");

const eventTypeSchema = new Schema(
    {
        typename: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        color: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    }
);

const EventType = model("EventType", eventTypeSchema);
module.exports = EventType;