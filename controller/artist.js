/*
This is the artist controller file for all functions relating to the artist requests
*/
const Artist = require('../model/artist');

// Function to return all artist objects from the database
const getAllArtists = (req, res, next) => {
    Artist.find({}, (err, data)=>{
        if(err){
            return res.json({Error: err});
        }
        return res.json(data);
    })
};
// Function to return a specifc artist document from the database
const getOneArtist = (req, res, next) => {
    Artist.findOne({name: req.params.name}, (err, data)=>{
        if (err || !data) {
            console.log(err);
            return res.json({message: "Artist does not exist!"});
            
        }
        else return res.json(data);
    });
};
// Function to update the artist data inside of a specific document
const updateArtist = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        // const options = { new: true };

        const result = await Artist.findByIdAndUpdate(
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

module.exports = {getAllArtists, getOneArtist, updateArtist};