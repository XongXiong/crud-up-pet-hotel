var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 5000;
var petRoute = require('./routes/pet-router.js');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));
app.use('/pet',petRoute);

app.listen(port, function(){
    console.log('listening on port', port);
  });
  