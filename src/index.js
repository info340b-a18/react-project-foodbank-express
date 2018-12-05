import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import './App.css';
import App from './App';
import MapApp from './MapApp';
import MapAppTest from './MapContainer';
import { BrowserRouter} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth'; 
import 'font-awesome/css/font-awesome.min.css'


import * as serviceWorker from './serviceWorker';
import data from './make-data/bank_words.json';
import convertWords from './utils/convertWords';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyA-RWBJK5fK8MKDlXXNwCxB6kAy8Tb70xw",
    authDomain: "foodbank-express.firebaseapp.com",
    databaseURL: "https://foodbank-express.firebaseio.com",
    projectId: "foodbank-express",
    storageBucket: "foodbank-express.appspot.com",
    messagingSenderId: "486599446055"
};
firebase.initializeApp(config);

ReactDOM.render(<BrowserRouter>
                    <App />
                </BrowserRouter>,
                 document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();