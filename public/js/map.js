/*
|==========================================================================
| MARKER COMPONENT
|==========================================================================
*/
const RideauMarkerComponent = ({ text }) => (
  <div style={{
    position: 'relative', color: 'white', background: 'red',
    height: 40, width: 60, top: -20, left: -30,    
  }}>
    {text}
  </div>
);


/**
|==========================================================================
| MAP COMPONENT
|==========================================================================
*/
class RideauMap extends React.Component {
  static defaultProps = {
    center: {lat: 45.405250, lng: -75.680992},
    zoom: 13
  };

  render() {
    return (
       <GoogleMapReact
        bootstrapURLKeys={{ key: ['AIzaSyCMw9uuxYu7J4jTVdfpWrvxdoh3x7xZJtQ'] }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
      >
      </GoogleMapReact>
    );
  }

  renderMarkers(map, maps) {
      // let marker = new maps.Marker({
      //   position: new google.maps.LatLng(45.405250, -75.680992),
      //   map,
      //   label: {
      //     text: "Poor",
      //     color: "#000",
      //     fontSize: "8px",
      //     fontWeight: "bold"
      //   },
      // });



      var locations = [];

      $.getJSON( "../rideau.json", function( data ) {
          var items = [];
          
          $.each( data, function( key, val ) {
              var title = val.title;
              var condition = val.condition;
              var length = val.length;

              // set colors
              switch(condition) {
                case "Excellent":
                  var color = "hsl(217, 71%, 53%)";
                  break;
                case "Good":
                    var color = "hsl(141, 71%, 48%)";
                    break;
                case "Fair":
                    var color = "hsl(171, 100%, 41%)";
                    break;
                case "Poor":
                  var color = "hsl(48, 100%, 67%)";
                  break;
                case "Closed":
                  var color = "hsl(348, 100%, 61%)";
                  break;
                default:
                    var color = "hsl(348, 100%, 61%)";
              }

              // init latitudes and longitudes

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

              locations.push([title, latitude , longitude ,  condition, color, length]);
          });

          console.log(locations);

          // Draw Markers

          var infowindow = new maps.InfoWindow();
          var marker, i;

          for (i = 0; i < locations.length; i++) { 
            marker = new google.maps.Marker({
              position: new google.maps.LatLng(locations[i][1], locations[i][2]),
              map: map,
              label: {
            text: String(locations[i][3]),
            color: "#000",
            fontSize: "12px",
            fontWeight: "bold"
          },
          icon: {
              path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
              strokeColor: locations[i][4],
              scale: 4
          },
          });

          google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
              infowindow.setContent(locations[i][0] + "(" + locations[i][3] + ")" +  "<p>" + locations[i][5] + "</p>");
              infowindow.open(map, marker);
            }
          })(marker, i));

        } // for

      });

    } // RenderMarkers()
}


/**
|==========================================================================
| RENDER
|==========================================================================
*/

ReactDOM.render(
  <div style={{width: '100%', height: '400px'}}>
    <RideauMap />
  </div>,
  document.getElementById('rideaumap')
);