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
          console.log(data);
      });

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
    }


    }
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