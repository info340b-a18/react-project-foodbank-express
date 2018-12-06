import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import Food from './Food'
import {NameSortButton, QuantitySortButton} from "../../utils/button";
//import Time from 'react-time';

class FoodInventoryList extends Component{
    constructor(props){
        super(props);
        this.state = {
            foods:[],
            ascending: true,
            sortStyle: "none",
        };
        this.sorted = false;
        this.filtered = false;
    }

    componentDidMount(){
        this.foodsRef = firebase.database().ref(`banks/${this.props.currentUser.displayName}/foods`);
        this.foodsRef.on("value", (snapshot)=>{
            let snapShotVal = snapshot.val()
            let foods = Object.keys(snapShotVal).map((key) => {
                let foodObj = snapShotVal[key];
                foodObj.id = key;
                return foodObj;
            });
            this.sorted = false; 
            this.setState({foods: foods});
        });
    }
    
    componentWillUnmount(){
        this.foodsRef.off("value", (snapshot)=>{
            let snapShotVal = snapshot.val()
            let foods = Object.keys(snapShotVal).map((key) => {
                let foodObj = snapShotVal[key];
                foodObj.id = key;
                return foodObj;
            });
            this.sorted = false; 
            this.setState({foods: foods});
        });
    }

    deleteFoodItem = (foodid) => {
        let food = firebase.database().ref(`banks/${this.props.currentUser.displayName}/foods/${foodid}`);
        food.set(null);
    }

    updateQuantity = (name, foodid, n) => {
        let quantity = firebase.database().ref(`banks/${this.props.currentUser.displayName}/foods/${foodid}`);
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

    //add sort functions by quantity, and food name
    //we can add a filter function here as well
    render(){
        if(!this.sorted){
            this.updateSort(this.state.sortStyle);
        }
        if(!this.state.foods) return null; //if no chirps, don't display
        /* TODO: produce a list of `<ChirpItems>` to render */
        //foodObjects.sort((itemA, itemB)=> itemB.quantity - itemA.time);
        //foodObjects.filter......
        let foodItems = this.state.foods.map((obj)=>{
            return(
                <FoodItem key={obj.id} food={obj} 
                update={this.updateQuantity}
                delete={this.deleteFoodItem}
                currentUser={this.props.currentUser}/>
            );
        })

        return (

        <div className="container">
            <NameSortButton updateSort={this.updateSort}/>
            <QuantitySortButton updateSort={this.updateSort}/>
            {foodItems}
        </div>);
    }
}

class FoodItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            updateQuantity: 0
        }
    }

    updateNewQuantity(event){
        this.setState({
            updateQuantity: event.target.value,
        });
    }

    deleteFoodItem(e){
        console.log("deleting", this.props.food.id);
        this.props.delete(this.props.food.id);
    }
    postUpdatedQuantity(e){
        this.props.update(this.props.food.text, this.props.food.id, this.state.updateQuantity);
    }

    render() {
      let food = this.props.food;
      return (
        <div className = "container-fluid">
            <div className="row py-2 bg-light border">
                {/*<span className="time"><Time value={food.time} relative/></span> idk why this doesnt resolve*/}
                <div className="col-2 food">
                    <small>{food.text}</small>
                </div>
                <div className="col-2 foodQuantity">          
                    <small>{food.num}</small>
                </div>
                <div className = "col-8 text-right">
                    <div className="col-xs-2">
                        <input type="number" className = "form-control-sm" placeholder="new #"
                            value={this.state.updateQuantity}
                            onChange={(e) => this.updateNewQuantity(e)}
                        />
                    </div>
                    <button className = "btn btn-light btn-sm" onClick={(e) => this.postUpdatedQuantity(e)}><span><img src={require('../../img/refresh.png')} width="20" height= "20"/></span></button>
                    <button className = "btn btn-light btn-sm" onClick={(e) => this.deleteFoodItem(e)}><span><img src={require('../../img/remove.png')} width="20" height= "20"/></span></button>
                </div> 
            </div>
        </div>
      );
    }
  }

export default FoodInventoryList;