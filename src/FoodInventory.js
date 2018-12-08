import React, { Component } from 'react';
import FoodWordCloud from './components/foodInventory/FoodWordCloud';
import FoodInventoryBox from './components/foodInventory/FoodInventoryBox';
import FoodInventoryList from './components/foodInventory/FoodInventoryList';
import Food from './components/foodInventory/Food';
import 'firebase/database';
import {Route, Link, Switch, Redirect} from 'react-router-dom';
import firebase from 'firebase/app';


class FoodInventory extends Component{
    constructor(props){
        super(props);
        this.state = {
            foods:[],
            ascending: true,
            sortStyle: "none",
        };
        this.sorted = false;
        this.filtered = false;
        this.bankKey = "";
    }

    componentDidMount(){
        this.foodsRef = firebase.database().ref(`banks/`);
        this.foodsRef.on("value", (snapshot)=>{
            let snapShotVal = snapshot.val()
            let keys = Object.keys(snapShotVal);
            for(let i = 0; i < keys.length; i++){
                if(snapShotVal[keys[i]].bankInfo.handle === this.props.currentUser.displayName){
                    this.bankKey = (keys[i]);
                    break;
                }
            }
            if(this.bankKey === ""){
                throw new Error("no bank key?");
            } else {
                this.foodsRef = firebase.database().ref(`banks/${this.bankKey}/foods`);
                this.foodsRef.on("value", (snapshot)=>{
                    let snapShotVal = snapshot.val()
                    if(snapShotVal === null){
                        this.setState({foods: []});
                    }else{
                        let foods = Object.keys(snapShotVal).map((key) => {
                            let foodObj = snapShotVal[key];
                            foodObj.id = key;
                            return foodObj;
                        });
                        this.sorted = false; 
                        this.setState({foods: foods});
                    }
                });
            }
            
                
        });
    }

    componentWillUnmount(){
        this.foodsRef.off();
    }

    deleteFoodItem = (foodid) => {
        let food = firebase.database().ref(`banks/${this.bankKey}/foods/${foodid}`);
        food.set(null);
    }

    updateQuantity = (name, foodid, n) => {
        let quantity = firebase.database().ref(`banks/${this.bankKey}/foods/${foodid}`);
        quantity.set(new Food(name, n));
    }
    
    updateSort = (style) => {
        let array = [...this.state.foods];
        if(style === this.state.sortStyle && this.sorted){
            //this.setState({best: !this.state.best});
            array.reverse();
            this.setState({
                foods: array,
                ascending: !this.state.ascending
            });
        }else{
            switch(style){
                case "none":
                    console.log("none sort");
                    break;
                case "quantity":
                    array.sort((a,b)=> (a.num - b.num))
                    break;
                case "name":
                    array.sort(function(a, b){
                        if(a.text < b.text) { return -1; }
                        if(a.text > b.text) { return 1; }
                    return 0;
                    })
                    break;
                default:
                    alert("unknown sort");
                    console.log(style);
            }
        }
        this.sorted = true;
        this.setState({
            foods: array,
            sortStyle: style, 
            ascending: true
        });

    }

    render(){
        if(!this.sorted){
            this.updateSort(this.state.sortStyle);
        }
        return(

            <div>
                <FoodWordCloud
                    foods={this.state.foods}
                    />
                <FoodInventoryBox bankKey={this.bankKey}/>
                <FoodInventoryList foods={this.state.foods}
                    sortStyle={this.state.sortStyle}
                    ascending={this.state.ascending} 
                    updateQuantity={this.updateQuantity}
                    updateSort={this.updateSort}
                    delete={this.deleteFoodItem}
                    currentUser={this.props.currentUser}
                    isUserView={false}
                    />
            </div>
        );
        
    }
}

export default FoodInventory;