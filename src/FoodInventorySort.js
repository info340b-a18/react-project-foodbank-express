import React, { Component}  from 'react';
import {QuantitySortButton} from './utils/button.js'
class SortBar extends Component{
    render(){
        return(
            <div>
                <span className = "text-left">Sort by: </span>
                <QuantitySortButton updateSort = {this.props.updateSort}/>
            </div>
        );
        
    }
}
export default SortBar;