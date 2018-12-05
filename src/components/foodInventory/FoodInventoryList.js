import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import Food from './Food'
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

    deleteFoodItem(foodid){
        this.foodsRef.child(foodid).set(null);
    }

    updateQuantity(name, foodid, n){
        this.foodsRef.child(foodid).set(
            new Food(name, n)
        );
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
                <FoodItem key={obj.id} food={obj} 
                update={()=>this.updateQuantity}
                delete={()=>this.deleteFoodItem}
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
        this.props.delete(this.props.food.id);
    }
    postUpdatedQuantity(e){
        this.props.update(this.props.food.id);
    }

    render() {
      let food = this.props.food;
      return (
        <div className="row py-4 bg-white border">
          <div className="col pl-4 pl-lg-1">
            {/*<span className="time"><Time value={food.time} relative/></span> idk why this doesnt resolve*/}
            <div className="food">
                <small>{food.text}</small></div>
            <div className="foodQuantity">          
              <small>{food.num}</small>
            </div>
                <input type="number" className="" placeholder="new #"
                    value={this.state.updateQuantity}
                    onChange={(e) => this.updateNewQuantity(e)}
                />
                <button onClick={(e) => this.postUpdatedQuantity(e)}>update<i className="fas fa-paper-plane"></i></button>
                <button onClick={(e) => this.deleteFoodItem(e)}>delete<i className="icon-remove"></i></button>
          </div>
        </div>      
      );
    }
  }

export default FoodInventoryList;