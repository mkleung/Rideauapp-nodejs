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

  	//All the web scraping magic will happen here
  	
  	url = 'http://ncc-ccn.gc.ca/places-to-visit/rideau-canal-skateway';

	request(url, function(error, response, html){
		
		if(!error){
			var $ = cheerio.load(html);
			
			$('.table tbody').filter(function(){
                var data = $(this);

                console.log(data.children().first().text());
                // title = data.children().first().text();
                // json.title = title;
            })

		}
	});

});



app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;