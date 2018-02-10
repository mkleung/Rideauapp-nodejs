// The following code is based off a toggle menu by @Bradcomp
// source: https://gist.github.com/Bradcomp/a9ef2ef322a8e8017443b626208999c1
(function() {
    var burger = document.querySelector('.nav-toggle');
    var menu = document.querySelector('.nav-menu');
    burger.addEventListener('click', function() {
        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
    });
})();



function initMap() {
var rideau = {lat: 45.4045, lng: -75.6810};
var map = new google.maps.Map(document.getElementById('map'), {
zoom: 13,
center: rideau
});
var marker = new google.maps.Marker({
position: rideau,
map: map
});
}