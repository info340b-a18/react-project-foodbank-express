import React, { Component } from 'react';
import convertWords from './utils/convertWords';
import GoogleMapReact from 'google-map-react';
const AnyReactComponent = ({ text }) => <div>{ text }</div>;


class MapApp extends Component {
    constructor(props) {
        super(props);
        this.state = {bankNames: props.banks, bankDetails:null};   

    }

    getBankDetail(index) {
        let bankName = this.state.bankNames[index].split(" ");
        let bankNameStr = bankName[0];
        for(let j=1; j<bankName.length; j++) {
            bankNameStr = bankNameStr + "%20" + bankName[j];
        }
        let url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input="+bankNameStr+"&inputtype=textquery&fields=formatted_address,name,opening_hours,geometry,place_id&key=AIzaSyA3-dO5SwXlolulr_KzS2rxXU2IUas_YjE"
        return fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                try {
                let placeID = myJson.candidates[0].place_id;  
                return fetch("https://maps.googleapis.com/maps/api/place/details/json?placeid=" + placeID + "&fields=opening_hours,formatted_phone_number,address_components&key=AIzaSyA3-dO5SwXlolulr_KzS2rxXU2IUas_YjE")
                    .then(function(placeResponse) {
                        return placeResponse.json();
                    })
                } catch(exception) {
                    return "";
                }   
                    /*.then(function(placeJson) {
                        try {
                            hours = placeJson.result.opening_hours.weekday_text;
                        } catch(exception) {
                            hours = "";
                        }
                        phone = placeJson.result.formatted_phone_number;
                    })
                    .then(function() {
                        this.setState({bank:myJson.candidates[0].name, address:myJson.candidates[0].formatted_address, geoLocation:myJson.candidates[0].geometry, opening:hours, phoneNumber:phone});
                    })*/
            })
        
}
    componentDidMount() {
        let curBanks = {};
        var promises = [];
        for(let i=0; i<this.state.bankNames.length; i++) {
            promises.push(this.getBankDetail(i));           
        }
        let index = 0;
        Promise.all(promises).then((values) => {
            values.forEach((element) => {
                if(element != "") {
                    curBanks[this.state.bankNames[index]] = element;
                }
                index++;
            });
        });
        console.log(curBanks);
        this.setState({bankDetails:curBanks});
    }

    render() {
        console.log(this.state.bankDetails);
        return (
            <div> I am the MapApp.</div>
        )
    }
}



export default MapApp