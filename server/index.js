require('newrelic');
const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const songListController = require('./controllers/songListController.js');
const path = require('path');
const port = process.env.PORT || 3001;

const app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static(__dirname + '/../client/dist'));
app.use('/', express.static('./client/dist/'));
app.use(/\/\d+\//, express.static('./client/dist/'));

// GET request to render index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// GET request to db
// only rendering one row from databse for now
// need to write random num generator
// to only GET one id per rendering of client

const ranNum = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


app.get('/api/songInfo/:id', (req, res) => {
  console.log(`GET request for id: ${req.params.id} received.`)
  songListController.getSong(req.params.id, (err, result) => {
    if (err) {
      console.log('Error querying for ID.')
    } else {
      console.log("Queried successfully.");
      res.send(result).status(200); // or json?
    }
  });
});

app.put('/api/songInfo/:id', (req, res) => {
  // console.log('body', req.body);
  console.log(`PUT request for id: ${req.body.id} received.`)
  songListController.updateLikeCount(req.body, (err, result) => {
    if (err) {
      console.log('Error updating information.')
    } else {
      console.log('Updated successfully.')
      res.sendStatus(202);
    }
  });
});


app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

module.exports = app;
