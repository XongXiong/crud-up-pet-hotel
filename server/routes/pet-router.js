var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');

// GET /pet

// GET /owner

// POST /owner
// {
//   firstName:
//   lastName:
// }

router.post('/owner',function(req,res){
  var owner = req.body;
  pool.connect(function(errorConnectingToDb,db,done){
    if(errorConnectingToDb){
      console.log('Error connecting to DB');
      res.sendStatus(500);
    } else {
      var queryText = 'INSERT INTO "owners" ("first_name","last_name") VALUES ($1, $2);';
      db.query(queryText,[owner.firstName,owner.lastName],function(errorQueryingDb,result) {
        done();
        if (errorQueryingDb) {
          console.log('Error in POST route querying database with');
          console.log(queryText);
          res.sendStatus(500);
        } else {
          console.log('New owner added';
          res.sendStatus(201);
        }
      });
    }
  });
});
// POST /pet

// PUT /in/:id

// PUT /out/:id

// PUT /pet/:id

// DELETE /:id

module.exports = router;