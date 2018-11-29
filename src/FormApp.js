import React, { Component } from 'react';
import convertWords from './utils/convertWords';
import {Map, GoogleApiWrapper, GoogleMap, Marker, InfoWindow} from 'google-maps-react';
import MapAppTest from './MapContainer';

class FormApp extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSubmit() {

    }

    
    render() {
        return(
            <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">ZipCode</label>
        <input id="username" name="username" type="text" />

        <button>Send data!</button>
      </form>
        );
    }
}

export default FormApp