/*
This is the routes file where the HTTP request is specified for all 10 requests.
Each request calls upon a function from our controller files relating to that request
*/
const express = require('express');
const router = express.Router();

// Import all controller files for each model
const albumController = require('../controller/album');
const artistController = require('../controller/artist');
const songController = require('../controller/song');

// Import controller file for user model
const userController = require('../controller/user');

// Import authentication function from middleware
const auth = require('../middleware/auth');

// Route to handle request for getting a list of albums and their details
router.get('/album', auth, albumController.getAllAlbums);

// Route to handle request for getting details of a specific album
router.get('/album/:title', auth, albumController.getOneAlbum);

// Route to handle request to delete specific album from database
router.delete('/album/delete/:title', auth, albumController.deleteAlbum);

// Route to handle request for getting a list of artits and their details
router.get('/artist', auth, artistController.getAllArtists);

// Route to handle request for getting details of a specific artist
router.get('/artist/:name', auth, artistController.getOneArtist);

// Route to handle request to update details of a specific artist
router.patch('/artist/update/:id', auth, artistController.updateArtist);

// Route to handle request for getting a list of songs and their details
router.get('/song', auth, songController.getAllSongs);

// Route to handle request for getting details of a specific song
router.get('/song/:name', auth, songController.getOneSong);

// Route to handle request to update details of a specific song
router.patch('/song/update/:id',auth, songController.updateSong);

// Route to handle request to delete specific song from database
router.delete('/song/delete/:name',auth, songController.deleteSong);

// Route for register
router.post('/register', userController.registerUser);

// Route for login
router.post('/login', userController.logInUser);

module.exports = router;