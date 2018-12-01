import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { UncontrolledDropdown, Form, DropdownToggle, Label, Input, DropdownMenu, Button} from 'reactstrap';
import getBankNames from './utils/getBankNames';
import WordCloud from 'react-d3-cloud/lib/WordCloud';
import data from './make-data/bank_words.json';
import convertWords from './utils/convertWords';


const mapStyles = {
  width: '80%',
  height: '80%'
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
            activeBanks: props.bankLists,
            zipGeo: props.zipGeo,
            zoom: props.zoom,
        };
    }

    handleZipChange(e) {
      console.log(e.target.value);
      this.setState({zipcode: e.target.value});
    }

    resetMapDropdown(bank, bankLists) {
      console.log(bank);
      var bank_words = data[bank];
      console.log(bank_words);
      bankLists.forEach(b => {
        if (b.result.name === bank) {
          this.setState({activeBanks: [b], bank_words: convertWords(bank_words)});
          // this.setState({activeBanks: [b]});
        }
      });
    }

    resetMapZipcode(e, bankList) {
      e.preventDefault();
      let matchedBanks = []
      bankList.forEach(b => {
        if (b.result.address_components[7].long_name === this.state.zipcode) {
          matchedBanks.push(b);
        }
      });
      this.setState({activeBanks: matchedBanks});
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
        for (let i=0; i<Object.keys(this.state.activeBanks).length; i++) {
            let curHours = "";
            if(this.state.activeBanks[i].result['opening_hours']) {
                curHours = 'Opening Hours: <br/>';
                this.state.activeBanks[i].result['opening_hours']['weekday_text'].forEach(element => {
                    curHours = curHours + element + '<br/>';
                });
            }
            let curAddress = 'Address: ';
            curAddress = curAddress + this.state.activeBanks[i].result['address_components'][0]['long_name'] + " " +
              this.state.activeBanks[i].result['address_components'][1]['long_name'] + ", Seattle, WA "+this.state.activeBanks[i].result['address_components'][7]['long_name']

            let curMarker = <Marker key = {key}
            position={this.state.activeBanks[Object.keys(this.state.activeBanks)[i]].result.geometry.location}
            onClick={this.onMarkerClick}
            name={this.state.activeBanks[i].result.name}
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
        return (
                <div>
                  <div>
                    <Form onSubmit={(e) => this.resetMapZipcode(e, this.state.bankLists)}>
                        <Label for="zipcodeInput">Zipcode</Label>
                        <Input name="zipcode" value={this.state.zipcode} onChange={this.handleZipChange} id="zipcodeInput" placeholder="eg. 98105" /> 
                        <Button type="submit" color="primary">Submit</Button>
                    </Form>
                    <BankList resetMapDropdownCallback={(bank) => this.resetMapDropdown(bank, this.state.bankLists)} banks={getBankNames(this.state.bankLists)} />
                  </div>
                  <div className="cloud">
                    <WordCloud data={this.state.bank_words} fontSizeMapper={fontSizeMapper} rotate={rotate}/>
                  </div>
                  <div>
                    <Map
                        google={this.props.google}
                        zoom={this.state.zoom}
                        initialCenter={{
                          lat: this.state.zipGeo.lat,
                          lng: this.state.zipGeo.lng
                        }}
                      >{markers}
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
        <Button key={this.props.id} onClick={() => this.props.resetMapDropdownCallback(this.props.bank)} className="card">
          {this.props.bank}
        </Button>
      </li>
    )
  }
}

class BankList extends Component {
  render() {
    var id = 0;
    var bankList = this.props.banks.map(bank => {
      id = id + 1;
      return <BankButton resetMapDropdownCallback={this.props.resetMapDropdownCallback} bank={bank} key={id.toString()}/>;
    })
    return (
      <div id="petList" className="col-9">
        <h2>Available Banks</h2>
        <UncontrolledDropdown>
          <DropdownToggle caret>
            Dropdown
          </DropdownToggle>
          <DropdownMenu>
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