import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import './App.css';
import App from './App';
import MapApp from './MapApp';
import MapAppTest from './MapContainer';
import APITester from './APITester';
import FormApp from './FormApp'

import * as serviceWorker from './serviceWorker';
import data from './make-data/bank_words.json'
import convertWords from './utils/convertWords'

//ReactDOM.render(<App banks={Object.keys(data)} bank_words={convertWords(data["Rainier Valley Food Bank"])} bank={"Rainier Valley Food Bank"}/>, document.getElementById('root'));

//ReactDOM.render(<MapApp banks={Object.keys(data)} />, document.getElementById('root'));
//ReactDOM.render(<MapAppTest bankLists={{"Ballard Food Bank":{result:{geometry:{location:{lat:47.665569, lng:-122.380203}}}},
//"University Food Bank":{result:{geometry:{location:{lat:47.6655423, lng:-122.3200282}}}}}} zipGeo={{lat:47.665050, lng:-122.312790}} zoom={15} />, document.getElementById('root'));
ReactDOM.render(<APITester banks={Object.keys(data)} />, document.getElementById('root'));
//ReactDOM.render(<FormApp />, document.getElementById('root'));

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
