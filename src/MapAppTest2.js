import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

class MapAppTest2 extends Component {
    render() {
        return (
            <div style={style}>
            <Map google={this.props.google}
            />
            </div>
        )
    }
}
class Map extends React.Component {
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
          this.loadMap();
        }
      }
    
      loadMap() {
        // ...
      }
    render() {
      return (
        <div ref='map'>
          Loading map...
        </div>
      )
    }
  }

export default GoogleApiWrapper({
    apiKey:("AIzaSyA3-dO5SwXlolulr_KzS2rxXU2IUas_YjE")
})(MapAppTest2)