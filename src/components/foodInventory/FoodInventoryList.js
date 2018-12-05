import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
//import Time from 'react-time';

class FoodInventoryList extends Component{
    constructor(props){
        super(props);
        this.state = {
            foods:[]
        };
    }

    componentDidMount(){
        this.foodsRef = firebase.database().ref(`${this.props.currentUser.displayName}`);
        this.foodsRef.on("value", (snapshot)=>{
          this.setState({foods: snapshot.val()});
        });
    }
    
      componentWillUnmount(){
        this.foodsRef.off("value", (snapshot)=>{
          this.setState({foods: snapshot.val()});
        });
    }
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
                <FoodItem key={obj.id} food={obj} currentUser={this.props.currentUser}/>
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

    }
    postUpdatedQuantity(e){

    }

    render() {
      let food = this.props.food;
      return (
        <div className="row py-4 bg-white border">
          <div className="col pl-4 pl-lg-1">
            {/*<span className="time"><Time value={food.time} relative/></span> idk why this doesnt resolve*/}
            <div className="food">{food.foodName}</div>
            <div className="foodQuantity">          
              <small>{food.quantity}</small>
            </div>
                <input type="number" className="" placeholder="new #"
                    value={this.state.updateQuantity}
                    onChange={(e) => this.updateNewQuantity(e)}
                />
                <button onClick={(e) => this.postUpdatedQuantity(e)}><i className="fas fa-paper-plane"></i></button>
                <button onClick={(e) => this.deleteFoodItem(e)}><i className="icon-remove"></i></button>
          </div>
        </div>      
      );
    }
  }

export default FoodInventoryList;