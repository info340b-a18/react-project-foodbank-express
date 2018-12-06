import React, { Component}  from 'react';

class QuantitySortButton extends Component{
    clickHandler= () => {
        this.props.updateSort("quantity");
    }
    render(){
        return(
            <button className = "btn btn-light" onClick={this.clickHandler}>Quantity</button>
        );
    }
}

export {QuantitySortButton}