const songList = require('../../database/models/SongList.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/songinfo', {useNewUrlParser: true})

exports.getSong = (id, callback) => {
  console.log('Retrieving song');
  songList.find({id: id}, (err, result) => {
    callback(err, result);
  })
}

exports.updateLikeCount = (body, callback) => {
  console.log('Updating count');
  songList.findOneAndUpdate({id: body.id}, {likes: body.likes}, callback)
}