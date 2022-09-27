/*
This is the song controller file for all functions relating to the song requests
*/
const Song = require('../model/song');

// Function to return all song objects from the datbase
const getAllSongs = (req, res, next) => {
    Song.find({}, (err, data) => {
        if(err){
            return res.json({Error: err});
        }
        return res.json(data);
    })
};
// Function to return a specifc song object from the database
const getOneSong = (req, res, next) => {
    Song.findOne({name: req.params.name}, (err, data)=>{
        if (err || !data) {
            console.log(err);
            return res.json({message: "Song does not exist!"});
            
        }
        else return res.json(data);
    });
};
// Function to delete a specific song document from the database
const deleteSong = (req, res) => {
    Song.deleteOne({name: req.params.name}, (err, data) => {
        if ( data.deletedCount === 0 ) {
            return res.json({message: "Song does not exist!"});
        }
        else if (err) {
            console.log(err)
            return res.json({message: `Something went wrong, please try again. ${err}`});
        }
        else return res.json({message: "Song deleted successfully!"});

    });
};
// Function to update the song data inside of a specific document 
const updateSong = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        // const options = { new: true };

        const result = await Song.findByIdAndUpdate(
            id,
            updatedData,
            {
                returnOriginal: false
            });

        res.send(result);
    }
    
    catch (error) {
        res.status(400).json({ message: error.message })
    }

}

module.exports = {getAllSongs, getOneSong, deleteSong, updateSong};