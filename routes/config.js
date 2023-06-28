var express = require('express');
const cors = require('cors');

var router = express.Router();

var database = require('../database');

router.use(cors());

router.get("/", function(request, response, next){

	var query = "SELECT * FROM config_settings ORDER BY ID";

	database.query(query, function(error, data){    // data -> reponse to query

		if(error)
		{
			throw error; 
		}
		else
		{
			// response.render('sample_data', {title:'Use Cases Table', action:'list', sampleData:data});


			let jsonText = '{ "ConfigSettings" : [';


			data.forEach(function(d){
				var row = '{"id": ' + '"' + d.id + '"' + 
				', "config_value": ' + '"' + d.config_value + '"' + 
				', "ui_element": ' + '"' + d.ui_element + '" }';

				jsonText += row;

				if(data[data.length-1] != d){
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

