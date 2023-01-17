const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

    /**
     *  userId, password, email, createdAt , updatedAt
     */

    userId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unqiue: true
    },
    userType: {
        type: String,
        required: true,
        default: "User"
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => {
            return Date.now();
        }
    },
    updatedAt: {
        type: Date,
        default: () => {
            return Date.now();
        }
    },

});

module.exports = mongoose.model("User", userSchema);