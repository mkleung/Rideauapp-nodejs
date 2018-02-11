// // The following code is based off a toggle menu by @Bradcomp
// // source: https://gist.github.com/Bradcomp/a9ef2ef322a8e8017443b626208999c1
(function() {
    $('.navbar-burger').on('click', function(){
    	$(this).toggleClass('is-active');
    });


    // var menu = document.querySelector('.nav-menu');
    // burger.addEventListener('click', function() {
    //     burger.classList.toggle('is-active');
    //     menu.classList.toggle('is-active');
    // });
})();



/**
|==========================================================================
|  Google maps
|==========================================================================
*/

function initMap() {
// 	var markers = {lat: 45.4045, lng: -75.6810};
// 	var map = new google.maps.Map(document.getElementById('map'), {
// 	zoom: 13,
// 	center: markers
// });
// var marker = new google.maps.Marker({
// 	position: rideau,
// 	map: map,
// 	label: {
// 		text: "Fair",
// 		color: "#4682B4",
// 		fontSize: "10px",
// 		fontWeight: "bold"
// 	},
// 	title: "Hello World!",
// 	visible: true
// 	});

	var locations = [
      ['Bondi Beach',45.405250, -75.680992, 4],
    ];

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: new google.maps.LatLng(45.405250, -75.680992),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) { 
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map,
        label: {
			text: "Fair",
			color: "#4682B4",
			fontSize: "10px",
			fontWeight: "bold"
		}
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }

}


/**
|==========================================================================
| READ RESULTS FROM JSON FILE
|==========================================================================
*/

var mapLocations = [];

$.getJSON( "../rideau.json", function( data ) {
	var items = [];
	$.each( data, function( key, val ) {
		var title = val.title;
		var condition = val.condition;
		var length = val.length;

		switch(condition) {
		    case "Excellent":
		    	var color = "has-text-info";
		    	break;
		    case "Good":
		        var color = "has-text-success";
		        break;
		    case "Fair":
		        var color = "has-text-warning";
		        break;
		    default:
		        var color = "has-text-danger";
		}

		//mapLocations.push([title, 45.405250, -75.680992, condition, length]);

		items.push( "<li>" + title + " - <span class='" + color + "'><strong>" + condition + "</strong></span></li>" );
	});

$( "<ul/>", {
		"class": "my-new-list",
		html: items.join( "" )
	}).appendTo( "#results" );
});


