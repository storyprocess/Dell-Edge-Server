var express = require('express');
const cors = require('cors');

var router = express.Router();

var database = require('../database');

router.use(cors());

router.get("/", function (request, response, next) {

	var query = `SELECT * FROM use_case_stories WHERE use_case_id=1 order by step_id asc; `;
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


				let jsonText = '{ "SectionData" : [';


				data.forEach(function (d) {
					var row = '{"step_id": ' + '"' + d.step_id + '"' +
						',	"element": ' + '"' + d.element + '"' +
						', "short_label": ' + '"' + d.short_label + '"' +
						', "long_desc": ' + '"' + d.long_desc + '" }';

					jsonText += row;

					if (data[data.length - 1] != d) {
						jsonText += ',';
					}

				});

				jsonText += ']}';

				const res = JSON.parse(jsonText);

				const list = res.SectionData;

				const groups = list.reduce((groups, item) => {
					const group = (groups[item.step_id] || []);
					group.push(item);
					groups[item.step_id] = group;
					return groups;
				}, {});

				console.log(jsonText);
				response.json(groups);

				//console.log(res.UseCases[0].ID)

			}

		});
	});


});

module.exports = router;

