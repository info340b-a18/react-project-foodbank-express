import React, { Component } from 'react'; //import React Component
import firebase from 'firebase/app';

class UserBankInfoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {bank: {}}
    }

    componentDidMount() {
        let bankKey = window.location.href.split('/').pop();
        let bankRef = firebase.database().ref('banksTest/' + bankKey);
        bankRef.on('value', (snapshot) => {
            this.setState({bank: snapshot.val()});
        });
        console.log(this.state.bank);
    }

    render() {
        return (
            <h1>
                {/* {this.state.bank.bankInfo.handle} */}
            </h1>
        )
    }
}

export default UserBankInfoPage;