/*
This is the album controller file for all functions relating to the album requests
*/
const Album = require('../model/album');


// Function to return all album objects from the database
const getAllAlbums = (req, res, next) => {
    Album.find({}, (err, data)=>{
        if(err){
            return res.json({Error: err});
        }
        return res.json(data);
    });
};
// Function to return a specifc album document from the database
const getOneAlbum = (req, res, next) => {
    Album.findOne({title: req.params.title}, (err, data)=>{
        if (err || !data) {
            console.log(err);
            return res.json({message: "Album does not exist!"});
            
        }
        else return res.json(data);
    });
};
// Function to delete a specific album document from the database
const deleteAlbum = (req, res) => {
    Album.deleteOne({title: req.params.title}, (err, data) => {
        if ( data.deletedcount == 0 ) {
            return res.json({message: "Album does not exist!"});
        }
        else if (err) {
            console.log(err)
            return res.json({message: `Something went wrong, please try again. ${err}`});
        }
        else return res.json({message: "Album deleted successfully!"});

    });
};

module.exports = {getAllAlbums, getOneAlbum, deleteAlbum};