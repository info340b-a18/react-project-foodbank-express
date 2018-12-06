import React, { Component } from 'react';
import MapContainer from './MapContainer';
import firebase from 'firebase/app';
import getBankInfo from './utils/getBankInfo';
import { get } from 'https';

//Generates the Map Application of FoodBank Express
//Collects information from GoogleMaps API for all banks 
//passed to it
class MapApp extends Component {
    _isMounted = false;
    bankDetails = [];
    constructor(props) {
        super(props);
        this.state = {
            //bankNames: props.banks, 
            //bankDetails: [],
            loading: true,
            bankNames: []
        };
    }

    //Changes what the current bank is being focused on
    changeMapBank(bank) {
        this.setState({banks: bank})
    }

    //Retrieve the banks from the database
    componentDidMount() {
        //let bankNames = [];
        this._isMounted = true;
        this.banksRef = firebase.database().ref('banks');
        this.banksRef.on('value', (snapshot) => {
            this.setState({bankNames: snapshot.val(), loading: false});
        })
    }
    
    //Unmount the map application
    componentWillUnmount() {
        this.banksRef.off();
        this._isMounted = false;
    }

    resolveAfter2Seconds(p) {
        return new Promise(resolve => {
            setTimeout(() => {
              resolve(p);
            }, 2000);
        });
    }

    async resolveBankDetails() {
        var x = await this.resolveAfter2Seconds(this.bankDetails);
        this.bankDetails = x;
        console.log(this.bankDetails);
    }

    render() {

        if (!this.state.loading) {
            this.bankDetails = [];
            let banksKeys = Object.keys(this.state.bankNames);
            let bankNames = banksKeys.map((key) => {
                let bank = this.state.bankNames[key];
                bank.key = key;

                return bank.bankInfo.handle;
            });

            for (var i=0; i < bankNames.length; i++) {
                let key = banksKeys[i];
                let element = bankNames[i];
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
                                let currentArr = this.bankDetails;
                                data.key = key;
                                currentArr.push(data);
                                if (this._isMounted) {
                                    this.bankDetails = currentArr;
                                }
                            })
                        }
                    })
            }
            //this.resolveBankDetails();
            // if (this.bankDetails.length > 0) {
            //     return(
            //         <div>
            //             <MapContainer  bankLists = {this.bankDetails}
            //                 banks = {this.props.banks}
            //                 activeBanks = {this.bankDetails}
            //                 zipGeo={{lat:47.6062, lng:-122.3321}}
            //                 zoom={12} />
            //             {/* <MapContainer  bankLists = {this.state.bankDetails}
            //                 banks = {this.props.banks}
            //                 activeBanks = {this.state.bankDetails}
            //                 zipGeo={{lat:47.6062, lng:-122.3321}}
            //                 zoom={12} /> */}
            //         </div>
            //     );
            // } else {
            //     return (
            //         <div className="text-center">
            //             <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
            //         </div>
            //     )
            // }
            return(
                <div>
                    <MapContainer  bankLists = {this.bankDetails}
                        banks = {this.props.banks}
                        activeBanks = {this.bankDetails}
                        zipGeo={{lat:47.6062, lng:-122.3321}}
                        zoom={12} />
                    {/* <MapContainer  bankLists = {this.state.bankDetails}
                        banks = {this.props.banks}
                        activeBanks = {this.state.bankDetails}
                        zipGeo={{lat:47.6062, lng:-122.3321}}
                        zoom={12} /> */}
                </div>
            );
        } else {
            return (
                <div className="text-center">
                    <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
                </div>
            )
        }
    }
}

export default MapApp
