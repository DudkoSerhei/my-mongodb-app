var express = require('express');
var index = require('./routes/index.js');

var app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', index.index);

var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Server is Up!');
});
