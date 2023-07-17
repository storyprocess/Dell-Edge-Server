var express = require('express');
const cors = require('cors');

var router = express.Router();

var database = require('../database');

router.use(cors());

router.get("/", function (request, response, next) {

	var query = "SELECT * FROM solutions ORDER BY id";
	console.log(request.query.type)
	if (request.query.type) {
		query = `SELECT * FROM solutions where soln_type = '${request.query.type}' ORDER BY id`;
	}
	console.log(query)


	database.query(query, function (error, data) {    // data -> reponse to query

		if (error) {
			throw error;
		}
		else {
			// response.render('sample_data', {title:'Use Cases Table', action:'list', sampleData:data});


			let jsonText = '{ "Solutions" : [';


			data.forEach(function (d) {
				var row = '{"id": ' + '"' + d.id + '"' +
					', "short_label": ' + '"' + d.short_label + '"' +
					', "soln_type": ' + '"' + d.soln_type + '"' +
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

module.exports = router;

