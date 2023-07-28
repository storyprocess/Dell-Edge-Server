var express = require('express');
const cors = require('cors');

var router = express.Router();

var database = require('../database');

router.use(cors());

router.get("/", function (request, response, next) {

    var query = `SELECT use_case_id, short_label FROM use_case_stories WHERE step_id = ${request.query.step_id || 1} and element = ${request.query.element || 0} order by use_case_id;`;

    database.changeUser({ database: request.query.db }, (err) => {
        if (err) {
            console.log('err', err)
            res.json({ err: "Internal server error!", error: true, message: err.message })
        }
        database.changeUser({ database: request.query.db }, (err) => {
            if (err) {
                console.log('err', err)
            }

            database.query(query, function (error, data) {    // data -> reponse to query

                if (error) {
                    throw error;
                }
                else {
                    let res = []

                    data.forEach(function (d) {
                        res.push({ use_case_id: d.use_case_id, short_label: d.short_label })
                    });

                    response.json({ use_case_list: res });
                }

            });
        })
    });

});

module.exports = router;

