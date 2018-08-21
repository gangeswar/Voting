import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';

import registerServiceWorker from './registerServiceWorker';
import Store from './Config/Store'

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';

const app = <Provider store={Store}> 
  <BrowserRouter>
    <App />
  </BrowserRouter>
</Provider>

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
