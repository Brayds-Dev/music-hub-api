/*
This is the model schema file for the artist collection
*/
const mongoose = require("mongoose");

const artistSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    members: {
        type: Array,
        required: true
    }

})

module.exports = mongoose.model("artists", artistSchema);