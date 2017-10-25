var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');

// GET /pet
router.get('/', function (req, res) {
    // Attempt to connect to the database
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // We connected to the db!!!!! pool -1
            //added ordering
            var queryText = 'SELECT * FROM "owners" o JOIN "pets" p ON o."id" = p."owner_id";';
            db.query(queryText, function (errorMakingQuery, result) {
                // We have received an error or result at this point
                done(); // pool +1
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                    console.log(result.rows);
                }
            }); // END QUERY
        }
    }); // END POOL
})

// GET OWNER

router.get('/owner', function (req, res) {
    // Attempt to connect to the database
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // We connected to the db!!!!! pool -1
            //added ordering
            var queryText = 'SELECT * FROM "owners" o;';
            db.query(queryText, function (errorMakingQuery, result) {
                // We have received an error or result at this point
                done(); // pool +1
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                    console.log(result.rows);
                }
            }); // END QUERY
        }
    }); // END POOL
})

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
          console.log('New owner added');
          res.sendStatus(201);
        }
      });
    }
  });
});

// POST /pet
// {
//   name:
//   breed:
//   color:
//   owner_id:
// }

router.post('/',function(req,res){
  var pet = req.body;
  pool.connect(function(errorConnectingToDb,db,done){
    if(errorConnectingToDb){
      console.log('Error connecting to DB');
      res.sendStatus(500);
    } else {
      var queryText = 'INSERT INTO "pets" ("name","breed","color","owner_id") VALUES ($1, $2, $3, $4);';
      db.query(queryText,[pet.name,pet.breed,pet.color,pet.owner_id],function(errorQueryingDb,result) {
        done();
        if (errorQueryingDb) {
          console.log('Error in POST route querying database with');
          console.log(queryText);
          res.sendStatus(500);
        } else {
          console.log('New pet added');
          res.sendStatus(201);
        }
      });
    }
  });
});
// PUT /in/:id

// PUT /out/:id

// PUT /pet/:id

// DELETE /:id

module.exports = router;