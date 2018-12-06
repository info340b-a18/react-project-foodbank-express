import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import Food from './Food'
//should we download module specific css?

class FoodInventoryBox extends Component{
  constructor(props){
    super(props);
    this.state = {
        foodName:'',
        initialInventory: 0,
    };
  }

  //when the text in the form changes
  updateFoodName(event) {
    this.setState({foodName: event.target.value});
  }
  
  updateInitialInventory(event) {
    this.setState({initialInventory: event.target.value});
  }

  postFood(event){
    event.preventDefault(); //don't submit
    let newFood = new Food(this.state.foodName, this.state.initialInventory);
    firebase.database().ref(`banks/${this.props.currentUser.displayName}/foods`)//need to update this with the right path
    .push(newFood);
    this.setState({
        foodName:'',
        initialInventory: 0,
    }); //empty out post for next time

  }

  //You do not need to modify this method!
  render() {
    let user = this.props.currentUser; //the current user (convenience)

    return (
      <div className="container-fluid">
        <div className="row py-3">
          <div className="col pl-4 pl-lg-1">
            <form>
              <input name="foodName" className="form-control mb-2" placeholder="What's the food name?" 
                value={this.state.foodName} 
                onChange={(e) => this.updateFoodName(e)}
                />
              
              <input type="number"  className="form-control mb-2" placeholder="What's the quantity?"
                value={this.state.initialInventory}
                onChange={(e) => this.updateInitialInventory(e)}
                />

              <div className="text-center">
                {/* Disable if invalid post length */}
                <button className="btn btn-primary" 
                  disabled={this.state.foodName.length === 0 || this.state.foodName.length > 20}
                  onClick={(e) => this.postFood(e)} 
                  >
                  Add
                  {/*<i className="fas fa-plus" aria-hidden="true"></i>*/}
                </button> 					
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}




export default FoodInventoryBox;