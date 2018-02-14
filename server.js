var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var app = express();


if (app.get('env')) {
	var url = "https://young-ridge-69555.herokuapp.com";
	console.log("url: " + url);
}
else {
	var url = "http://localhost:8000/";
	console.log("url: " + url);
}


/*
|==========================================================================
| TEST
|==========================================================================
*/


app.use(express.static('public'));

//  app.get('/', function(req, res){
// 	console.log("get");
// 	res.send({hello: "World"});
// });


/*
|==========================================================================
| GET
|==========================================================================
*/

app.get('/list', function(req, res){
	var obj = JSON.parse(fs.readFileSync('public/rideau.json', 'utf8'));
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

			results.shift();

			// thi); saves to an output file
			fs.writeFile('public/rideau.json', JSON.stringify(results, null, 4), function(err){
			    console.log('File successfully written! - Check your project directory for the public/rideau.json file');
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

//app.listen('8081')

var port = process.env.PORT || 8000
app.listen(port, function() {
    console.log("App is running on port " + port);
});

/*
|==========================================================================
| RUN SCRAPER EVERY MINUTE  (60000 = 1 minute)
|==========================================================================
*/

var requestLoop = setInterval(function(){
		
	  request({
	      url: url + "/scrape",
	      method: "GET",
	      timeout: 10000,
	      followRedirect: true,
	      maxRedirects: 10
	  },function(error, response, body){
	      if(!error && response.statusCode == 200){
	          console.log('sucess at scraping!');
	      }else{
	          console.log('error' + response.statusCode);
	      }
	  });
}, 3600000);





exports = module.exports = app;


