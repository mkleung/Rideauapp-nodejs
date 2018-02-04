var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var app = express();



/*
|==========================================================================
| TEST
|==========================================================================
*/
 app.get('/', function(req, res){
	console.log("get");
	res.send({hello: "World"});
});


/*
|==========================================================================
| GET
|==========================================================================
*/

app.get('/list', function(req, res){
	var obj = JSON.parse(fs.readFileSync('rideau.json', 'utf8'));
	res.send(obj);
});



/*
|==========================================================================
| SCRAPE
|==========================================================================
*/
app.get('/scrape', function(req, res){

  	var results = new Array();

  	url = 'http://ncc-ccn.gc.ca/places-to-visit/rideau-canal-skateway';

	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
			
			$('.table tbody tr').each(function(i, elem) {
				var stretch = $(this).text();
				var rideauArray = stretch.split('\n\t\t\t\t\t\t\t');
				var title =  rideauArray[2];
				var condition = rideauArray[1];
				var tracklength = rideauArray[3];
			  	results[i] = { title : title, condition : condition, length : tracklength };
			});

			// this saves to an output file
			fs.writeFile('rideau.json', JSON.stringify(results, null, 4), function(err){
			    console.log('File successfully written! - Check your project directory for the output.json file');
			});

			res.send("Success");
		}
		else {
			res.send("Error");
		}

	});

});


/*
|==========================================================================
| START SERVER
|==========================================================================
*/

app.listen('8081')

console.log('Listening... Go to http://localhost:8081');

exports = module.exports = app;