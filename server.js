var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();





 app.get('/', function(req, res){
	console.log("get");
	res.send({name: "yoshi"});
});


app.get('/scrape', function(req, res){

  	// var title, release, rating;
   // 	var json = { title : "", length : "", condition : ""};

  	var results = new Array();

  	url = 'http://ncc-ccn.gc.ca/places-to-visit/rideau-canal-skateway';

	request(url, function(error, response, html){
		
		if(!error){
			var $ = cheerio.load(html);
			
			$('.table tbody tr').each(function(i, elem) {

				var stretch = $(this).text();
				var rideauArray = stretch.split('\n\t\t\t\t\t\t\t');

			  	results[i] = { title : rideauArray[2], condition : rideauArray[1], length : rideauArray[3]};
			});

			console.log(results);

			// $('.table tbody').filter(function(){
   //  //             var data = $(this);

   //  //             data.children().each(function(i, elem) {
			// 	//   	results.push();
			// 	// });

   //  //             console.log(data.children().second().text());
   //              // title = data.children().first().text();
   //              // json.title = title;
   //          })

		}
	});

});



app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;