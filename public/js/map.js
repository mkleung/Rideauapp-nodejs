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
| MAP
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
      let marker = new maps.Marker({
        position: new google.maps.LatLng(45.405250, -75.680992),
        map,
        title: 'Hello World!'
      });
    }

}


ReactDOM.render(
  <div style={{width: '100%', height: '400px'}}>
    <RideauMap />
  </div>,
  document.getElementById('rideaumap')
);