import React, { Component } from 'react'; //import React Component
import '../../css/style.css'; //load module-specific CSS
import ReactWordCloud from 'react-wordcloud';

export default class FoodWordCloud extends Component {
  
  render() {
    return (
      <div class="container-fluid">
        <div class="jumbotron">
          <div className="                  ">
            <div style={{width: 600, height: 400}}>
              <ReactWordCloud
                words={this.props.foods}
                wordCountKey={"num"}
                wordKey={"text"}
              />
            </div>
          </div>
        </div>
      </div>
      
    );
  }
}