import React, { Component } from 'react'; //import React Component
//import './css/style.css'; //load module-specific CSS
//import logo from './favicon/favicon.png';

export default class foodheader extends Component {
  render() {
    return (
      <header className="container-fluid bg-white p-3 mb-3">
        <div className="text-center">
            <div id="nav-title">
                {/*<span img src {...logo} aria-hidden="true">&nbsp;</span>*/}
                    Add Foods
            </div>
        </div>
        {this.props.children}
      </header>
    );
  }
}