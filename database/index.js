var mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost:27017/songinfo', {useNewUrlParser: true})

db
.then( () => {
  console.log('Connected to db.');
})
.catch((err) => {
  console.log('Cannot connect to db.', err);
})

module.exports = db;
