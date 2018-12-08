export default function getBankInfo(bankNames) {
    let bankInfo = [];
    //For all banks passed in prop
    bankNames.forEach(element => {
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
                        // let currentArr = this.state.bankDetails;
                        // currentArr.push(data);
                        // if (this._isMounted) {
                        //     this.setState({bankDetails:currentArr});
                        // }
                        let currentArr = bankInfo;
                        currentArr.push(data);
                        console.log(currentArr);
                        bankInfo = currentArr;
                    })
                }
            })
    });
    console.log(bankInfo);
    return bankInfo;
}