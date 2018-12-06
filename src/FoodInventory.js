import React, { Component } from 'react';
import FoodInventoryHeader from './components/foodInventory/FoodInventoryHeader';
import FoodInventoryBox from './components/foodInventory/FoodInventoryBox';
import FoodInventoryList from './components/foodInventory/FoodInventoryList';

class FoodInventory extends Component{
    render(){
        return(
            <div>
                <FoodInventoryHeader currentUser={this.props.currentUser}/>
                <FoodInventoryBox currentUser={this.props.currentUser}/>
                <FoodInventoryList currentUser={this.props.currentUser}/>
            </div>
        );
        
    }
}

export default FoodInventory;