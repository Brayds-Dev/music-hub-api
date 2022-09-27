/*
This is the model schema file for the album collection
*/
const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true,
    },
    released: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("album", albumSchema);