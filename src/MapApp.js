import React, { Component } from 'react';
import MapContainer from './MapContainer';
import Footer from './App';

//Generates the Map Application of FoodBank Express
//Collects information from GoogleMaps API for all banks 
//passed to it
class MapApp extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            //bankNames: props.banks, 
            bankDetails:[],
        };
    }

    //Changes what the current bank is being focused on
    changeMapBank(bank) {
        this.setState({banks: bank})
    }

    //Collects the necessary information from the Google Maps API
    componentWillMount() {
        this._isMounted = true;
        
        //For all banks passed in prop
        this.props.banks.forEach(element => {
            let bankName = element.split(" ");
            let bankNameStr = bankName[0];
            for(let j=1; j<bankName.length; j++) {
                bankNameStr = bankNameStr + "%20" + bankName[j];
            }
            //Get the url information from google maps api
            let url = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input="+bankNameStr+"&inputtype=textquery&fields=formatted_address,name,opening_hours,geometry,place_id&key=AIzaSyA3-dO5SwXlolulr_KzS2rxXU2IUas_YjE";
            fetch(url)
                .then(response => response.json())
                .then((myJson) => {
                    //Parse the json recieved from the url
                    if(myJson.candidates[0]) {
                        let curPlaceID = myJson.candidates[0].place_id;
                        fetch("https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=" + curPlaceID + "&fields=opening_hours,formatted_phone_number,address_components,geometry,name&key=AIzaSyA3-dO5SwXlolulr_KzS2rxXU2IUas_YjE")
                        .then(placeResponse => {
                            return placeResponse.json();
                        }).catch(err => {
                            console.log(err);
                        }).then((data) => {
                            let currentArr = this.state.bankDetails;
                            currentArr.push(data);
                            if (this._isMounted) {
                                this.setState({bankDetails:currentArr});
                            }
                        })
                    }
                })
        });
    }

    //Unmount the map application
    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return(
            <div>
                <MapContainer  bankLists = {this.state.bankDetails}
                    banks = {this.props.banks}
                    activeBanks = {this.state.bankDetails}
                    zipGeo={{lat:47.6062, lng:-122.3321}}
                    zoom={12} />
            </div>
        );
    }
}

export default MapApp
