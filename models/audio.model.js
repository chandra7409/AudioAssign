const mongoose = require("mongoose");


const audioSchema = new mongoose.Schema({

    /**
     * name,  song, description,Image, createdAt , updatedAt
     */
    name: {
        type: String,
        required: true
    },

    song: {
        type: String,
        required: true,

    },

    description: {
        type: String,
        required: true,

    },
    Image: {
        type: [mongoose.SchemaTypes.ObjectId],

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

module.exports = mongoose.model("Audio", audioSchema);