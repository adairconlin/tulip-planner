const { Schema, model } = require("mongoose");

const dateSchema = new Schema(
    {
        day: {
            type: Number,
            required: true
        },
        month: {
            type: Number,
            required: true,
        },
        year: {
            type: Number,
            required: true
        }
    }
);

const Date = model("Date", dateSchema);
module.exports = Date;