var express = require('express');
const cors = require('cors');

var router = express.Router();

var database = require('../database');

router.use(cors());

router.get("/:id", function(request, response, next){

	var query = `SELECT * FROM use_case_stories WHERE use_case_id=${request.params.id} order by step_id asc; `;

	database.query(query, function(error, data){    // data -> reponse to query

		if(error)
		{	
			throw error; 
		}
		else
		{
			// response.render('sample_data', {title:'Use Cases Table', action:'list', sampleData:data});


			let jsonText = '{ "SectionData" : [';


			data.forEach(function(d){
				var row = '{"step_id": ' + '"' + d.step_id +'"' +
				',	"element": ' + '"' + d.element + '"' + 
				', "short_label": ' + '"' + d.short_label + '"' + 
				', "step_type": ' + '"' + d.step_type + '"' + 
				', "long_desc": ' + '"' + d.long_desc + '" }';

				jsonText += row;

				if(data[data.length-1] != d){
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

module.exports = router;

