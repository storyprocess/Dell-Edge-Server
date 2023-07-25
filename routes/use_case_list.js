var express = require('express');
const cors = require('cors');

var router = express.Router();

var database = require('../database');

router.use(cors());

router.get("/:db", function (request, response, next) {

    var query = `USE ${request.params.db}; SELECT use_case_id, short_label FROM use_case_stories WHERE step_id = ${request.query.step_id || 1} and element = ${request.query.element || 0} order by use_case_id;`;

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

});

module.exports = router;

