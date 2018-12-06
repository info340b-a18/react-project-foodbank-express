import React, { Component } from 'react'; //import React Component
import '../../css/style.css'; //load module-specific CSS
import {logo} from '../../favicon/favicon.png';

export default class foodheader extends Component {
  render() {
    return (
      <div class="jumbotron">
        <header className="container-fluid bg-white p-3 mb-3">
          <div className="text-center">
              <div id="nav-title">
                  {<span><img src={require('../../img/plus.png')} width="25" height= "25"/></span>}
                      Add Foods
              </div>
          </div>
          {this.props.children}
        </header>
      </div>
    );
  }
}