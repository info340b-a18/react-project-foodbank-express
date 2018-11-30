import React, { Component } from 'react';
import { render } from 'react-dom';
import WordCloud from 'react-d3-cloud';
import data from './make-data/bank_words.json';
import convertWords from './utils/convertWords';


const fontSizeMapper = word => Math.log2(word.value) * 10;
const rotate = word => word.value % -10;

class WordCloudApp extends Component {

  constructor(props) {
    super(props);
    this.state = {banks: props.banks, bank_words: props.bank_words, bank: props.bank};
  }

  changeWordBank(bank) {
    var bank_words = data[bank];
    this.setState({bank_words: convertWords(bank_words), bank: bank});
  }

  render() {
    return (
      <div>
        <header className="jumbotron jumbotron-fluid py-4">
          <div className="container">
            <h1>{this.state.bank}</h1>
          </div>
        </header>

        <WordCloud data={this.state.bank_words} fontSizeMapper={fontSizeMapper} rotate={rotate} />
      </div>
    );
  }
}

export default WordCloudApp