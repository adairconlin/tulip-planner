const { Schema, model } = require("mongoose");

const dateSchema = new Schema(
    {
        day: {
            type: String,
            required: true
        },
        month: {
            type: String,
            required: true,
        },
        year: {
            type: String,
            required: true
        },
        events: [
            {
                type: Schema.Types.ObjectId,
                ref: "Event"
            }
        ],
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    }
);

const Date = model("Date", dateSchema);
module.exports = Date;