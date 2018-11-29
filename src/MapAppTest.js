import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapAppTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,  //Hides or the shows the infoWindow
            activeMarker: {},          //Shows the active marker upon click
            selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
            bankLists: props.bankLists
        };
    }
    
    onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
  
    onClose = props => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        });
      }
    };
      render() {
          //console.log(Object.keys(this.state.bankLists)[0]);
    return (
      <Map
        google={this.props.google}
        zoom={12}
        style={mapStyles}
        initialCenter={{
         lat: 47.6062,
         lng: -122.3321
        }}
      >
      <Marker
          position={this.state.bankLists[Object.keys(this.state.bankLists)[0]].location}
          onClick={this.onMarkerClick}
          name={Object.keys(this.state.bankLists)[0]}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
        <Marker
          position={this.state.bankLists[Object.keys(this.state.bankLists)[1]].location}
          onClick={this.onMarkerClick}
          name={Object.keys(this.state.bankLists)[1]}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
    apiKey:("AIzaSyA3-dO5SwXlolulr_KzS2rxXU2IUas_YjE")
})(MapAppTest)