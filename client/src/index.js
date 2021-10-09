import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//setup the store
import {createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { userReducer } from './reducer';
import { Provider } from 'react-redux';

//Boilerplate store setup start
const initialState = { userLoggedIn: null };
const middleware = [thunk];
const store = createStore(userReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
//Boilerplate store setup end

//End store setup

// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
