const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
    {
        categoryName: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        color: {
            type: String,
            required: true,
            trim: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        events: [
            {
                type:  Schema.Types.ObjectId,
                ref: "Event"
            }
        ]
    }
);

const Category = model("Category", categorySchema);
module.exports = Category;