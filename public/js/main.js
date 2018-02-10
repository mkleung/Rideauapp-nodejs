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
	var rideau = {lat: 45.4045, lng: -75.6810};
	var map = new google.maps.Map(document.getElementById('map'), {
	zoom: 13,
	center: rideau
});
var marker = new google.maps.Marker({
	position: rideau,
	map: map,
	label: {
	text: "Fair",
	color: "#4682B4",
	fontSize: "10px",
	fontWeight: "bold"
},
	title: "Hello World!",
	visible: true
	});
}



/**
|==========================================================================
| Add results
|==========================================================================
*/

$.getJSON( "../rideau.json", function( data ) {
	var items = [];
	$.each( data, function( key, val ) {
		var title = val.title;
		var condition = val.condition;
		var length = val.length;
		items.push( "<li>" + title + " - <strong>" + condition + "</strong></li>" );
	});

$( "<ul/>", {
		"class": "my-new-list",
		html: items.join( "" )
	}).appendTo( "#results" );
});