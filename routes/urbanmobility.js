var express = require('express');
const cors = require('cors');

var router = express.Router();

var database = require('../database');

router.use(cors());

router.get("/:id", function(request, response, next){

	var query = `SELECT * FROM urban_mobility WHERE id=${request.params.id};`;

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
				var row = '{"seq": ' + '"' + d.seq +'"' +
				', "short_label": ' + '"' + d.short_label + '"' +
				', "long_desc": ' + '"' + d.long_desc + '" }';

				jsonText += row;

				if(data[data.length-1] != d){
					jsonText += ',';
				   }

			});

			jsonText += ']}';

			const res = JSON.parse(jsonText);


			console.log(jsonText);
			response.json(res);


		}

	});

});

module.exports = router;

