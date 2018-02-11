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
| READ RESULTS FROM JSON FILE
|==========================================================================
*/

var locations = [];

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
		        var color = "has-text-primary";
		        break;
		    case "Poor":
		    	var color = "has-text-warning";
		    	break;
		    case "Closed":
		    	var color = "has-text-danger";
		    	break;
		    default:
		        var color = "has-text-danger";
		}

		items.push( "<li>" + title + " - <span class='" + color + "'><strong>" + condition + "</strong></span></li>" );

		
		switch(title) {
		    case "Rideau Locks (NAC) - Mackenzie-King Bridge":
		    	var latitude = 45.424009;
		    	var longitude = -75.693084;
		    	break;

		    case "MacKenzie-King Bridge - Laurier Bridge":
		    	var latitude = 45.422992;
		    	var longitude = -75.690230;
		        break;

		    case "Laurier Bridge - Corktown Footbridge / Somerset":
		    	var latitude = 45.421426;
		    	var longitude = -75.686647;
		        break;
  			
  			case "Corktown Footbridge / Somerset - Concord Street":
		    	var latitude = 45.418670;
		    	var longitude = -75.680587;
		        break;

		    case "Concord Street - Pretoria Bridge":
		    	var latitude = 45.415537;
		    	var longitude = -75.682013;
		        break;

		    case "Pretoria Bridge - Fifth Ave":
		    	var latitude = 45.418670;
		    	var longitude = -75.680587;
		        break;

		    case "Patterson Creek - Patterson Creek":
		    	var latitude = 45.408212;
		    	var longitude = -75.681574;
		        break;

		    case "Fifth Ave - Pig Island":
		    	var latitude = 45.401405;
		    	var longitude = -75.67911;
		        break;

	    	case "Pig Island - Bank Street Bridge":
		    	var latitude = 45.398008;
		    	var longitude = -75.680587;
		        break;

		    case "Bank Street Bridge - Bronson Bridge":
		    	var latitude = 45.394919;
		    	var longitude = -75.689840;
		        break;

		    case "Bronson Bridge - Dows Lake":
		    	var latitude = 45.393804;
		    	var longitude = -75.697049;
		        break;

		   	case "Dows Lake - Dows Lake":
		    	var latitude = 45.395190;
		    	var longitude = -75.702349;
		        break;

		    default:
		        var latitude = 45.38824;
		    	var longitude = -75.700564;
		}

		locations.push([title, latitude , longitude ,  condition]);

	});

$( "<ul/>", {
		"class": "my-new-list",
		html: items.join( "" )
	}).appendTo( "#results" );
});

    





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

setTimeout(
	function() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
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
			text: String(locations[i][3]),
			color: "#4682B4",
			fontSize: "10px",
			fontWeight: "bold"
		}
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0] + "(" + locations[i][3] + ")");
          infowindow.open(map, marker);
        }
      })(marker, i));
    }


  	}, 500
);



	


}




