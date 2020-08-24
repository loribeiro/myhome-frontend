import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import {client2} from './settings'
import { Provider } from "react-redux";
import {store} from "./store/store";
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  //<React.StrictMode>
  <ApolloProvider client={client2}>
    <Provider store={store}>
      <App />
    </Provider>
    </ApolloProvider>,
  //</React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
