/*
This is the model schema file for the song collection
*/
const mongoose = require('mongoose');

const songSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true 
    },
    artist: {
        type: String,
        required: true
    },
    album: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('songs', songSchema);