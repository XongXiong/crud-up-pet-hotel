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
// POST /owner

// POST /pet

// PUT /in/:id

// PUT /out/:id

// PUT /pet/:id

// DELETE /:id

module.exports = router;