const songList = require('../../database/models/SongList.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/songinfo', {useNewUrlParser: true})

exports.getSong = (id, callback) => {
  console.log('Starting query');
  songList.find({id: id}, (err, result) => {
    callback(err, result);
  })
}