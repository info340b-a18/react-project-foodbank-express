import React, { Component } from 'react';
import convertWords from './utils/convertWords';
import GoogleMapReact from 'google-map-react';
const AnyReactComponent = ({ text }) => <div>{ text }</div>;


class MapApp extends Component {
    constructor(props) {
        super(props);
        this.state = {bankNames: props.banks};
        
    }

    getBankDetail() {
        let bankName = this.state.bank.split(" ");
        let bankNameStr = bankName[0];
        for(let i=1; i<bankName.length; i++) {
            bankNameStr = bankNameStr + "%20" + bankName[i];
        }
        let url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input="+bankNameStr+"&inputtype=textquery&fields=formatted_address,name,opening_hours,geometry,place_id&key=AIzaSyA3-dO5SwXlolulr_KzS2rxXU2IUas_YjE"
        return fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                let placeID = myJson.candidates[0].place_id;
                let hours="";
                let phone="";
                return fetch("https://maps.googleapis.com/maps/api/place/details/json?placeid=" + placeID + "&fields=opening_hours,formatted_phone_number,address_components&key=AIzaSyA3-dO5SwXlolulr_KzS2rxXU2IUas_YjE")
                    .then(function(placeResponse) {
                        return placeResponse.json();
                    })
                    .then(function(placeJson) {
                        try {
                            hours = placeJson.result.opening_hours.weekday_text;
                          } catch(exception) {
                            hours = "";
                          }
                          phone = placeJson.result.formatted_phone_number;
                    })
                    .then(function() {
                        this.setState({bank:myJson.candidates[0].name, address:myJson.candidates[0].formatted_address, geoLocation:myJson.candidates[0].geometry, opening:hours, phoneNumber:phone});
                    })
            })
    }
    componentDidMount() {
        this.getBankDetail();
    }
    render() {
        return (
            <GoogleMap
                {{key:AIzaSyA3-dO5SwXlolulr_KzS2rxXU2IUas_YjE}
            
            </GoogleMap></GoogleMap>
        )
    }
}



export default MapApp