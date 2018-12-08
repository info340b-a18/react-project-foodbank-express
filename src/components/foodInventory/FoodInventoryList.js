import React, { Component } from 'react';
import 'firebase/database';
import {NameSortButton, QuantitySortButton} from "../../utils/button";

class FoodInventoryList extends Component{
    //add sort functions by quantity, and food name
    //we can add a filter function here as well
    render(){
        if(!this.props.foods) return null; 
        let foodItems = this.props.foods.map((obj)=>{
            if (!this.props.isUserView) {
                return(
                    <FoodItem key={obj.id} food={obj} 
                    update={this.props.updateQuantity}
                    delete={this.props.delete}
                    currentUser={this.props.currentUser}
                    isUserView={this.props.isUserView}/>
                );
            } else {
                return (
                    <FoodItem key={obj.id} food={obj} isUserView={this.props.isUserView}/>
                )
            }

        })

        if (!this.props.isUserView) {
            return (
                <div className="container">
                    <NameSortButton sortStyle={this.props.sortStyle} ascending = {this.props.ascending} updateSort={this.props.updateSort}/>
                    <QuantitySortButton sortStyle={this.props.sortStyle} ascending = {this.props.ascending} updateSort={this.props.updateSort}/>
                    {foodItems}
                </div>
            );
        } else {
            return (
                <div className="container">
                    {foodItems}
                </div>
            )
        }
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
        this.props.update(this.props.food.text, this.props.food.id, parseInt(this.state.updateQuantity) + parseInt(this.props.food.num));
        this.setState({
            updateQuantity: 0
        });
    }
    updateSubtractQuantity(event){
        this.setState({
            updateQuantity: event.target.value,
        });
    }
    postSubtractQuantity(e){
        this.props.update(this.props.food.text, this.props.food.id, parseInt(this.props.food.num) - parseInt(this.state.updateQuantity));
        this.setState({
            updateQuantity: 0
        });
    }

    render() {
      let food = this.props.food;

        if (!this.props.isUserView) {
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
                                <input type="number" min = "0" className = "form-control-sm" placeholder="add/remove amount"
                                    value={this.state.updateQuantity}
                                    onChange={(e) => this.updateNewQuantity(e)}
                                />
                            </div>
                            <button className = "btn btn-light btn-sm" onClick={(e) => this.postUpdatedQuantity(e)}><span><img src={require('../../img/plus.png')} width="20" height= "20"/></span></button>
                            <button className = "btn btn-light btn-sm" onClick={(e) => this.postSubtractQuantity(e)}><span><img src={require('../../img/subtract.png')} width="20" height= "20"/></span></button>
                            <button className = "btn btn-light btn-sm" onClick={(e) => this.deleteFoodItem(e)}><span><img src={require('../../img/trash.png')} width="20" height= "20"/></span></button>
                        </div> 
                    </div>
                </div>
            );
        } else {
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
                            {/* <div className = "col-8 text-right">
                                <div className="col-xs-2">
                                    <input type="number" className = "form-control-sm" placeholder="new #"
                                        value={this.state.updateQuantity}
                                        onChange={(e) => this.updateNewQuantity(e)}
                                    />
                                </div>
                                <button className = "btn btn-light btn-sm" onClick={(e) => this.postUpdatedQuantity(e)}><span><img src={require('../../img/refresh.png')} width="20" height= "20"/></span></button>
                                <button className = "btn btn-light btn-sm" onClick={(e) => this.deleteFoodItem(e)}><span><img src={require('../../img/remove.png')} width="20" height= "20"/></span></button>
                            </div>  */}
                        </div>
                </div>
            );
        }
    }
  }

export default FoodInventoryList;