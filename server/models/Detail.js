const { Schema, model } = require("mongoose");

const detailSchema = new Schema(
    {
        userId: {
            type: String,
            required: true
        },
        detailText: {
            type: String,
            required: "Please fill out the note text.",
            minlength: 1,
            maxlength: 500
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //get timestamp => dateFormat(timestamp)
        }
    }
);

module.exports = detailSchema;