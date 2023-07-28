var express = require('express');
const cors = require('cors');

var router = express.Router();

var database = require('../database');

router.use(cors());

router.get("/:id", function (request, response, next) {

	var query = `SELECT * FROM solutions WHERE id=${request.params.id}`;
	database.changeUser({ database: request.query.db }, (err) => {
		if (err) {
			console.log('err', err)
			res.json({ err: "Internal server error!", error: true, message: err.message })
		}
		database.query(query, function (error, data) {    // data -> reponse to query

			if (error) {
				throw error;
			}
			else {
				// response.render('sample_data', {title:'Use Cases Table', action:'list', sampleData:data});


				let jsonText = '{ "Solution" : [';


				data.forEach(function (d) {
					var row = '{"soln_type": ' + '"' + d.soln_type + '"' +
						', "short_label": ' + '"' + d.short_label + '"' +
						', "details_url": ' + '"' + d.details_url + '"' +
						', "long_desc": ' + '"' + d.long_desc + '" }';

					jsonText += row;

					if (data[data.length - 1] != d) {
						jsonText += ',';
					}

				});

				jsonText += ']}';

				const res = JSON.parse(jsonText);

				console.log(jsonText);
				response.json(res);

				//console.log(res.UseCases[0].ID)

			}

		});
	});

});

module.exports = router;

