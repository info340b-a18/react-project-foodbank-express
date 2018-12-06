import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import Food from './Food'
import SortBar from '../../FoodInventorySort.js';
//import Time from 'react-time';

class FoodInventoryList extends Component{
    constructor(props){
        super(props);
        this.state = {
            foods:[]
        };
    }

    componentDidMount(){
        this.foodsRef = firebase.database().ref(`banks/${this.props.currentUser.displayName}/foods`);
        this.foodsRef.on("value", (snapshot)=>{
          this.setState({foods: snapshot.val()});
        });
    }
    
      componentWillUnmount(){
        this.foodsRef.off("value", (snapshot)=>{
          this.setState({foods: snapshot.val()});
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

    /* sort by date? or 
    sort(){

    }*/
    
    //add sort functions by quantity, and food name
    //we can add a filter function here as well
    render(){
        if(!this.state.foods) return null; //if no chirps, don't display
        /* TODO: produce a list of `<ChirpItems>` to render */
        let foodObjects = Object.keys(this.state.foods).map((key) => {
            let foodObj = this.state.foods[key];
            foodObj.id = key;
            return foodObj;
        });
        //foodObjects.sort((itemA, itemB)=> itemB.quantity - itemA.time);
        //foodObjects.filter......

        let foodItems = foodObjects.map((obj)=>{
            return(
                <FoodItem key={obj.id} food={obj} 
                update={this.updateQuantity}
                delete={this.deleteFoodItem}
                currentUser={this.props.currentUser}/>
            );
        })

        return (
        <div className="container">
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
        this.setState({updateQuantity: event.target.value});
    }

    deleteFoodItem(e){
        console.log("deleting", this.props.food.id);
        this.props.delete(this.props.food.id);
    }
    postUpdatedQuantity(e){
        console.log("updating quantity", this.props.food, this.state.updateQuantity);
        console.log(this.props.food.text);
        this.props.update(this.props.food.text, this.props.food.id, this.state.updateQuantity);
    }

    render() {
      let food = this.props.food;
      return (
        <div className = "container-fluid">
        <div className="row py-2 bg-light border">
            {/*<span className="time"><Time value={food.time} relative/></span> idk why this doesnt resolve*/}
            <div className="col-2 food">
                <large>{food.text}</large></div>
            <div className="col-2 foodQuantity">          
              <medium>{food.num}</medium>
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