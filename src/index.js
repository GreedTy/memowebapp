import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'jquery';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import * as firebase from 'firebase';

import 'bootstrap/dist/css/bootstrap.css';
global.jquery = require('jquery');
require('bootstrap');

const rootElement = document.getElementById('root');
ReactDOM.render(<App/>,rootElement);
registerServiceWorker();
