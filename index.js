var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500).render('error', { error: err });
}

MongoClient.connect('mongodb://localhost:27017/video', function(err, db) {

  assert.equal(null, err);
  app.get('/', function(req, res, next) {
        res.render('index', {});
    });

  app.post('/movie', function(req, res, next) {

    var title = req.body.title;
    var year = req.body.year;
    var imdb = req.body.imdb;

    if ((title == '') || (year == '') || (imdb == '')) {
      next('Error, check the data!');
    } else {
        db.collection('movies').insertOne(
          { 'title': title, 'year': year, 'imdb': imdb },
          function (err, resp) {
              assert.equal(null, err);
              res.send("Paste _id: " + resp.insertedId);
          }
      );
    }
  });

  app.use(errorHandler);

  var port = process.env.PORT || 3000;

  app.listen(port, function () {
    console.log('Server is Up!');
  });

});
