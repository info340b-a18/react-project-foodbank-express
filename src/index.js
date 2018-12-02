import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import './App.css';
import App from './App';
import MapApp from './MapApp';
import MapAppTest from './MapContainer';
import { BrowserRouter} from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import data from './make-data/bank_words.json'
import convertWords from './utils/convertWords'

ReactDOM.render(<BrowserRouter>
                    <App />
                </BrowserRouter>,
                 document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();