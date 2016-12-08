import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app';
import reducers from './reducers';
//import Knight from './components/knight';
import Square from './components/square';
import Board from './components/board';


const createStoreWithMiddleware = applyMiddleware()(createStore);



  ReactDOM.render(
    <Board
    />,
   document.querySelector('.container'))
  
