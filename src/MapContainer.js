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

// MapContainer actually renders and creates the Map 
// Also handles much of the user interaction with the Map
export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.handleZipChange = this.handleZipChange.bind(this);
        this.resetMapZipcode = this.resetMapZipcode.bind(this);
        this.state = {
            showingInfoWindow: false,   //Hides or the shows the infoWindow
            activeMarker: {},           //Shows the active marker upon click
            selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
            bankLists: props.bankLists, //Json file containing information about the foodBanks
            bank_words: [],             //Current words to create word cloud from
            zipcode: "98105",           //Default zipcode to search for in the map
            isMounted: false,           //Check if Mounted
            banks: props.banks,         //List of all banks rendered
            activeBanks: props.bankLists, //A copy of banklists that displays all the banks rendered with their relevant json information
            zipGeo: props.zipGeo,       //Coordinates for the current zipcode
            zoom: props.zoom            //Zoom for the map
        };
    }

    componentDidMount() {
      this.setState({isMounted: true});
    }

    //Changes the zip code whenver the user types in a new value
    handleZipChange(e) {
      this.setState({zipcode: e.target.value});
    }
    
    //Displays the information window when you click the marker
    onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
    });

    //When a button in dropdown is clicked, reset the map and filter 
    //activeBanks to list only that bank which is clicked
    resetMapDropdown(e, bank, bankLists) {
      e.preventDefault();
      var bank_words = data[bank];
      bankLists.forEach(b => {
        if (b.result.name === bank) {
          this.setState({activeBanks: [b], bank_words: convertWords(bank_words), zipGeo: b.result.geometry.location, zoom: 14});
        }
      });
    }

    //Reset the map and filter the activeBanks to list
    //only those banks with the current zipcode in state
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
    
    //Remove the information window when the close button is
    //clicked
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
        //For all banks in activeBanks retrieve their necessary information 
        //and render them on the map and store the information from activeBanks
        //in the information window
        for (let i=0; i<Object.keys(this.state.activeBanks).length; i++) {
            let opening, curMon, curTue, curWed, curThu, curFri, curSat, curSun = "";
            //Get the opening hours of the bank if it has any
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

            //Get the address of the bank if it has any
            let curAddress="";
            curAddress = curAddress + this.state.activeBanks[i].result['address_components'][0]['long_name'] + " " +
              this.state.activeBanks[i].result['address_components'][1]['long_name'] + ", Seattle, WA "+this.state.activeBanks[i].result['address_components'][7]['long_name']

            //Create the marker on the map and store the collected information
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
            //Create the information window
            let curInfoWin = <InfoWindow key={key+1}
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
        >
            {/* Put relevant information into the information window */}
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

            //Store the current markers and their information window
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
                        <BankList resetMapDropdownCallback={(e, bank) => this.resetMapDropdown(e, bank, this.state.bankLists)} banks={getBankNames(this.state.bankLists)} />
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

//An individual button in the dropdown list
//Calls the resetMapDropdown when clicked
class BankButton extends Component {
  render() {
    return (
      <li>
        <Button onClick={(e) => this.props.resetMapDropdownCallback(e, this.props.bank)} className="card">
          {this.props.bank}
        </Button>
      </li>
    )
  }
}

//Dropdown list of all banks in dataset
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