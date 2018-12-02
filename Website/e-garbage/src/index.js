import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from "firebase";

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBcpYYjB_OSo5qrO3l24dQ57fLBlp0EQW0",
    authDomain: "e-garbage-1999.firebaseapp.com",
    databaseURL: "https://e-garbage-1999.firebaseio.com",
    projectId: "e-garbage-1999",
    storageBucket: "e-garbage-1999.appspot.com",
    messagingSenderId: "263881975417"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
