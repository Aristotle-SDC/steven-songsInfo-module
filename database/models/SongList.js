const mongoose = require('mongoose');

// Create schema
var songListSchema = new mongoose.Schema({
  id: Number,
  plays: Number,
  likes: Number,
  reposts: Number,
  description: String,
  artist: String,
  artistFollowers: Number,
  artistTracks: Number,
});

// Compile schema into a model
var songList = mongoose.model('songList', songListSchema, 'songList');


module.exports = songList;
