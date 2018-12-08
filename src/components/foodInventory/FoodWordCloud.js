import React, { Component } from 'react'; //import React Component
import '../../css/style.css'; //load module-specific CSS
import ReactWordCloud from 'react-wordcloud';

export default class FoodWordCloud extends Component {
  
  render() {
    return (
      <div className="container-fluid">
        <div className="jumbotron">
          <div className="d-flex justify-content-center">
            <div style={{width: 10000, height: 500}}>
              <ReactWordCloud
                scales={'log'}
                spiral={'rectangular'}
                tooltipEnabled={true}
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