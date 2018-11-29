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
            bankLists: props.bankLists,
            zipGeo: props.zipGeo,
            zoom: props.zoom
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
        //console.log(this.state.bankLists);
        //console.log(Object.keys(this.state.bankLists)[0]);
        /*let markerL =         <MarkerPoint markerPosition={this.state.bankLists[Object.keys(this.state.bankLists)[0]].location}
        markerName={Object.keys(this.state.bankLists)[0]} />;*/
        
    
    var markers = [];
    var key = 0;
    for (let i=0; i<Object.keys(this.state.bankLists).length; i++) {
        let curMarker = <Marker key = {key}
        position={this.state.bankLists[Object.keys(this.state.bankLists)[i]].location}
        onClick={this.onMarkerClick}
        name={Object.keys(this.state.bankLists)[i]}
      />;
        let curInfoWin = <InfoWindow key={key+1}
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}
        onClose={this.onClose}
      >
        <div>
          <h4>{this.state.selectedPlace.name}</h4>
        </div>
      </InfoWindow>;
        markers.push(curMarker);
        markers.push(curInfoWin);
        key+=2;
    }
    return (
        <div style={mapStyles} className="map-div">
        <Map
        google={this.props.google}
        zoom={this.state.zoom}
        initialCenter={{
         lat: this.state.zipGeo.lat,
         lng: this.state.zipGeo.lng
        }}
        >
        {markers}
        </Map>
        </div>
    );
  }
}

export default GoogleApiWrapper({
    apiKey:("AIzaSyA3-dO5SwXlolulr_KzS2rxXU2IUas_YjE")
})(MapAppTest)

/*
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>

            var x = <Marker
        position={this.state.bankLists[Object.keys(this.state.bankLists)[0]].location}
        onClick={this.onMarkerClick}
        name={Object.keys(this.state.bankLists)[0]}
      />;
          var y = <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>;
        var z=<Marker
        position={this.state.bankLists[Object.keys(this.state.bankLists)[1]].location}
        onClick={this.onMarkerClick}
        name={Object.keys(this.state.bankLists)[1]}
      />;
      var e = <InfoWindow
      marker={this.state.activeMarker}
      visible={this.state.showingInfoWindow}
      onClose={this.onClose}
    >
      <div>
        <h4>{this.state.selectedPlace.name}</h4>
      </div>
    </InfoWindow>;
        */