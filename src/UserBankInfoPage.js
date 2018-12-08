import React, { Component } from 'react'; //import React Component
import firebase from 'firebase/app';
import FoodWordCloud from './components/foodInventory/FoodWordCloud';
import FoodInventoryList from './components/foodInventory/FoodInventoryList';
import {Route, Link, Switch, Redirect} from 'react-router-dom';
import WelcomeHeader from './components/WelcomeHeader';

class UserBankInfoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {bank: {}, loading: true}
    }

    componentDidMount() {
        let bankKey = window.location.href.split('/').pop();
        let bankRef = firebase.database().ref('banks/' + bankKey);
        bankRef.on('value', (snapshot) => {
            this.setState({bank: snapshot.val(), loading: false});
        });

        // this.foodsRef = firebase.database().ref(`banks/${this.bankKey}/foods`);
        // this.foodsRef.on("value", (snapshot)=> {
        //     let snapShotVal = snapshot.val()
        //     if(snapShotVal === null){
        //         this.setState({foods: []});
        //     }else{
                // let foods = Object.keys(snapShotVal).map((key) => {
                //     let foodObj = snapShotVal[key];
                //     foodObj.id = key;
                //     return foodObj;
                // });
                // this.sorted = false; 
                // this.setState({foods: foods});
        //     }
        // });
    }

    render() {
        if (!this.state.loading) {
            let b = this.state.bank;
            if (!b.foods) {
                alert("This foodbank has no foods they need");
                return (
                    <div>
                        <Redirect to='/app'/>
                    </div>
                )
            } else {
                let foods = Object.keys(b.foods).map((key) => {
                    let foodObj = b.foods[key];
                    foodObj.id = key;
                    return foodObj;
                });
                return (
                    <div>
                        <WelcomeHeader user={b} isUserView={true}>
                        </WelcomeHeader>

                        <FoodWordCloud
                                foods={foods}
                            />

                        <FoodInventoryList
                            foods={foods}
                            isUserView={true}
                        />
                    </div>
                )
            }
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