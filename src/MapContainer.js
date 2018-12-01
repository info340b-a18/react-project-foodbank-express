import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { UncontrolledDropdown, Form, DropdownToggle, Label, Input, DropdownMenu, Button} from 'reactstrap';
import getBankNames from './utils/getBankNames';
import WordCloud from 'react-d3-cloud/lib/WordCloud';
import data from './make-data/bank_words.json';
import convertWords from './utils/convertWords';

const mapStyles = {
  width: '100%',
  height: '100%',
  position: 'relative'
};

const fontSizeMapper = word => Math.log2(word.value) * 10;
const rotate = word => word.value % -10;

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.handleZipChange = this.handleZipChange.bind(this);
        this.resetMapZipcode = this.resetMapZipcode.bind(this);
        this.state = {
            showingInfoWindow: false,  //Hides or the shows the infoWindow
            activeMarker: {},          //Shows the active marker upon click
            selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
            bankLists: props.bankLists,
            bank_words: [],
            zipcode: "",
            isMounted: false,
            banks: props.banks,
            activeBanks: props.bankLists,
            zipGeo: props.zipGeo,
            zoom: props.zoom
        };
    }

    componentDidMount() {
      this.setState({isMounted: true});
    }

    handleZipChange(e) {
      this.setState({zipcode: e.target.value});
    }
    
    onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
    });

    resetMapDropdown(bank, bankLists) {
      var bank_words = data[bank];
      bankLists.forEach(b => {
        if (b.result.name === bank) {
          this.setState({activeBanks: [b], bank_words: convertWords(bank_words), zipGeo: b.result.geometry.location, zoom: 14});
        }
      });
    }

    resetMapZipcode(e, bankList) {
      e.preventDefault();
      let matchedBanks = [];
      let updatedGeo;
      bankList.forEach(b => {
        if (b.result.address_components[7].long_name === this.state.zipcode) {
          matchedBanks.push(b);
          updatedGeo = b.result.geometry.location;
        }
      });
      this.setState({activeBanks: matchedBanks, zipGeo: updatedGeo, zoom: 14});
  }
  
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
        for (let i=0; i<Object.keys(this.state.activeBanks).length; i++) {
            let opening, curMon, curTue, curWed, curThu, curFri, curSat, curSun = "";
            if(this.state.activeBanks[i].result['opening_hours']) {
                curMon = this.state.activeBanks[i].result['opening_hours']['weekday_text'][0];
                curTue = this.state.activeBanks[i].result['opening_hours']['weekday_text'][1];
                curWed = this.state.activeBanks[i].result['opening_hours']['weekday_text'][2];
                curThu = this.state.activeBanks[i].result['opening_hours']['weekday_text'][3];
                curFri = this.state.activeBanks[i].result['opening_hours']['weekday_text'][4];
                curSat = this.state.activeBanks[i].result['opening_hours']['weekday_text'][5];
                curSun = this.state.activeBanks[i].result['opening_hours']['weekday_text'][6];
                opening = "Hours: "
            }
            let curAddress="";
            curAddress = curAddress + this.state.activeBanks[i].result['address_components'][0]['long_name'] + " " +
              this.state.activeBanks[i].result['address_components'][1]['long_name'] + ", Seattle, WA "+this.state.activeBanks[i].result['address_components'][7]['long_name']

            let curMarker = <Marker key = {key}
            position={this.state.activeBanks[Object.keys(this.state.activeBanks)[i]].result.geometry.location}
            onClick={this.onMarkerClick}
            name={this.state.activeBanks[i].result.name}
            opening={opening}
            monHour={curMon}
            tueHour={curTue}
            wedHour={curWed}
            thuHour={curThu}
            friHour={curFri}
            satHour={curSat}
            sunHour={curSun}
            address={curAddress}
        />;
            let curInfoWin = <InfoWindow key={key+1}
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
        >
            <div className='infowindow'>
            <h1>{this.state.selectedPlace.name} </h1>
            <p><span className='infoTitle'>Address:</span><br />
            {this.state.selectedPlace.address}<br />
            <span className='infoTitle'>{this.state.selectedPlace.opening}</span><br />
            {this.state.selectedPlace.monHour}<br />
            {this.state.selectedPlace.tueHour}<br />
            {this.state.selectedPlace.wedHour}<br />
            {this.state.selectedPlace.thuHour}<br />
            {this.state.selectedPlace.friHour}<br />
            {this.state.selectedPlace.satHour}<br />
            {this.state.selectedPlace.sunHour}
            </p>
           
            </div>
        </InfoWindow>;
            markers.push(curMarker);
            markers.push(curInfoWin);
            key+=2;
        }
        return (
                <div className="mapApp">
                <div className="form-dropdown">
                  <div className="mapForm">
                    <Form onSubmit={(e) => this.resetMapZipcode(e, this.state.bankLists)}>
                      <Label for="zipcodeInput">Zipcode</Label>
                      <Input type="text" name="zipcode" value={this.state.zipcode} onChange={this.handleZipChange} id="zipcodeInput" placeholder="eg. 98105" />
                      <Button type="submit" color="primary">Submit</Button>
                    </Form>
                  </div>
                  <div className="drop-list">
                  <div className="bankDropList">
                    <BankList resetMapDropdownCallback={(bank) => this.resetMapDropdown(bank, this.state.bankLists)} banks={getBankNames(this.state.bankLists)} />
                  </div>
                  <div className="cloud">
                    <WordCloud  width={400} height = {300} data={this.state.bank_words} fontSizeMapper={fontSizeMapper} rotate={rotate}/>
                  </div>
                  </div>
                  </div>
                  <div className="map">
                    <Map
                      google={this.props.google}
                      zoom={this.state.zoom}
                      containerStyle={{
                        width: '100%',
                        height: '100%',
                        position: 'relative'
                      }}
                      center={{
                        lat: this.state.zipGeo.lat,
                        lng: this.state.zipGeo.lng
                      }} >
                        {markers}
                    </Map>
                  </div>
                </div>
        );
  }
}

class BankButton extends Component {
  render() {
    return (
      <li>
        <Button onClick={() => this.props.resetMapDropdownCallback(this.props.bank)} className="card">
          {this.props.bank}
        </Button>
      </li>
    )
  }
}

class BankList extends Component {
  render() {
    var bankList = this.props.banks.map(bank => {
      return <BankButton resetMapDropdownCallback={this.props.resetMapDropdownCallback} bank={bank}/>;
    })
    return (
      <div id="foodbankList" className="col-9">
        <h2>Select Bank to See its Most Wanted Food</h2>
        <UncontrolledDropdown>
          <DropdownToggle caret>
            Select
          </DropdownToggle>
          <DropdownMenu className="dropdownlists">
            {bankList}
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
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