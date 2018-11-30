import React, { Component } from 'react';
import convertWords from './utils/convertWords';
import {Map, GoogleApiWrapper, GoogleMap, Marker, InfoWindow} from 'google-maps-react';
import MapAppTest from './MapContainer';

class APITester extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //bankNames: props.banks, 
            bankDetails:[],


        };
    }

    componentDidMount() {
        let promises = [];
        this.props.banks.forEach(element => {
            let bankName = element.split(" ");
            let bankNameStr = bankName[0];
            for(let j=1; j<bankName.length; j++) {
                bankNameStr = bankNameStr + "%20" + bankName[j];
            }
            let url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input="+bankNameStr+"&inputtype=textquery&fields=formatted_address,name,opening_hours,geometry,place_id&key=AIzaSyA3-dO5SwXlolulr_KzS2rxXU2IUas_YjE";
            fetch(url, {mode: 'cors'})
                .then(response => response.json())
                .then((myJson) => {
                    if(myJson.candidates[0]) {

                        let curPlaceID = myJson.candidates[0].place_id;
                        fetch("https://maps.googleapis.com/maps/api/place/details/json?placeid=" + curPlaceID + "&fields=opening_hours,formatted_phone_number,address_components,geometry,name&key=AIzaSyA3-dO5SwXlolulr_KzS2rxXU2IUas_YjE", {mode:"cors"})
                        .then(placeResponse => {
                            return placeResponse.json();
                            //promises.push(placeResponse.json());
                        }).catch(err => {
                            console.log(err);
                        }).then((data) => {
                            let currentArr = this.state.bankDetails;
                            currentArr.push(data)
                            this.setState({bankDetails:currentArr});
                        })
                    }
                });
        });

        //this.setState({bankDetails:bankDetails});

        /*fetch("https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&fields=name,rating,formatted_phone_number&key=AIzaSyA3-dO5SwXlolulr_KzS2rxXU2IUas_YjE")
            .then(response => response.json())
            .then((data) => {
                //console.log(data);
                this.setState({curName:data})
            });*/
        //console.log(promises); 
        
    }

    render() {
        //console.log(this.state);
        //this.state.bankDetails ? console.log(this.state.bankDetails) : console.log('error')
        return(
            <div>
                <div>
                {this.state.bankDetails.length == 22 &&                      
                    <MapAppTest  bankLists = {this.state.bankDetails}
                    zipGeo={{lat:47.6062, lng:-122.3321}}
                    zoom={12} />
                }
            </div>
            </div>
        );
    }
}

// class BankButton extends Component {
//     render() {
//       return (
//         <li>
//           <Button onClick={() => this.props.changeWordBankCallback(this.props.bank)} className="card">
//             {this.props.bank}
//           </Button>
//         </li>
//       )
//     }
//   }
  
//   class BankList extends Component {
//     render() {
//       var bankList = this.props.banks.map(bank => {
//         return <BankButton changeWordBankCallback={this.props.changeWordBankCallback} bank={bank}/>;
//       })
//       return (
//         <div id="petList" className="col-9">
//           <h2>Available Banks</h2>
//           <UncontrolledDropdown>
//             <DropdownToggle caret>
//               Dropdown
//             </DropdownToggle>
//             <DropdownMenu>
//               {bankList}
//             </DropdownMenu>
//           </UncontrolledDropdown>
//         </div>
//       )
//     }
//   }

export default APITester

/*{this.state.curName ? <div>{this.state.curName.result.name}</div> : <div />}*/