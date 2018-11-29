import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const mapStyles = {
  width: '80%',
  height: '80%'
};

export class MapContainer extends Component {
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
        var markers = [];
        var key = 0;
        //console.log(this.state.bankLists[0].result['address_components']);
        
        for (let i=0; i<Object.keys(this.state.bankLists).length; i++) {
            let curHours = "";
            if(this.state.bankLists[i].result['opening_hours']) {
                curHours = 'Opening Hours: <br/>';
                this.state.bankLists[i].result['opening_hours']['weekday_text'].forEach(element => {
                    curHours = curHours + element + '<br/>';
                });
        
            }
            let curAddress = 'Address: ';
            curAddress = curAddress + this.state.bankLists[i].result['address_components'][0]['long_name'] + " " +
              this.state.bankLists[i].result['address_components'][1]['long_name'] + ", Seattle, WA "+this.state.bankLists[i].result['address_components'][7]['long_name']

            let curMarker = <Marker key = {key}
            position={this.state.bankLists[Object.keys(this.state.bankLists)[i]].result.geometry.location}
            onClick={this.onMarkerClick}
            name={this.state.bankLists[i].result.name}
            hours={curHours}
            address={curAddress}
        />;
            let curInfoWin = <InfoWindow key={key+1}
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
        >
            <div>
            <h3>{this.state.selectedPlace.name} <br />
            {this.state.selectedPlace.hours} <br />
            {this.state.selectedPlace.address}
            </h3>
            </div>
        </InfoWindow>;
            markers.push(curMarker);
            markers.push(curInfoWin);
            key+=2;
        }
        //console.log(this.state);
        return (
                <div>
                <Map
                google={this.props.google}
                zoom={this.state.zoom}
                style={mapStyles}
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
})(MapContainer)

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
                <h3>{this.state.bankLists[this.state.selectedPlace.index].result.opening_hours.weekday_text}</h3>

        */