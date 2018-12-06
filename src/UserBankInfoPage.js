import React, { Component } from 'react'; //import React Component
import firebase from 'firebase/app';

class UserBankInfoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {bank: {}, loading: true}
    }

    componentDidMount() {
        let bankKey = window.location.href.split('/').pop();
        let bankRef = firebase.database().ref('banks/' + bankKey);
        bankRef.on('value', (snapshot) => {
            console.log(snapshot.val());
            this.setState({bank: snapshot.val(), loading: true});
        });
    }

    render() {
        let b = this.state.bank.bankInfo;
        if (b) {
            console.log(b.handle);
            return (
                <h1>
                    {b.handle}
                </h1>
            )
        } else {
            return (
                <div className="text-center">
                    <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
                </div>
            )
        }
    }
}

export default UserBankInfoPage;