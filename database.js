
const mysql = require('mysql');

var connection = mysql.createConnection({
	host : '54.158.182.60',
	database : 'city', // city, factory
	user : 'root',
	password: 'My7Pass@Word_9_8A_zE'
});

connection.connect(function(error){
	if(error)
	{
		throw error;
	}
	else
	{
		console.log('MySQL Database is connected Successfully');
	}
});

module.exports = connection;

