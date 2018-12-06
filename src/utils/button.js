import React, { Component}  from 'react';

class QuantitySortButton extends Component{
    clickHandler= () => {
        this.props.updateSort("quantity");
    }
    render(){
        let classList = "btn btn-light";
        /*
            if(this.props.sortStyle === "quantity"){
                if(this.props.ascending){
                    classList += "btn-secondary";
                    console.log("")
                }else{
                    classList += "btn-light";
                }
            }else{
                classList += "btn-warning";
            }
        */
        return(
            <button className={classList} onClick={this.clickHandler}>Quantity</button>
        );
    }
}

class NameSortButton extends Component{
    clickHandler = () => {
        this.props.updateSort("name");
    }
    render(){
        return(
            <button className = "btn btn-light" onClick={this.clickHandler}>name</button>
        );
    }
}

export {QuantitySortButton, NameSortButton};