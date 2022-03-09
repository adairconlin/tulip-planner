const { Schema, model } = require("mongoose");

const detailSchema = new Schema(
    {
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
        },
        username: {
            type: String,
            required: true
        },
    }
);

module.exports = detailSchema;