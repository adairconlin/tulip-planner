const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const { DateTime } = require("luxon");

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            require: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!']
        },
        password: {
            type: String,
            required: true,
            minlength: [8, "Password must be at least 8 characters"]
        },
        events: [
            {
                type: Schema.Types.ObjectId,
                ref: "Event"
            }
        ],
        categories: [
            {
                type:  Schema.Types.ObjectId,
                ref: "Category"
            }
        ],
        createdAt: {
            type: String,
            default: DateTime.now().toLocaleString(DateTime.DATETIME_MED)
        }
    }
);

// set up pre-save middleware to create password
userSchema.pre("save", async function(next) {
    // check to see if data is new or if password has been modified so this can be used for both instances
    if(this.isNew || this.isModified("password")) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

// compare incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);
module.exports = User;