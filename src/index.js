import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import './css/animate.css';
import './App.css';
// import './utils/main.js'
import App from './App';
import * as serviceWorker from './serviceWorker';
import data from './make-data/bank_words.json'
import convertWords from './utils/convertWords'

//ReactDOM.render(<App banks={Object.keys(data)} bank_words={convertWords(data["Rainier Valley Food Bank"])} bank={"Rainier Valley Food Bank"}/>, document.getElementById('root'));

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

// import React from 'react';
// import { render } from 'react-dom';
// import WordCloud from 'react-d3-cloud';
// import data from './make-data/bank_words.json'
// import convertWords from './utils/convertWords'
 

// var bank_words = data["West Seattle Food Bank"]
// bank_words = convertWords(bank_words);

// const fontSizeMapper = word => Math.log2(word.value) * 10;
// const rotate = word => word.value % 10;
 
// render(
//   <WordCloud
//     data={bank_words}
//     fontSizeMapper={fontSizeMapper}
//     rotate={rotate}
//   />,
//   document.getElementById('root')
// );
